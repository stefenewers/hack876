import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { TailLine } from "@/components/art/Marks";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { eligibility, event, eventWhen, venue } from "@/data/event";
import { schoolHubs } from "@/data/schoolBriefs";
import { formsFor } from "@/data/schoolHub";

export const metadata: Metadata = {
  title: "Participating Schools",
  description: "Every school taking part in Hack 876 has its own hub: everything students, families, teachers and student ambassadors need in one place.",
  alternates: { canonical: "/schools" },
};

/*
 * The front door to the school network: one card per confirmed school, from
 * event.ts `confirmedSchools`. Briefs for schools still in talks are reachable
 * by direct link only and are not listed here.
 */
export default function SchoolsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="grain relative min-h-dvh bg-cream pt-28 pb-24 sm:pt-36">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="eyebrow text-emerald-deep">For schools</p>
          <h1 className="display mt-3 text-[clamp(2.5rem,8.5vw,4.6rem)] leading-[0.95]">
            Your school.{" "}
            <span className="relative inline-block">
              Your Hack 876 hub.
              <TailLine className="absolute -bottom-3 left-0 h-5 w-full" />
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2">
            Every participating school has its own page with everything students, families, teachers and student ambassadors need: who can
            register, the day itself, consent, safety, and graphics and flyers to share.
          </p>
          <p className="mt-3 text-sm font-bold text-ink-soft">
            {eventWhen.long} · {venue.name}, Kingston · Free for students · About {eligibility.maxHackers} places
          </p>

          <h2 className="mt-14 text-sm font-extrabold tracking-[0.16em] text-ink-soft uppercase">
            {schoolHubs.length} confirmed participating schools
          </h2>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {schoolHubs.map((b) => {
              return (
                <li key={b.slug}>
                  <Link
                    href={`/schools/${b.slug}`}
                    className="sticker sticker-hover group flex h-full flex-col overflow-hidden bg-paper"
                    style={{ "--sb": b.colors.primary } as CSSProperties}
                  >
                    <span aria-hidden className="block h-2.5 bg-[var(--sb)]" />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-4">
                        <Image src={b.crest} alt="" width={64} height={64} className="h-16 w-16 shrink-0 object-contain" />
                        <span className="min-w-0 text-xl leading-tight font-extrabold break-words">{b.school}</span>
                      </div>
                      <span className="mt-4 self-start rounded-full border-2 border-ink bg-mint px-2.5 py-0.5 text-[0.7rem] font-extrabold tracking-wide text-emerald-deep uppercase">
                        Confirmed participating school
                      </span>
                      <span className="mt-3 text-[0.95rem] leading-snug text-ink-2">Students in {formsFor(b)} can register.</span>
                      <span className="mt-1.5 flex-1 text-sm leading-snug text-ink-soft">
                        {b.hub.cardLine}
                      </span>
                      <span className="mt-5 inline-flex items-center gap-1.5 font-extrabold text-[var(--sb)]">
                        Open the {b.short} hub <span aria-hidden className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">→</span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-16 grid gap-5 sm:grid-cols-[1.4fr_1fr]">
            <div className="rounded-2xl border-2 border-dashed border-ink/30 p-6">
              <h2 className="text-lg font-extrabold">Interested in bringing Hack 876 to your school?</h2>
              <p className="mt-2 text-ink-2">
                Hack 876 is free for schools and students, and schools are not asked to host, pay or organize anything. Teachers and school
                leaders can get in touch with the organizing team.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/partner" className="btn btn-secondary btn-sm">
                  Get in touch
                </Link>
                {event.contactEmail && (
                  <a href={`mailto:${event.contactEmail}`} className="self-center font-semibold text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
                    {event.contactEmail}
                  </a>
                )}
              </div>
            </div>
            <div className="rounded-2xl border-2 border-dashed border-ink/30 p-6">
              <h2 className="text-lg font-extrabold">Not sure which page you need?</h2>
              <p className="mt-2 text-ink-2">
                Students at any school can read about the event, the rules and how to register on the main site.
              </p>
              <Link href="/#faq" className="mt-4 inline-block font-semibold text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
                Read the FAQ
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
