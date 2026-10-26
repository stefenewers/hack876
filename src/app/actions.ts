"use server";

import { after } from "next/server";
import { event } from "@/data/event";
import { validatePartner, type PartnerErrors } from "@/lib/partner";
import { capacityFor, validateCrew, type CrewErrors } from "@/lib/crew";
import { crewCodeMatches, crewOpen } from "@/lib/crewCode";
import { crewConfirmation, partnerConfirmation } from "@/lib/confirmations";
import { saveSubmission, sendConfirmation } from "@/lib/submissions";

export type PartnerState =
  | { status: "idle" }
  | { status: "error"; errors: PartnerErrors; message?: string }
  | { status: "success"; firstName: string; email: string };

export async function submitPartner(_prev: PartnerState, formData: FormData): Promise<PartnerState> {
  // Honeypot: a plain success, no email, nothing saved.
  if (String(formData.get("company_website") ?? "").trim()) return { status: "success", firstName: "", email: "" };
  const result = validatePartner(Object.fromEntries(formData));
  if (!result.ok) return { status: "error", errors: result.errors, message: "A few fields need another look." };
  const partner = result.value;
  try {
    await saveSubmission("partners", partner);
  } catch (err) {
    console.error("Failed to save partner enquiry", err);
    return { status: "error", errors: {}, message: `Something went wrong on our side and your message wasn’t sent. Please email us at ${event.contactEmail} instead.` };
  }

  // The confirmation goes out after the response. The enquiry is already saved and info@ notified, so a failure here is only logged.
  after(async () => {
    try {
      await sendConfirmation({ to: partner.email, ...partnerConfirmation(partner) });
    } catch (err) {
      console.error("[partner] confirmation email failed", err);
    }
  });

  return { status: "success", firstName: partner.name.split(/\s+/)[0], email: partner.email };
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
