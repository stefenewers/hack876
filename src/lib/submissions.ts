import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import { event } from "@/data/event";

/**
 * Where form submissions go. Every route that is configured is used.
 *
 * - Email (the production route): if SMTP_USER and SMTP_PASS are set, each
 *   submission is emailed to SUBMISSIONS_EMAIL_TO, or to event.contactEmail
 *   (info@hack876.com). hack876.com mail runs on Google Workspace, so SMTP_USER
 *   is the Workspace address and SMTP_PASS is a Google app password for it.
 *   SMTP_HOST and SMTP_PORT default to Gmail. Reply-To is the person who wrote
 *   in, so replying from the inbox reaches them.
 * - Webhook: if SUBMISSIONS_WEBHOOK_URL is set, each submission is also POSTed
 *   there as JSON. SUBMISSIONS_WEBHOOK_SECRET, if set, is sent as a Bearer token
 *   and as `secret` in the body. docs/ops/sheets-webhook.gs is a Google Apps
 *   Script receiver that appends each submission to a private Sheet, one tab per
 *   kind (applications, partners, crew).
 * - Local file: with neither configured, outside Vercel, submissions are
 *   appended to `.data/<kind>.jsonl`. Vercel's filesystem is read-only, so
 *   there this route is never used.
 *
 * If nothing could be delivered, the submission is written to the server log
 * and an error is thrown, which the form shows to the person with the email
 * address to use instead. Recovering from the log is best-effort only: Vercel
 * Hobby keeps runtime logs for about an hour.
 *
 * Kinds: applications (/apply), partners (/partner) and crew (/crew, the
 * invite-only volunteer sign-up). sendConfirmation() emails the person who
 * wrote in, using the same SMTP account.
 */
export type SubmissionKind = "applications" | "partners" | "crew";

const subjects: Record<SubmissionKind, (d: Record<string, unknown>) => string> = {
  partners: (d) => `Partner enquiry: ${d.name ?? "Unknown"}${d.organization ? ` (${d.organization})` : ""}`,
  applications: (d) => `Application: ${d.fullName ?? "Unknown"}${d.school ? ` (${d.school})` : ""}`,
  crew: (d) => `Crew: ${d.fullName ?? "Unknown"}${d.organization ? ` (${d.organization})` : ""}${d.capacityLabel ? ` · ${d.capacityLabel}` : ""}`,
};

/** The page each form lives on, for the footer of the notification email. Never includes the crew invite code. */
const formPath: Record<SubmissionKind, string> = { applications: "apply", partners: "partner", crew: "crew" };

const label = (k: string) => k.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());

function asText(record: Record<string, unknown>) {
  return Object.entries(record)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${label(k)}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
    .join("\n");
}

/** The SMTP transport and sending address, or null when SMTP_USER or SMTP_PASS is missing. */
function getTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return { transport, user };
}

async function sendEmail(kind: SubmissionKind, record: Record<string, unknown>) {
  const smtp = getTransport();
  const to = process.env.SUBMISSIONS_EMAIL_TO || event.contactEmail;
  if (!smtp || !to) return false;
  const { transport, user } = smtp;
  const replyTo = typeof record.email === "string" && record.email.includes("@") ? record.email : undefined;
  await transport.sendMail({
    from: `"Hack876 website" <${user}>`,
    to,
    replyTo,
    subject: subjects[kind](record),
    text: `${asText(record)}\n\nSent from the form at ${event.siteUrl}/${formPath[kind]}.`,
  });
  return true;
}

/**
 * Emails the person who submitted a form. Returns false when SMTP isn't
 * configured. Errors propagate; the caller decides whether to log them.
 */
export async function sendConfirmation({ to, subject, text, html }: { to: string; subject: string; text: string; html: string }) {
  const smtp = getTransport();
  if (!smtp) return false;
  await smtp.transport.sendMail({
    from: `"Hack 876" <${smtp.user}>`,
    to,
    replyTo: event.contactEmail ?? undefined,
    subject,
    text,
    html,
  });
  return true;
}

async function sendWebhook(record: Record<string, unknown>) {
  const webhook = process.env.SUBMISSIONS_WEBHOOK_URL;
  if (!webhook) return false;
  const secret = process.env.SUBMISSIONS_WEBHOOK_SECRET;
  const res = await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
    },
    // Also in the body: Google Apps Script's doPost(e) cannot read request headers.
    body: JSON.stringify(secret ? { ...record, secret } : record),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return true;
}

async function saveLocally(kind: SubmissionKind, record: Record<string, unknown>) {
  if (process.env.VERCEL) return false;
  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, `${kind}.jsonl`), JSON.stringify(record) + "\n", "utf8");
  return true;
}

export async function saveSubmission(kind: SubmissionKind, data: Record<string, unknown>) {
  const record = {
    id: crypto.randomUUID(),
    kind,
    submittedAt: new Date().toISOString(),
    ...data,
  };

  const failures: string[] = [];
  let delivered = false;
  for (const [name, send] of [
    ["email", () => sendEmail(kind, record)],
    ["webhook", () => sendWebhook(record)],
  ] as const) {
    try {
      delivered = (await send()) || delivered;
    } catch (err) {
      failures.push(`${name}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  if (!delivered && failures.length === 0) delivered = await saveLocally(kind, record);

  if (!delivered) {
    /* Keep the submission recoverable from the server logs. */
    console.error(`[submission not delivered] ${failures.join("; ") || "no delivery route configured"}`, JSON.stringify(record));
    throw new Error("Submission could not be delivered");
  }
  return record.id;
}
