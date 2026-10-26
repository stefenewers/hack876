/**
 * Partner-form validation, plus the URL helper. Pure functions with no imports
 * so the same rules run in the browser (instant feedback) and on the server
 * (the source of truth), and can be unit-tested with plain `node --test`.
 *
 * Students register on MLH, so there is no student application here.
 */

export type ValidationResult<T, E> = { ok: true; value: T } | { ok: false; errors: E };

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
