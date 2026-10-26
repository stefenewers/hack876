import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Campus } from "@/components/art/Campus";
import { Icon } from "@/components/art/Icons";
import { TailLine } from "@/components/art/Marks";
import { RegisterLink } from "@/components/site/RegisterLink";
import { eligibility, event, eventWhen, foodNote, mlh, registration, schedule, schoolLogos, schoolStatus, schools, venue, venueArrivalPending } from "@/data/event";

const DOORS = schedule[0]?.time ?? "";
const WRAP = schedule[schedule.length - 1]?.time ?? "";
const linkClass = "font-bold text-ink underline decoration-emerald decoration-2 underline-offset-4";

/** Everything MLH asks an event page to state, in one place. Every fact comes from event.ts. */
function EventDetails() {
  const pendingTag = (
    <span className="ml-1 inline-block rounded-full border-2 border-dashed border-ink/40 px-2 py-0.5 align-middle text-[0.65rem] font-extrabold tracking-wide text-ink-soft uppercase">
      To be confirmed
    </span>
  );
  const rows: { k: string; v: ReactNode }[] = [
    { k: "Date and time", v: `${eventWhen.long}, ${DOORS} to ${WRAP}. ${event.timeZone}.` },
    { k: "Venue", v: `${venue.name}, ${venue.address}` },
    {
      k: "Room and arrival",
      v: venue.room && venue.arrival ? `${venue.room}. ${venue.arrival}` : (
        <>
          {venueArrivalPending} {pendingTag}
        </>
      ),
    },
    { k: "Format", v: "Hack 876 is entirely in person. There is no remote participation. Check-in is at the doors, in person only." },
    { k: "Cost", v: "Free for students." },
    {
      k: "Who it’s for",
      v: (
        <>
          Secondary-school students in {eligibility.forms}. Most participants are under 18, so a parent or guardian must give consent.{" "}
          <Link href="/#parents" className={linkClass}>
            For parents
          </Link>
        </>
      ),
    },
    { k: "Food and drink", v: foodNote },
    { k: "What to bring", v: "Your own laptop and charger, your school ID, a water bottle and your signed parent or guardian consent form. Hack 876 does not provide laptops; please bring your own." },
    {
      k: "Registering",
      v: (
        <>
          You need a free MyMLH account to register and to submit your project.{" "}
          <RegisterLink className={linkClass}>{registration.labelLong}</RegisterLink>
        </>
      ),
    },
    {
      k: "Code of Conduct",
      v: (
        <>
          Hack 876 follows the{" "}
          <a href={mlh.codeOfConductUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
            MLH Code of Conduct
            <span className="sr-only"> (opens in a new tab)</span>
          </a>{" "}
          and{" "}
          <Link href="/code-of-conduct" className={linkClass}>
            ours
          </Link>
          .
        </>
      ),
    },
    { k: "Accessibility", v: `Tell us about any accessibility needs when you register, or email ${event.contactEmail}.` },
    {
      k: "Questions",
      v: event.contactEmail ? (
        <a href={`mailto:${event.contactEmail}`} className={linkClass}>
          {event.contactEmail}
        </a>
      ) : null,
    },
  ];
  return (
    <div id="event-details" data-reveal className="mt-16 scroll-mt-24 rounded-[2rem] border-[3px] border-ink bg-paper p-6 shadow-[6px_8px_0_0_var(--color-ink)] sm:p-9">
      <p className="eyebrow text-emerald-deep">{mlh.hackDayBadge}</p>
      <h3 className="display mt-2 text-3xl sm:text-4xl">Event details</h3>
      <dl className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2">
        {rows.map((row) => (
          <div key={row.k} className="border-b-2 border-dashed border-ink/15 pb-3">
            <dt className="text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">{row.k}</dt>
            <dd className="mt-1 leading-snug font-semibold text-ink-2">{row.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function initials(name: string) {
  return name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter((w) => !["for", "of", "the"].includes(w.toLowerCase()))
    .map((w) => w[0].toUpperCase())
    .join("")
    .slice(0, 5);
}

export function Attend() {
  return (
    <section id="attend" aria-labelledby="attend-title" className="grain relative bg-cream pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Who */}
          <div data-reveal>
            <p className="eyebrow text-emerald-deep">Who can attend</p>
            <h2 id="attend-title" className="display mt-3 text-[clamp(2.4rem,6.5vw,4.2rem)]">
              <span className="relative inline-block">
                5th Form
                <TailLine className="absolute -bottom-3 left-0 h-5 w-full" />
              </span>{" "}
              through
              <br />
              Upper 6th Form.
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-2">
              {eligibility.howToGetIn} You&rsquo;re welcome
              whether you code, design, research, or just really want to build something.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { k: "Team size", v: `${eligibility.teamSize.min}–${eligibility.teamSize.max}`, sub: "students", c: "bg-sun" },
                { k: "Spots", v: `${eligibility.maxHackers}`, sub: "hackers max", c: "bg-aqua" },
                { k: "Schools", v: `${schools.length}`, sub: "participating", c: "bg-pink" },
              ].map((f, i) => (
                <div key={f.k} className={`sticker px-3 py-4 text-center sm:px-4 ${f.c}`} style={{ rotate: `${[-2, 1.5, -1][i]}deg` }}>
                  <dt className="text-xs font-extrabold tracking-[0.12em] uppercase sm:text-sm">{f.k}</dt>
                  <dd className="display mt-1 text-4xl sm:text-5xl">{f.v}</dd>
                  <dd className="text-sm font-semibold">{f.sub}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Venue */}
          <div data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties} className="relative">
            <div className="overflow-hidden rounded-[2rem] border-[3px] border-ink bg-paper shadow-[6px_8px_0_0_var(--color-ink)]">
              <Campus className="aspect-[600/380]" />
              <div className="flex flex-wrap items-center justify-between gap-4 border-t-[3px] border-ink p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <Icon name="pin" className="h-10 w-10 shrink-0" />
                  <div>
                    <p className="eyebrow text-[0.7rem] text-ink-soft">
                      {venue.confirmed ? "Venue" : "Location"}
                    </p>
                    <p className="display text-3xl">{venue.name}</p>
                    <p className="font-semibold text-ink-2">{venue.address}</p>
                  </div>
                </div>
                {venue.mapsUrl && (
                  <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                    View on Maps <span aria-hidden>↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
            {!venue.confirmed && (
              <p className="hand absolute -top-5 right-4 rotate-3 rounded-lg border-2 border-ink bg-sun px-3 py-1 text-lg shadow-[2px_3px_0_0_var(--color-ink)]">
                exact spot soon!
              </p>
            )}
          </div>
        </div>

        <EventDetails />

        {/* Schools */}
        <div className="mt-20">
          <h3 data-reveal className="display text-center text-3xl sm:text-4xl">
            From {schools.length} participating schools
          </h3>
          <ul className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-5 [&>li]:w-[calc(50%-0.5rem)] sm:[&>li]:w-[calc(25%-0.9375rem)]">
            {schools.map((s, i) => {
              const logo = schoolLogos[s];
              const status = schoolStatus(s);
              const pending = status === "pending";
              return (
                <li
                  key={s}
                  data-reveal="pop"
                  style={{ "--reveal-delay": `${(i % 4) * 60}ms`, "--reveal-rot": `${i % 2 ? 3 : -3}deg` } as CSSProperties}
                  className="sticker sticker-hover flex flex-col items-center gap-3 bg-white px-3 py-5 text-center"
                >
                  <div className={`relative grid h-20 w-20 shrink-0 place-items-center sm:h-24 sm:w-24 ${pending ? "opacity-45 grayscale" : ""}`}>
                    {logo ? (
                      <Image src={logo} alt="" fill sizes="96px" className="object-contain" />
                    ) : (
                      <span aria-hidden className="display grid h-20 w-20 place-items-center rounded-full border-[3px] border-ink bg-emerald text-xl text-white sm:h-24 sm:w-24">
                        {initials(s)}
                      </span>
                    )}
                  </div>
                  <span className="text-[0.95rem] leading-tight font-extrabold">{s}</span>
                  {status === "talks" ? (
                    <span className="-mt-1 rounded-full border-2 border-ink bg-sun-light px-2.5 py-0.5 text-[0.7rem] font-extrabold tracking-wide text-ink uppercase">
                      In talks
                    </span>
                  ) : pending ? (
                    <span className="-mt-1 rounded-full border-2 border-dashed border-ink/40 bg-cream px-2.5 py-0.5 text-[0.7rem] font-extrabold tracking-wide text-ink-soft uppercase">
                      Pending confirmation
                    </span>
                  ) : (
                    <span className="-mt-1 rounded-full border-2 border-ink bg-mint px-2.5 py-0.5 text-[0.7rem] font-extrabold tracking-wide text-emerald-deep uppercase">
                      Confirmed
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
