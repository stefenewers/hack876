/**
 * Crew sign-up validation (/crew). Pure functions with no imports, like
 * application.ts, so the same rules run in the browser and on the server and
 * can be tested with plain `node --test`.
 */

/** How much time a crew member can give, from least to most. The slider steps through these. */
export const CAPACITY = [
  { key: "pop-in", label: "Pop in", hours: "~1–2 hrs/month", caption: "Share the posts, make the odd intro." },
  { key: "steady", label: "Steady", hours: "~3–5 hrs/month", caption: "Own one thing and see it through." },
  { key: "big-push", label: "Big push", hours: "~6–10 hrs/month", caption: "A real chunk of time. We’ll lean on you." },
  { key: "all-in", label: "All in", hours: "10+ hrs/month and the day itself", caption: "Core crew. Clear your Saturday." },
] as const;

export type CapacityKey = (typeof CAPACITY)[number]["key"];

export const capacityFor = (key: string) => CAPACITY.find((c) => c.key === key);

export const NEEDLE_MIN = 10;
export const NEEDLE_MAX = 600;

export type CrewData = {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  capacity: CapacityKey;
  needle: string;
};

export type CrewErrors = Partial<Record<keyof CrewData, string>>;

export type ValidationResult<T, E> = { ok: true; value: T } | { ok: false; errors: E };

type Raw = Record<string, unknown>;

const str = (raw: Raw, key: string) => {
  const v = raw[key];
  return typeof v === "string" ? v.trim() : "";
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateCrew(raw: Raw): ValidationResult<CrewData, CrewErrors> {
  const e: CrewErrors = {};

  const fullName = str(raw, "fullName");
  if (fullName.length < 2) e.fullName = "Tell us your full name.";
  else if (fullName.length > 100) e.fullName = "That name is a bit long. 100 characters max.";

  const organization = str(raw, "organization");
  if (!organization) e.organization = "Where do you work? ‘Freelance’ or your school is fine.";
  else if (organization.length > 120) e.organization = "Keep it under 120 characters.";

  const email = str(raw, "email").toLowerCase();
  if (!email) e.email = "We need an email to send your copy to.";
  else if (!EMAIL.test(email) || email.length > 200) e.email = "That email doesn’t look right.";

  const phone = str(raw, "phone");
  const digits = phone.replace(/\D/g, "");
  if (!phone) e.phone = "Add the number you use for WhatsApp.";
  else if (digits.length < 7 || digits.length > 15 || /[^\d\s()+\-.]/.test(phone)) e.phone = "Use a phone number like 876 555 0123.";

  const capacity = str(raw, "capacity");
  if (!capacityFor(capacity)) e.capacity = "Slide to the amount of time that fits.";

  const needle = str(raw, "needle");
  if (!needle) e.needle = "Tell us where you could help most.";
  else if (needle.length < NEEDLE_MIN) e.needle = "Give us a little more. A line or two is perfect.";
  else if (needle.length > NEEDLE_MAX) e.needle = `Keep it under ${NEEDLE_MAX} characters.`;

  if (Object.keys(e).length) return { ok: false, errors: e };
  return { ok: true, value: { fullName, organization, email, phone, capacity: capacity as CapacityKey, needle } };
}
