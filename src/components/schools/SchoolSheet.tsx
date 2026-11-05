import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { buildTypes, eligibility, event, eventWhen, mlh, people, registration, schedule, venue } from "@/data/event";
import { judgeAlumniLine } from "@/data/alumni";
import type { SchoolBrief } from "@/data/schoolBriefs";
import {
  ambassadorRole,
  formsFor,
  hubLiaison,
  hubUrlShort,
  mediaHref,
  registrationState,
  hubFaqs,
  PROTOTYPE,
  schoolSheets,
  statusLabel,
  TODO_LABEL,
  type HubFaq,
  type HubStatus,
  type SheetKey,
} from "@/data/schoolHub";
import { sheetPillClass } from "./status";
import "./sheet.css";

/*
 * One-page printable sheets for a hub school: a student flyer, a parent and
 * guardian information sheet, a faculty overview and a poster. Same data as
 * the hub, so a sheet can never say something the hub does not. Every sheet
 * carries a QR code to the hub.
 */

const TEAM = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;
const START = schedule[0]?.time ?? "";
const END = schedule[schedule.length - 1]?.time ?? "";
const site = event.siteUrl.replace(/^https?:\/\/(www\.)?/, "");
const registerAt = registration.url.replace(/^https?:\/\//, "");

function Pill({ s }: { s?: HubStatus }) {
  return s ? <span className={`sheet-pill ${sheetPillClass[s]}`}>{statusLabel[s]}</span> : null;
}

/** The QR code to the hub, prerendered at /schools/<slug>/media/. */
function Qr({ brief, size }: { brief: SchoolBrief; size: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={mediaHref(brief, "qr")} alt={`QR code for ${hubUrlShort(brief)}`} style={{ width: size, height: size }} className="shrink-0 rounded-md bg-white" />;
}

function Frame({ brief, label, qr = true, children }: { brief: SchoolBrief; label: string; qr?: boolean; children: ReactNode }) {
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
          <footer className="flex shrink-0 items-center justify-between gap-4 bg-ink px-[0.6in] py-[0.12in] text-cream">
            {qr && <Qr brief={brief} size="0.56in" />}
            <div className="flex-1">
              <p className="text-[0.6rem] font-extrabold tracking-[0.16em] text-sun uppercase">Everything in one place</p>
              <p className="text-[1.15rem] leading-tight font-extrabold">
                {site}/schools/{brief.slug}
              </p>
            </div>
            <div className="text-right text-[0.72rem] leading-snug">
              {event.contactEmail && <p className="font-extrabold">{event.contactEmail}</p>}
              <p className="text-cream/70">
                {registrationState.label} · {registerAt}
              </p>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

function Facts({ brief }: { brief: SchoolBrief }) {
  const facts = [
    { k: "When", v: eventWhen.long, s: undefined as HubStatus | undefined },
    { k: "Where", v: `${venue.name}, ${venue.address}`, s: undefined },
    { k: "Hours", v: `${START} to ${END}, ${event.timeZone}. One day, not overnight.`, s: undefined },
    { k: "Who", v: `Students in ${formsFor(brief)}`, s: undefined },
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
        <h1 className="max-w-[10.5ch] text-[3.4rem] leading-[0.92] font-extrabold tracking-[-0.045em]">
          Build something <span className="sheet-under text-[var(--sb-primary)]">real</span> in one day.
        </h1>
        <DoctorBird aria-hidden flutter={false} mood="happy" className="absolute top-0 right-0 w-[2.5in]" />
      </div>
      <p className="mt-4 max-w-[5.3in] text-[1rem] leading-snug text-ink-2">
        Hack 876 is a one-day competition for secondary-school students. In a team of {TEAM}, you pick a real problem, build
        something that tackles it, and show it to judges who work in technology.
      </p>

      <div className="mt-4">
        <Facts brief={brief} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-5">
        <div>
          <H>You do not need to code</H>
          <p className="mt-1.5 text-[0.82rem] leading-snug text-ink-2">
            No programming experience is needed. Teams also need people who design, research, write, organize and present.
          </p>
          <p className="mt-2 text-[0.74rem] leading-snug text-ink-soft">{PROTOTYPE}</p>
          <div className="mt-4">
            <H>You could build</H>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {buildTypes.map((b) => (
                <li key={b.label} className="rounded-full border-[1.5px] border-ink bg-paper px-2.5 py-0.5 text-[0.72rem] font-bold">
                  {b.label}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[0.7rem] text-ink-soft">
              <strong className="text-ink">Bring your own laptop or device.</strong> Hack 876 does not provide them. AI tools are allowed, not required.
            </p>
          </div>
        </div>
        <div>
          <H>How to register</H>
          <ol className="mt-2 space-y-2">
            {[
              `Read the details at ${site}/schools/${brief.slug}.`,
              `Register on MLH at ${registerAt} with a free MyMLH account. Register alone or with friends.`,
              "After you register, you receive the parent or guardian consent form. Bring it signed on the day.",
            ].map((t, i) => (
              <li key={t} className="flex gap-2.5 text-[0.82rem] leading-snug">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--sb-primary)] text-[0.72rem] font-extrabold text-white">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <p className="mt-3 rounded-xl border-2 border-dashed border-ink/40 px-3 py-2 text-[0.72rem] leading-snug text-ink-soft">
            Places are limited to about {eligibility.maxHackers} students across several schools. Hack 876 is free for students. There is no
            school nomination step: you register yourself.
          </p>
        </div>
      </div>

      <div className="mt-auto pt-3">
       <div className="rounded-2xl border-2 border-ink bg-sun px-4 py-3">
        <p className="text-[1.25rem] leading-tight font-extrabold">Food is provided. Teams can mix schools. Prizes for the top teams.</p>
        <p className="mt-0.5 text-[0.74rem] font-semibold">
          {judgeAlumniLine(people, brief.school, brief.short)}Parents and guardians can find full details at the address below.
        </p>
       </div>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */

function ParentSheet({ brief, faq }: { brief: SchoolBrief; faq: (id: string) => HubFaq }) {
  const rows: [string, string][] = [
    ["Supervision and safety", "supervision"],
    ["Consent", "consent"],
    ["Food", "food"],
    ["Getting there and back", "transport"],
    ["Costs", "cost"],
    ["Laptops and devices", "laptop"],
    ["Contact on the day", "emergency"],
    ["AI tools and age limits", "ai-age"],
  ];
  /* On paper, "this page" means nothing. Name the address instead. */
  const here = (t: string) => t.replace(/this page/g, `${site}/schools/${brief.slug}`);
  return (
    <Frame brief={brief} label="Parent and guardian information">
      <h1 className="max-w-[28ch] text-[2.1rem] leading-[0.98] font-extrabold tracking-[-0.04em]">
        What parents and guardians <span className="sheet-under text-[var(--sb-primary)]">need to know.</span>
      </h1>
      <p className="mt-2.5 max-w-[6.6in] text-[0.86rem] leading-snug text-ink-2">
        Hack 876 is a one-day competition for secondary-school students. Working in small teams, students build a solution to a real
        problem and present it to judges who work in technology and business. No coding experience is needed. It is supervised and
        it is not overnight. Hack 876 is organized independently of {brief.school}.
      </p>
      <div className="mt-3.5">
        <Facts brief={brief} />
      </div>

      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
        {rows.map(([title, id]) => {
          const f = faq(id);
          return (
            <li key={id} className="border-t-2 border-ink/15 pt-1.5">
              <p className="text-[0.8rem] font-extrabold">{title}</p>
              <p className="mt-0.5 text-[0.7rem] leading-snug text-ink-2">{here(f.a.split("\n\n")[0])}</p>
              {f.todo && (
                <p className="mt-0.5 text-[0.66rem] leading-snug text-ink-soft">
                  <strong>{TODO_LABEL}:</strong> {here(f.todo)}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-auto rounded-xl border-2 border-ink bg-paper px-3.5 py-1.5 text-[0.72rem] leading-snug">
        <strong>How to take part.</strong> Students register themselves on MLH at {registerAt}, with a free MyMLH account. Hack 876 is free for
        students. Anything marked &ldquo;{TODO_LABEL}&rdquo; will be sent to families before the event.
      </p>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */

function FacultySheet({ brief }: { brief: SchoolBrief }) {
  const hub = brief.hub!;
  const liaison = hubLiaison(brief);
  /* On paper, "this page" means nothing. Name the address instead. */
  const here = (t: string) => t.replace(/this page/g, `${site}/schools/${brief.slug}`);
  return (
    <Frame brief={brief} label="Overview for teachers">
      <h1 className="max-w-[20ch] text-[2.25rem] leading-[0.98] font-extrabold tracking-[-0.04em]">
        How {brief.short} teachers can <span className="sheet-under text-[var(--sb-primary)]">support students.</span>
      </h1>
      <p className="mt-2.5 max-w-[6.6in] text-[0.86rem] leading-snug text-ink-2">
        Hack 876 is a one-day competition for about {eligibility.maxHackers} secondary-school students from several schools. In teams of{" "}
        {TEAM}, students build a solution to a real problem and present it to judges who work in technology and business. {brief.short} is not
        asked to pay, host or organize anything.
      </p>
      <div className="mt-3.5">
        <Facts brief={brief} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-5">
        <div>
          <H>How to share it with students</H>
          <ol className="mt-1.5 space-y-1.5">
            {hub.faculty.process.map(here).map((t, i) => (
              <li key={t} className="flex gap-2 text-[0.78rem] leading-snug">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--sb-primary)] text-[0.64rem] font-extrabold text-white">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <div className="mt-3.5">
            <H>Students who are a good fit</H>
            <Bullets items={hub.faculty.profiles} className="mt-1.5" />
          </div>
        </div>
        <div>
          <H>Faculty liaison</H>
          <p className="mt-1.5 text-[0.92rem] leading-tight font-extrabold">{liaison.name}</p>
          <p className="text-[0.74rem] font-bold text-[var(--sb-primary)]">{liaison.title}</p>
          <p className="mt-1 text-[0.74rem] leading-snug text-ink-2">{here(liaison.text)}</p>
          <div className="mt-3.5">
            <H>Student ambassadors</H>
            <p className="mt-1.5 text-[0.74rem] leading-snug text-ink-2">{hub.ambassadors.summary}</p>
            <Bullets items={ambassadorRole(brief).duties.map(here)} className="mt-1.5" />
          </div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-[1.25fr_1fr] gap-3">
        <p className="rounded-xl border-2 border-ink bg-paper px-3.5 py-2.5 text-[0.74rem] leading-snug">
          {brief.planningRange ? (
            <>
              <strong>
                Roughly {brief.planningRange.min} to {brief.planningRange.max} {brief.short} students.
              </strong>{" "}
              This is the organizers&rsquo; planning estimate, not a quota.
            </>
          ) : (
            <strong>No school has a quota.</strong>
          )}{" "}
          Every student registers individually on MLH; there is no nomination step.
        </p>
        <p className="rounded-xl border-2 border-dashed border-ink/40 px-3.5 py-2.5 text-[0.72rem] leading-snug text-ink-soft">{brief.liaison.note}</p>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */

/** A noticeboard poster: only the essentials and a big QR code. Content sits inside the A4 width, so it prints on Letter or A4. */
function Poster({ brief }: { brief: SchoolBrief }) {
  return (
    <Frame brief={brief} label="Poster" qr={false}>
      <div className="flex items-center gap-4">
        <Image src={brief.crest} alt="" width={96} height={96} className="h-[0.95in] w-[0.95in] object-contain" />
        <div>
          <p className="text-[0.72rem] font-extrabold tracking-[0.16em] text-[var(--sb-primary)] uppercase">Confirmed participating school</p>
          <p className="text-[1.9rem] leading-[1.02] font-extrabold tracking-[-0.03em]">{brief.school}</p>
        </div>
      </div>
      <h1 className="mt-5 max-w-[11ch] text-[4.1rem] leading-[0.9] font-extrabold tracking-[-0.045em]">
        Build something <span className="sheet-under text-[var(--sb-primary)]">real</span> in one day.
      </h1>
      <p className="mt-4 max-w-[6.2in] text-[1.05rem] leading-snug text-ink-2">
        Hack 876 is a one-day build competition and {mlh.hackDayBadge.replace(/^An /, "an ")}. Teams of {TEAM} build a prototype and
        present it to judges. No coding experience needed.
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-2.5">
        {[
          ["When", eventWhen.long],
          ["Where", `${venue.name}, Kingston`],
          ["Who", `Students in ${formsFor(brief)}`],
          ["Cost", "Free for students"],
        ].map(([k, v]) => (
          <li key={k} className="rounded-xl border-2 border-ink bg-paper px-3.5 py-2.5">
            <p className="text-[0.6rem] font-extrabold tracking-[0.14em] text-ink-soft uppercase">{k}</p>
            <p className="mt-0.5 text-[1.05rem] leading-snug font-extrabold">{v}</p>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center gap-6 rounded-2xl border-[3px] border-ink bg-white p-4">
        <Qr brief={brief} size="2.1in" />
        <div>
          <p className="text-[2rem] leading-[1] font-extrabold tracking-[-0.03em]">Learn more & register</p>
          <p className="mt-2 text-[1.05rem] font-extrabold text-[var(--sb-primary)]">{hubUrlShort(brief)}</p>
          <p className="mt-2 text-[0.82rem] leading-snug text-ink-2">
            Scan the code for everything students, parents and teachers need, including how to register. Places are limited to about{" "}
            {eligibility.maxHackers} students.
          </p>
        </div>
      </div>
    </Frame>
  );
}

export function SchoolSheet({ brief, sheet }: { brief: SchoolBrief; sheet: SheetKey }) {
  const faqs = hubFaqs(brief);
  const faq = (id: string) => faqs.find((f) => f.id === id) as HubFaq;
  if (sheet === "students") return <StudentFlyer brief={brief} />;
  if (sheet === "parents") return <ParentSheet brief={brief} faq={faq} />;
  if (sheet === "poster") return <Poster brief={brief} />;
  return <FacultySheet brief={brief} />;
}

export { schoolSheets };
