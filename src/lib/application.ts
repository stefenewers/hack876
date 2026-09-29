/**
 * Application + partner-form validation. Pure functions with no imports so the
 * exact same rules run in the browser (instant feedback) and on the server
 * (the source of truth), and so they can be unit-tested with plain `node --test`.
 */

export const ROLES = [
  "Engineering",
  "Design",
  "Product",
  "Research",
  "Business",
  "Storytelling / presentation",
  "Not sure yet",
] as const;

export const LONG_ANSWER_MAX = 1200;
export const LONG_ANSWER_MIN = 20;

export type ApplicationData = {
  fullName: string;
  email: string;
  phone: string;
  school: string;
  form: string;
  age: number;
  enjoy: string;
  built: string;
  why: string;
  jamaica: string;
  role: string;
  hasTeam: "yes" | "no";
  teammates: string;
  openToMatch: "yes" | "no";
  github: string;
  portfolio: string;
  projectLink: string;
};

export type FieldErrors = Partial<Record<keyof ApplicationData, string>>;

export type ValidationResult<T, E> = { ok: true; value: T } | { ok: false; errors: E };

/** Which step of the multi-step form each field lives on. */
export const APPLICATION_STEPS: (keyof ApplicationData)[][] = [
  ["fullName", "email", "phone", "school", "form", "age"],
  ["enjoy", "built", "why", "jamaica"],
  ["role", "hasTeam", "teammates", "openToMatch"],
  ["github", "portfolio", "projectLink"],
];

type Raw = Record<string, unknown>;

const str = (raw: Raw, key: string) => {
  const v = raw[key];
  return typeof v === "string" ? v.trim() : "";
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts "https://x.com", "x.com/y" and (for GitHub) bare usernames. Returns "" when empty, null when invalid. */
export function normalizeUrl(input: string, opts: { githubUsername?: boolean } = {}): string | null {
  const v = input.trim();
  if (!v) return "";
  if (opts.githubUsername && /^@?[a-z\d](?:[a-z\d-]{0,38})$/i.test(v)) {
    return `https://github.com/${v.replace(/^@/, "")}`;
  }
  const withProto = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withProto);
    if (!u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export function validateApplication(
  raw: Raw,
  opts: { schools: readonly string[]; forms: readonly string[] },
): ValidationResult<ApplicationData, FieldErrors> {
  const e: FieldErrors = {};

  const fullName = str(raw, "fullName");
  if (fullName.length < 2) e.fullName = "Tell us your full name.";
  else if (fullName.length > 100) e.fullName = "That name is a bit long. 100 characters max.";

  const email = str(raw, "email").toLowerCase();
  if (!email) e.email = "We need an email to reach you.";
  else if (!EMAIL.test(email) || email.length > 200) e.email = "That email doesn’t look right.";

  const phone = str(raw, "phone");
  const digits = phone.replace(/\D/g, "");
  if (!phone) e.phone = "Add a phone number.";
  else if (digits.length < 7 || digits.length > 15 || /[^\d\s()+\-.]/.test(phone))
    e.phone = "Use a phone number like 876 555 0123.";

  const school = str(raw, "school");
  if (!school) e.school = "Pick your school.";
  else if (!opts.schools.includes(school)) e.school = "Pick a school from the list.";

  const form = str(raw, "form");
  if (!form) e.form = "Which form are you in?";
  else if (!opts.forms.includes(form)) e.form = "Pick one of the options.";

  const ageRaw = str(raw, "age");
  const age = Number(ageRaw);
  if (!ageRaw) e.age = "How old are you?";
  else if (!Number.isInteger(age) || age < 13 || age > 21) e.age = "Enter your age as a number, like 16.";

  const long = (key: "enjoy" | "built" | "why" | "jamaica") => {
    const v = str(raw, key);
    if (!v) e[key] = "This one’s required.";
    else if (v.length < LONG_ANSWER_MIN) e[key] = "Give us a little more. A sentence or two is perfect.";
    else if (v.length > LONG_ANSWER_MAX) e[key] = `Keep it under ${LONG_ANSWER_MAX} characters.`;
    return v;
  };
  const enjoy = long("enjoy");
  const built = long("built");
  const why = long("why");
  const jamaica = long("jamaica");

  const role = str(raw, "role");
  if (!role) e.role = "Pick the role that fits best. “Not sure yet” is fine.";
  else if (!(ROLES as readonly string[]).includes(role)) e.role = "Pick one of the options.";

  const hasTeam = str(raw, "hasTeam");
  if (hasTeam !== "yes" && hasTeam !== "no") e.hasTeam = "Let us know if you have a team.";

  const teammates = str(raw, "teammates");
  if (hasTeam === "yes" && teammates.length < 2) e.teammates = "Add your teammates’ names.";
  else if (teammates.length > 500) e.teammates = "Keep it under 500 characters.";

  const openToMatch = str(raw, "openToMatch");
  if (openToMatch !== "yes" && openToMatch !== "no") e.openToMatch = "Pick yes or no.";

  const github = normalizeUrl(str(raw, "github"), { githubUsername: true });
  if (github === null) e.github = "Use a GitHub username or link.";
  const portfolio = normalizeUrl(str(raw, "portfolio"));
  if (portfolio === null) e.portfolio = "That link doesn’t look right.";
  const projectLink = normalizeUrl(str(raw, "projectLink"));
  if (projectLink === null) e.projectLink = "That link doesn’t look right.";

  if (Object.keys(e).length) return { ok: false, errors: e };

  return {
    ok: true,
    value: {
      fullName,
      email,
      phone,
      school,
      form,
      age,
      enjoy,
      built,
      why,
      jamaica,
      role,
      hasTeam: hasTeam as "yes" | "no",
      teammates: hasTeam === "yes" ? teammates : "",
      openToMatch: openToMatch as "yes" | "no",
      github: github ?? "",
      portfolio: portfolio ?? "",
      projectLink: projectLink ?? "",
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Partner interest                                                           */
/* -------------------------------------------------------------------------- */

export type PartnerData = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  message: string;
};
export type PartnerErrors = Partial<Record<keyof PartnerData, string>>;

export function validatePartner(raw: Raw): ValidationResult<PartnerData, PartnerErrors> {
  const e: PartnerErrors = {};
  const name = str(raw, "name");
  if (name.length < 2) e.name = "Tell us your name.";
  const organization = str(raw, "organization");
  if (organization.length < 2) e.organization = "Which organization are you with?";
  const email = str(raw, "email").toLowerCase();
  if (!EMAIL.test(email)) e.email = "That email doesn’t look right.";
  const phone = str(raw, "phone");
  if (phone && phone.replace(/\D/g, "").length < 7) e.phone = "That number looks too short.";
  const message = str(raw, "message");
  if (message.length < 10) e.message = "A sentence or two about how you’d like to help.";
  else if (message.length > 2000) e.message = "Keep it under 2000 characters.";
  if (Object.keys(e).length) return { ok: false, errors: e };
  return { ok: true, value: { name, organization, email, phone, message } };
}
