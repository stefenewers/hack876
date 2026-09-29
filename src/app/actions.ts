"use server";

import { applications, eligibility, schools } from "@/data/event";
import {
  validateApplication,
  validatePartner,
  type FieldErrors,
  type PartnerErrors,
} from "@/lib/application";
import { saveSubmission } from "@/lib/submissions";

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
      message: "Something went wrong on our side and your application wasn’t saved. Please try again in a minute.",
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
    return { status: "error", errors: {}, message: "Something went wrong on our side. Please try again in a minute." };
  }
  return { status: "success" };
}
