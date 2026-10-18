"use server";

import { after } from "next/server";
import { applications, eligibility, event, eventWhen, schools } from "@/data/event";
import {
  validateApplication,
  validatePartner,
  type FieldErrors,
  type PartnerErrors,
} from "@/lib/application";
import { capacityFor, validateCrew, type CrewErrors } from "@/lib/crew";
import { crewCodeMatches, crewOpen } from "@/lib/crewCode";
import { saveSubmission, sendConfirmation } from "@/lib/submissions";

export type ApplyState =
  | { status: "idle" }
  | { status: "error"; errors: FieldErrors; message?: string }
  | { status: "success"; firstName: string; email: string };

export async function submitApplication(_prev: ApplyState, formData: FormData): Promise<ApplyState> {
  if (applications.status !== "open") {
    return { status: "error", errors: {}, message: "Applications aren’t open right now." };
  }
  // Honeypot: real people never see or fill this field.
  if (String(formData.get("company") ?? "").trim()) {
    return { status: "success", firstName: "", email: "" };
  }

  const result = validateApplication(Object.fromEntries(formData), {
    schools,
    forms: eligibility.formOptions,
  });
  if (!result.ok) {
    return { status: "error", errors: result.errors, message: "A few answers need another look." };
  }

  try {
    await saveSubmission("applications", result.value);
  } catch (err) {
    console.error("Failed to save application", err);
    return {
      status: "error",
      errors: {},
      message: `Something went wrong on our side and your application wasn’t saved. Please try again in a minute, or email us at ${event.contactEmail}.`,
    };
  }

  return {
    status: "success",
    firstName: result.value.fullName.split(/\s+/)[0],
    email: result.value.email,
  };
}

export type PartnerState =
  | { status: "idle" }
  | { status: "error"; errors: PartnerErrors; message?: string }
  | { status: "success" };

export async function submitPartner(_prev: PartnerState, formData: FormData): Promise<PartnerState> {
  if (String(formData.get("company_website") ?? "").trim()) return { status: "success" };
  const result = validatePartner(Object.fromEntries(formData));
  if (!result.ok) return { status: "error", errors: result.errors, message: "A few fields need another look." };
  try {
    await saveSubmission("partners", result.value);
  } catch (err) {
    console.error("Failed to save partner enquiry", err);
    return { status: "error", errors: {}, message: `Something went wrong on our side and your message wasn’t sent. Please email us at ${event.contactEmail} instead.` };
  }
  return { status: "success" };
}

/* -------------------------------------------------------------------------- */
/*  Crew sign-up (/crew, invite only)                                          */
/* -------------------------------------------------------------------------- */

/** Checks a typed-in crew code. Only the yes/no answer goes back to the browser. */
export async function unlockCrew(_prev: { ok: boolean }, formData: FormData): Promise<{ ok: boolean }> {
  return { ok: crewCodeMatches(formData.get("code")) };
}

export type CrewState =
  | { status: "idle" }
  | { status: "error"; errors: CrewErrors; message?: string }
  | { status: "success"; firstName: string; capacityLabel: string; organization: string };

/** Anything quicker than this, from page render to submit, is a bot. */
const MIN_FILL_MS = 3000;

export async function submitCrew(_prev: CrewState, formData: FormData): Promise<CrewState> {
  if (!crewOpen()) return { status: "error", errors: {}, message: "Crew sign-up isn’t open right now." };
  // The page only shows the form for a valid code, but that is not a security boundary: check again.
  if (!crewCodeMatches(formData.get("k"))) {
    return { status: "error", errors: {}, message: "That crew link doesn’t look right. Ask Stefen or Nadani for a fresh one." };
  }

  // Honeypot and time trap. A missing or broken timestamp is ignored, so nobody is punished for odd JS.
  const renderedAt = Number(formData.get("t"));
  const tooFast = Number.isFinite(renderedAt) && renderedAt > 0 && Date.now() - renderedAt < MIN_FILL_MS;
  if (String(formData.get("hp_website") ?? "").trim() || tooFast) {
    console.warn("[crew] honeypot hit");
    return { status: "success", firstName: "", capacityLabel: "", organization: "" };
  }

  const result = validateCrew(Object.fromEntries(formData));
  if (!result.ok) return { status: "error", errors: result.errors, message: "A few fields need another look." };

  const crew = result.value;
  const capacity = capacityFor(crew.capacity)!;
  const firstName = crew.fullName.split(/\s+/)[0];
  try {
    await saveSubmission("crew", { ...crew, capacityLabel: capacity.label });
  } catch (err) {
    console.error("Failed to save crew sign-up", err);
    return { status: "error", errors: {}, message: `Something went wrong on our side and your sign-up wasn’t saved. Please email us at ${event.contactEmail} instead.` };
  }

  // The copy for the person goes out after the response. A failure here never undoes the sign-up.
  after(async () => {
    try {
      await sendConfirmation({ to: crew.email, ...crewConfirmation(firstName, crew.organization, capacity.label, capacity.hours) });
    } catch (err) {
      console.error("[crew] confirmation email failed", err);
    }
  });

  return { status: "success", firstName, capacityLabel: capacity.label, organization: crew.organization };
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** The confirmation email. Short, and it never repeats the free-text answer. */
function crewConfirmation(first: string, organization: string, capacityLabel: string, hours: string) {
  const when = `${eventWhen.long}${eventWhen.note}`;
  const intro = `thanks for raising your hand for Hack 876, the free one-day hackathon for ${eligibility.maxHackers} secondary-school students in Kingston on ${when}.`;
  const next = "Stefen or Nadani will message you on WhatsApp within a week to find the right fit.";
  const change = "Want to change anything? Just reply to this email.";
  const text = [
    `Hi ${first},`,
    "",
    intro[0].toUpperCase() + intro.slice(1),
    "",
    "Here’s what we have:",
    `Company: ${organization}`,
    `Capacity: ${capacityLabel} (${hours})`,
    "",
    `What happens next: ${next}`,
    "",
    change,
    "",
    "Thank you,",
    `The Hack 876 team · ${event.siteUrl}`,
  ].join("\n");
  const p = "margin:0 0 14px;font-size:16px;line-height:1.5;color:#141716";
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">
<p style="${p}">Hi ${esc(first)},</p>
<p style="${p}">Thanks for raising your hand for Hack 876, the free one-day hackathon for ${eligibility.maxHackers} secondary-school students in Kingston on ${esc(when)}.</p>
<p style="${p}"><strong>Here’s what we have</strong><br>Company: ${esc(organization)}<br>Capacity: ${esc(capacityLabel)} (${esc(hours)})</p>
<p style="${p}"><strong>What happens next:</strong> ${next}</p>
<p style="${p}">${change}</p>
<p style="${p}">Thank you,<br>The Hack 876 team · <a href="${event.siteUrl}" style="color:#0a7a3e">${event.siteUrl.replace(/^https?:\/\//, "")}</a></p>
</div>`;
  return { subject: "You’re on the Hack 876 crew list", text, html };
}
