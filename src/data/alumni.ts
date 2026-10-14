/*
 * Wording about which Hack 876 organizers and judges attended a school,
 * derived from the people in event.ts. Nothing here assumes that every
 * organizer attended every school. No imports, so it can be tested directly.
 */

type Who = { name: string; role: string; confirmed?: boolean; schools?: string[] };

const WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const word = (n: number) => WORDS[n] ?? String(n);
const list = (names: string[]) => (names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`);

export function schoolConnections(people: Who[], school: string) {
  const confirmed = people.filter((p) => p.confirmed);
  const organizers = confirmed.filter((p) => p.role === "organizer");
  const judges = confirmed.filter((p) => p.role === "judge");
  const attended = (p: Who) => p.schools?.includes(school) ?? false;
  return {
    organizers: organizers.map((p) => p.name),
    organizerAlumni: organizers.filter(attended).map((p) => p.name),
    judgeAlumni: judges.filter(attended).map((p) => p.name),
  };
}

/** Follows "...led by A and B": ", who both attended X", ". A attended X" or "". */
export function organizerAlumniClause(people: Who[], school: string, short: string) {
  const { organizers, organizerAlumni } = schoolConnections(people, school);
  if (organizerAlumni.length === 0) return "";
  if (organizerAlumni.length === organizers.length) return organizers.length === 2 ? `, who both attended ${short}` : organizers.length === 1 ? `, who attended ${short}` : `, who all attended ${short}`;
  return `. ${list(organizerAlumni)} attended ${short}`;
}

/** One sentence on how many judges and organizers attended a school, or "" if none. */
export function alumniSummary(people: Who[], school: string, short: string) {
  const { organizers, organizerAlumni, judgeAlumni } = schoolConnections(people, school);
  const parts: string[] = [];
  if (judgeAlumni.length) parts.push(`${word(judgeAlumni.length)} of the judges`);
  if (organizerAlumni.length) {
    parts.push(
      organizerAlumni.length === organizers.length
        ? organizers.length === 2
          ? "both organizers"
          : `all ${word(organizers.length)} organizers`
        : `${word(organizerAlumni.length)} of the ${word(organizers.length)} organizers`,
    );
  }
  if (parts.length === 0) return "";
  const total = judgeAlumni.length + organizerAlumni.length;
  const s = `${list(parts)} of Hack 876 ${total === 1 ? "is a former" : "are former"} ${short} ${total === 1 ? "student" : "students"}.`;
  return s[0].toUpperCase() + s.slice(1);
}

/** For the student flyer: the judges only, since organizers are named elsewhere. */
export function judgeAlumniLine(people: Who[], school: string, short: string) {
  const n = schoolConnections(people, school).judgeAlumni.length;
  if (n === 0) return "";
  return n === 1 ? `One of the judges is a former ${short} student. ` : `${word(n)[0].toUpperCase()}${word(n).slice(1)} of the judges are former ${short} students. `;
}
