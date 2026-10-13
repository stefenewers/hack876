import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { buildTypes, eligibility, event, eventWhen, schedule, venue } from "@/data/event";
import type { SchoolBrief } from "@/data/schoolBriefs";
import { applicationState, hubFaqs, schoolSheets, statusLabel, type HubFaq, type HubStatus, type SheetKey } from "@/data/schoolHub";
import "./sheet.css";

/*
 * One-page printable sheets for a hub school: a student flyer, a parent and
 * guardian information sheet and a faculty overview. Same data as the hub, so
 * a sheet can never say something the hub does not.
 */

const TEAM = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;
const START = schedule[0]?.time ?? "";
const END = schedule[schedule.length - 1]?.time ?? "";
const site = event.siteUrl.replace(/^https?:\/\/(www\.)?/, "");

const pillClass: Record<HubStatus, string> = { confirmed: "bg-mint", tentative: "bg-sun-light", pending: "border-dashed bg-cream text-ink-soft" };

function Pill({ s }: { s?: HubStatus }) {
  return s ? <span className={`sheet-pill ${pillClass[s]}`}>{statusLabel[s]}</span> : null;
}

function Frame({ brief, label, children }: { brief: SchoolBrief; label: string; children: ReactNode }) {
  const vars = { "--sb-primary": brief.colors.primary, "--sb-secondary": brief.colors.secondary } as CSSProperties;
  return (
    <div className="sheet-stage">
      <div className="sheet-scale">
        <article className="sheet" style={vars}>
          <header className="flex items-center justify-between border-b-2 border-ink px-[0.6in] py-[0.28in]">
            <div className="flex items-center gap-2.5">
              <BirdMark className="h-6 w-10" />
              <Logo className="text-[1.5rem]" />
              <span aria-hidden className="text-ink-soft">×</span>
              <Image src={brief.crest} alt="" width={34} height={34} className="h-[34px] w-[34px] object-contain" />
              <span className="text-sm font-extrabold">{brief.short}</span>
            </div>
            <p className="text-[0.62rem] font-extrabold tracking-[0.16em] text-[var(--sb-primary)] uppercase">{label}</p>
          </header>
          <div className="flex flex-1 flex-col px-[0.6in] pt-[0.32in] pb-[0.2in]">{children}</div>
          <footer className="flex items-center justify-between gap-4 bg-ink px-[0.6in] py-[0.2in] text-cream">
            <div>
              <p className="text-[0.6rem] font-extrabold tracking-[0.16em] text-sun uppercase">Everything in one place</p>
              <p className="text-[1.15rem] leading-tight font-extrabold">
                {site}/schools/{brief.slug}
              </p>
            </div>
            <div className="text-right text-[0.72rem] leading-snug">
              {event.contactEmail && <p className="font-extrabold">{event.contactEmail}</p>}
              <p className="text-cream/70">
                {applicationState.label} · {site}/apply
              </p>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

function Facts() {
  const facts = [
    { k: "When", v: eventWhen.long, s: (eventWhen.tentative ? "tentative" : undefined) as HubStatus | undefined },
    { k: "Where", v: `${venue.name}, ${venue.area.split(",")[0]}`, s: undefined },
    { k: "Hours", v: `${START} to ${END}. One day, not overnight.`, s: undefined },
    { k: "Who", v: `Students in ${eligibility.forms}`, s: undefined },
  ];
  return (
    <dl className="grid grid-cols-2 gap-2">
      {facts.map((f) => (
        <div key={f.k} className="rounded-xl border-2 border-ink bg-paper px-3 py-2">
          <dt className="flex items-center justify-between text-[0.56rem] font-extrabold tracking-[0.14em] text-ink-soft uppercase">
            {f.k} <Pill s={f.s} />
          </dt>
          <dd className="mt-0.5 text-[0.86rem] leading-snug font-extrabold">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

function H({ children }: { children: ReactNode }) {
  return <h2 className="text-[0.62rem] font-extrabold tracking-[0.16em] text-[var(--sb-primary)] uppercase">{children}</h2>;
}

function Bullets({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-1 text-[0.78rem] leading-snug ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-2">
          <span aria-hidden className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sb-primary)]" />
          {t}
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */

function StudentFlyer({ brief }: { brief: SchoolBrief }) {
  return (
    <Frame brief={brief} label="Student flyer">
      <div className="relative">
        <h1 className="max-w-[9.5ch] text-[4.3rem] leading-[0.92] font-extrabold tracking-[-0.045em]">
          Build something <span className="sheet-under text-[var(--sb-primary)]">real</span> in one day.
        </h1>
        <DoctorBird aria-hidden flutter={false} mood="happy" className="absolute top-0 right-0 w-[2.5in]" />
      </div>
      <p className="mt-4 max-w-[5.3in] text-[1rem] leading-snug text-ink-2">
        Hack 876 is a one-day build competition for Jamaican secondary-school students. Pick a real problem, build a working
        prototype with a team of {TEAM}, and present it to judges who work in tech.
      </p>

      <div className="mt-5">
        <Facts />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5">
        <div>
          <H>You do not need to code</H>
          <p className="mt-1.5 text-[0.82rem] leading-snug text-ink-2">
            No programming experience is required. Teams need designers, researchers, storytellers, presenters and builders.
          </p>
          <div className="mt-4">
            <H>You could build</H>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {buildTypes.map((b) => (
                <li key={b.label} className="rounded-full border-[1.5px] border-ink bg-paper px-2.5 py-0.5 text-[0.72rem] font-bold">
                  {b.label}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[0.7rem] text-ink-soft">AI is allowed, not required. Permitted tools will be announced.</p>
          </div>
        </div>
        <div>
          <H>How to get in</H>
          <ol className="mt-2 space-y-2">
            {[
              `Ask about it at ${brief.short}, or get recommended by a teacher.`,
              `Apply yourself at ${site}/apply. Solo or with friends.`,
              "We read every application and let you know.",
            ].map((t, i) => (
              <li key={t} className="flex gap-2.5 text-[0.82rem] leading-snug">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--sb-primary)] text-[0.72rem] font-extrabold text-white">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <p className="mt-3 rounded-xl border-2 border-dashed border-ink/40 px-3 py-2 text-[0.72rem] leading-snug text-ink-soft">
            Places are limited to about {eligibility.maxHackers} students across all schools. A recommendation does not guarantee a place.
          </p>
        </div>
      </div>

      <div className="mt-auto rounded-2xl border-2 border-ink bg-sun px-4 py-3">
        <p className="text-[1.25rem] leading-tight font-extrabold">Food is provided. Teams can mix schools. Prizes for the top teams.</p>
        <p className="mt-0.5 text-[0.74rem] font-semibold">
          {brief.alumni ? `Several judges and both organizers went to ${brief.short}. ` : ""}Questions? Everything is answered on the page below.
        </p>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */

function ParentSheet({ brief, faq }: { brief: SchoolBrief; faq: (id: string) => HubFaq }) {
  const rows: [string, string][] = [
    ["Food", "food"],
    ["Supervision and safeguarding", "supervision"],
    ["Consent", "consent"],
    ["Drop-off, pick-up and transport", "transport"],
    ["Emergency contacts", "emergency"],
    ["Costs", "cost"],
    ["AI tools and age limits", "ai-age"],
    ["Can a parent approve an 18+ tool?", "consent-override"],
  ];
  return (
    <Frame brief={brief} label="Parent and guardian information">
      <h1 className="max-w-[16ch] text-[2.5rem] leading-[0.98] font-extrabold tracking-[-0.04em]">
        What parents and guardians <span className="sheet-under text-[var(--sb-primary)]">need to know.</span>
      </h1>
      <p className="mt-2.5 max-w-[6.6in] text-[0.86rem] leading-snug text-ink-2">
        Hack 876 is a one-day build competition for Jamaican secondary-school students. Teams build a working prototype and present
        it to industry judges. It is supervised, it is not overnight, and no programming experience is required.
      </p>
      <div className="mt-3.5">
        <Facts />
      </div>

      <ul className="mt-3.5 grid grid-cols-2 gap-x-4 gap-y-2">
        {rows.map(([title, id]) => {
          const f = faq(id);
          return (
            <li key={id} className="border-t-2 border-ink/15 pt-1.5">
              <p className="flex flex-wrap items-center justify-between gap-1 text-[0.8rem] font-extrabold">
                {title} <Pill s={f.status} />
              </p>
              <p className="mt-0.5 text-[0.72rem] leading-snug text-ink-2">{f.a.replace(/\n\n/g, " ")}</p>
            </li>
          );
        })}
      </ul>

      <p className="mt-auto rounded-xl border-2 border-ink bg-paper px-3.5 py-2.5 text-[0.76rem] leading-snug">
        <strong>Honest status.</strong> Anything marked &ldquo;{statusLabel.pending}&rdquo; has not been decided. Families will hear from
        Hack 876 before a child is asked to commit to anything. A school recommendation does not guarantee a place.
      </p>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */

function FacultySheet({ brief }: { brief: SchoolBrief }) {
  const hub = brief.hub!;
  return (
    <Frame brief={brief} label="Faculty participation overview">
      <h1 className="max-w-[18ch] text-[2.5rem] leading-[0.98] font-extrabold tracking-[-0.04em]">
        How {brief.short} can take part, <span className="sheet-under text-[var(--sb-primary)]">without extra work.</span>
      </h1>
      <p className="mt-2.5 max-w-[6.6in] text-[0.86rem] leading-snug text-ink-2">
        Hack 876 is a one-day build competition for about {eligibility.maxHackers} Jamaican secondary-school students, in teams of {TEAM}.
        {" "}
        {brief.short} is not asked for money or to organize anything. Hack 876 runs the event and supplies the materials.
      </p>
      <div className="mt-3.5">
        <Facts />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-5">
        <div>
          <H>How recommending works</H>
          <ol className="mt-1.5 space-y-1.5">
            {hub.faculty.process.map((t, i) => (
              <li key={t} className="flex gap-2 text-[0.78rem] leading-snug">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--sb-primary)] text-[0.64rem] font-extrabold text-white">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <div className="mt-3.5">
            <H>Who tends to do well</H>
            <Bullets items={hub.faculty.profiles} className="mt-1.5" />
          </div>
        </div>
        <div>
          <H>Faculty liaison</H>
          <p className="mt-1.5 text-[0.92rem] leading-tight font-extrabold">{brief.liaison.name}</p>
          <p className="text-[0.74rem] font-bold text-[var(--sb-primary)]">{brief.liaison.title}</p>
          <p className="mt-1 text-[0.74rem] leading-snug text-ink-2">{brief.liaison.role}</p>
          <div className="mt-3.5">
            <H>Student ambassadors · to be nominated</H>
            <p className="mt-1.5 text-[0.74rem] leading-snug text-ink-2">{hub.ambassadors.summary}</p>
            <Bullets items={hub.ambassadors.duties} className="mt-1.5" />
          </div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-[1.25fr_1fr] gap-3">
        <p className="rounded-xl border-2 border-ink bg-paper px-3.5 py-2.5 text-[0.74rem] leading-snug">
          <strong>Planning range: {brief.planningRange.min} to {brief.planningRange.max} {brief.short} students.</strong> This is provisional, not a
          quota. Every student applies and is selected individually, and a recommendation does not guarantee a place.
        </p>
        <p className="rounded-xl border-2 border-dashed border-ink/40 px-3.5 py-2.5 text-[0.72rem] leading-snug text-ink-soft">{brief.liaison.note}</p>
      </div>
    </Frame>
  );
}

export function SchoolSheet({ brief, sheet }: { brief: SchoolBrief; sheet: SheetKey }) {
  const faqs = hubFaqs(brief);
  const faq = (id: string) => faqs.find((f) => f.id === id) as HubFaq;
  if (sheet === "students") return <StudentFlyer brief={brief} />;
  if (sheet === "parents") return <ParentSheet brief={brief} faq={faq} />;
  return <FacultySheet brief={brief} />;
}

export { schoolSheets };
