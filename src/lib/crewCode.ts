import "server-only";
import { timingSafeEqual } from "node:crypto";

/*
 * The /crew invite code check, shared by the page and its Server Actions. The
 * code lives only in the CREW_INVITE_CODE environment variable and never
 * reaches the client. While it is unset, crew sign-up is closed.
 */

export const crewOpen = () => !!process.env.CREW_INVITE_CODE;

/** True when `candidate` matches CREW_INVITE_CODE, compared in constant time. */
export function crewCodeMatches(candidate: unknown) {
  const code = process.env.CREW_INVITE_CODE;
  if (!code || typeof candidate !== "string" || !candidate) return false;
  const a = Buffer.from(candidate.trim());
  const b = Buffer.from(code);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
