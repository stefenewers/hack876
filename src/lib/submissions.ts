import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Where form submissions go.
 *
 * - If SUBMISSIONS_WEBHOOK_URL is set, each submission is POSTed there as JSON
 *   (works with Zapier, Make, a Google Apps Script, Formspree, your own API…).
 *   SUBMISSIONS_WEBHOOK_SECRET, if set, is sent as a Bearer token.
 * - Otherwise submissions are appended to `.data/<kind>.jsonl` in the project.
 *   Fine for local review and self-hosting. NOT suitable for serverless hosts
 *   (their filesystem is read-only/ephemeral) — configure the webhook there.
 */
export type SubmissionKind = "applications" | "partners";

export async function saveSubmission(kind: SubmissionKind, data: Record<string, unknown>) {
  const record = {
    id: crypto.randomUUID(),
    kind,
    submittedAt: new Date().toISOString(),
    ...data,
  };

  const webhook = process.env.SUBMISSIONS_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.SUBMISSIONS_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.SUBMISSIONS_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify(record),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return record.id;
  }

  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, `${kind}.jsonl`), JSON.stringify(record) + "\n", "utf8");
  return record.id;
}
