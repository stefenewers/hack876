import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { eligibility, event, eventWhen, people, roleLabels } from "@/data/event";
import { Blueprint } from "@/components/proposal/Illustrations";
import { Check, Kicker, Lines, Ref } from "@/components/proposal/primitives";
import { BandStrip, LevelsSection } from "@/components/proposal/Sponsorship";
import "@/components/proposal/proposal.css";
import { DeliverySection, NextSection, OpeningSummary } from "@/components/proposal/PartnershipSections";

/*
 * Private partnership proposal for Loring Consulting Engineers.
 * Not linked from the public site. noindex/nofollow here and via an
 * X-Robots-Tag header in next.config.ts.
 */

export const metadata: Metadata = {
  title: { absolute: "Hack876 × Loring Consulting Engineers" },
  description: "A private partnership proposal.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true } },
  openGraph: null,
  twitter: null };

/* A Loring engineer already involved in Hack876 (from the site's people data). */
const LORING_JUDGE = people.find((p) => p.confirmed && p.organization === "Loring Consulting Engineers");

/* Canonical numbers come from the event data. */
const STUDENTS = eligibility.maxHackers;
/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null);

/* Loring-owned sources for every company claim on this page. */
const SOURCES = [
  {
    id: 1,
    label: "Our History — founded 1956 by Joseph R. Loring",
    href: "https://www.loringengineers.com/about/our-history/" },
  {
    id: 2,
    label: "Loring Consulting Engineers Celebrates Official Launch of Jamaica Office (March 4, 2026)",
    href: "https://www.loringengineers.com/news/loring-consulting-engineers-celebrates-official-launch-of-jamaica-office/" },
  {
    id: 3,
    label: "Oneil Gayle, Chief Executive Officer — leadership biography",
    href: "https://www.loringengineers.com/people/oneil-gayle/" },
  {
    id: 4,
    label: "Loring Consulting Engineers Promotes Oneil Gayle to CEO (December 2023)",
    href: "https://www.loringengineers.com/news/loring-consulting-engineers-promotes-oneil-gayle-to-ceo/" },
] as const;

export default function LoringOpportunityPage() {
  return (
    <div className="lp" style={{ "--lp-deck-label": '"Hack876 × Loring Consulting Engineers"' } as CSSProperties}>
      <header className="lp-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.5rem]" />
        </Link>
        <DownloadDeck href="/proposals/hack876-loring-partnership-proposal.pdf" filename="Hack876 x Loring Consulting Engineers - Partnership Proposal.pdf" />
      </header>

      <main id="main">
        <div className="lp-page">
          <OpeningSummary
            label="Hack876 × Loring Consulting Engineers"
            docLabel="Private partnership proposal"
            org="Loring"
            headline={`Put working engineers in the room with Jamaica’s next builders.`}
            highlight={`working engineers`}
            sub={`Hack876 is open to hardware, energy and building-systems projects as well as software. Students who try them need to meet people who do that work.`}
            brief={{
              fit: `Loring opened its Kingston office in 2023, and its CEO, Oneil Gayle, was born and raised in Jamaica and began at Loring as a summer intern.`,
              request: `Loring engineers as judges, mentors and a speaker on the day. We also invite Loring to consider a Platinum contribution toward the event.`,
              enables: `Teams building physical and technical projects get advice from working engineers. A contribution helps support the equipment teams build with, the prizes, student meals and the running of the day.`,
              outcome: `Loring’s Kingston engineers work with about ${STUDENTS} students for a day. Loring receives recognition that matches its contribution, and a written recap.`,
              next: `A conversation with Johnathan Clarke at Loring, who already works with Hack876, on which engineers could take part and whether a contribution is possible.`,
            }}
            requestDetail={`Platinum Partner: J$1,000,000+. Any level is welcome, and the levels are set out in the appendix.`}
          />
        </div>
        <div className="lp-page">
          <MoreThanMoney />
        </div>
        <div className="lp-page">
          <WhyLoring />
        </div>
        <div className="lp-page">
          <GoldPartner />
        </div>
        <div className="lp-page">
          <GoldBenefits />
        </div>
        <div className="lp-page">
          <DeliverySection n="05" />
        </div>
        <div className="lp-page">
          <NextSection n="06" next="A reply on which engineers could take part, and whether Loring would consider a contribution at Platinum or another level." closing="We would love to build the first one with Loring." />
        </div>
        <div className="lp-page">
          <LevelsSection n="07" heading="Contribution levels, and what each receives." lead="Any amount within a level is welcome." recommended="platinum" />
        </div>
        <div className="lp-page">
          <Closing />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  05 — Why Loring                                                           */
/* -------------------------------------------------------------------------- */

function WhyLoring() {
  return (
    <section aria-labelledby="lp-why" className="lp-section">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Kicker n="02">Why Loring</Kicker>
          <h2 id="lp-why" className="lp-h2 mt-6">
            Why Loring?
          </h2>
          <Blueprint className="mt-10 hidden w-full max-w-sm lg:block print:block print:max-w-[3.1in]" />
        </div>
        <div>
          <div className="lp-prose">
            <p className="font-semibold text-ink">Because the alignment goes much deeper than sponsorship.</p>
            <p>
              Loring has spent 70 years solving complex engineering problems.
              <Ref id={1} />
            </p>
            <p>Today, that story increasingly includes Jamaica.</p>
            <p>
              Loring opened its Kingston office in 2023 and formally launched the office in Jamaica in 2026.
              <Ref id={2} />
            </p>
            <p>The reason matters.</p>
            <p>
              CEO <strong className="text-ink">Oneil Gayle</strong>, born and raised in Jamaica, has spoken about wanting
              to help expand career pathways for engineers in Jamaica.
              <Ref id={2} />
            </p>
            <p>Loring is already investing in engineering talent in Jamaica.</p>
            <p className="font-semibold text-ink">Hack876 creates an opportunity to begin that investment even earlier.</p>
          </div>

          <div className="mt-12 space-y-2 print:mt-8" aria-label="Earlier than usual">
            {["Before the internship.", "Before the degree.", "Before the first job application."].map((t, i) => (
              <p
                key={t}
                className="lp-sub"
                style={{ paddingLeft: `${i * 1.5}em`, color: ["var(--color-ink-soft)", "var(--color-ink-2)", "var(--color-emerald-deep)"][i] }}
              >
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  11 — More than money                                                      */
/* -------------------------------------------------------------------------- */

const ROLES = [
  { title: "Mentors", text: "Helping teams think through technical problems." },
  { title: "Judges", text: "Evaluating creativity, execution and engineering thinking." },
  { title: "Speakers", text: "Showing students where engineering can take them." },
  { title: "Challenge partners", text: "Introducing a real-world engineering problem for students to explore." },
  { title: "Long-term connectors", text: "Continuing relationships with students and participating schools where appropriate." },
];

function MoreThanMoney() {
  return (
    <section aria-labelledby="lp-more" className="lp-section lp-dense lp-center bg-paper">
      <div className="lp-wrap">
        <Kicker n="01">More than money</Kicker>
        <h2 id="lp-more" className="lp-h2 mt-6 max-w-[20ch]">
          What Loring brings cannot be measured only in dollars.
        </h2>
        <Lines className="mt-8" items={["Funding makes Hack876 possible.", "But Loring can contribute something equally valuable:"]} />

        <p className="lp-marker lp-keep mt-10 text-[clamp(3rem,9vw,7rem)] text-emerald-deep print:mt-6">Engineers in the room.</p>

        <ul className="mt-10 grid gap-x-10 gap-y-3 text-lg font-semibold text-ink-2 md:grid-cols-2 print:mt-6 print:grid-cols-2">
          {[
            "People who understand how ideas become systems.",
            "People who have solved problems where the constraints are real.",
            "People who can ask better questions.",
            "People who can show a 17-year-old what an engineering career actually looks like.",
          ].map((t) => (
            <li key={t} className="border-l-2 border-emerald pl-4">
              {t}
            </li>
          ))}
        </ul>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 print:mt-8 print:grid-cols-5">
          {ROLES.map((r, i) => (
            <li key={r.title} className="rounded-2xl border lp-rule bg-cream p-5">
              <p className="lp-num text-3xl text-emerald-deep">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="lp-h3 mt-3">{r.title}</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">{r.text}</p>
            </li>
          ))}
        </ul>

        {LORING_JUDGE && (
          <figure className="lp-keep mt-12 flex flex-col gap-6 rounded-3xl border-2 border-ink bg-mint/70 p-6 shadow-[5px_6px_0_0_var(--color-ink)] sm:flex-row sm:items-center sm:p-8 print:mt-6 print:flex-row print:items-center print:p-5">
            {LORING_JUDGE.photo && (
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-ink sm:h-32 sm:w-32 print:h-24 print:w-24">
                <Image src={LORING_JUDGE.photo} alt={`Portrait of ${LORING_JUDGE.name}`} fill sizes="128px" className="object-cover" />
              </div>
            )}
            <figcaption>
              <p className="text-xs font-extrabold tracking-[0.16em] text-emerald-deep uppercase">Already in the room</p>
              <p className="mt-2 text-[clamp(1.3rem,2.4vw,1.8rem)] leading-snug font-extrabold tracking-tight">
                {LORING_JUDGE.name} of Loring Consulting Engineers is already a Hack876 {roleLabels[LORING_JUDGE.role].singular.toLowerCase()}.
              </p>
              <p className="mt-2 text-lg text-ink-2">
                A long-standing friend of the Hack876 organizers, Johnathan is already part of the first cohort of people
                willing to believe in it before the proof exists.
              </p>
            </figcaption>
          </figure>
        )}

        <div className="lp-keep mt-16 print:mt-8">
          <p className="lp-statement max-w-[22ch]">We do not simply want Loring&rsquo;s logo in the room.</p>
          <p className="lp-sub mt-3 text-emerald-deep">We want Loring&rsquo;s engineers in the room.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  12 — Platinum Partner                                                         */
/* -------------------------------------------------------------------------- */

const GOLD_AREAS = [
  "Event production",
  "Student experience",
  "Equipment and materials",
  "Food and refreshments",
  "Prizes",
  "Signage and environment",
  "Operational costs",
  "Programming and logistics",
];

function GoldPartner() {
  return (
    <section aria-labelledby="lp-gold" className="lp-section lp-dark relative overflow-hidden">
      <div className="lp-wrap relative">
        <Kicker n="03">Our invitation</Kicker>
        <h2 id="lp-gold" className="lp-h2 mt-6 max-w-[18ch]">
          Become a Platinum Partner of the inaugural Hack876.
        </h2>

        <div className="lp-keep mt-12 border-y lp-rule py-10 print:mt-8 print:py-6">
          <p className="lp-num lp-accent text-[clamp(3.6rem,12vw,9.5rem)] text-sun">J$1,000,000</p>
          <p className="mt-4 text-lg font-bold tracking-[0.14em] uppercase sm:text-xl">Founding Partner · Inaugural Hack876</p>
        </div>

        <div className="mt-8 print:mt-5">
          <BandStrip dark recommended="platinum" />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16 print:mt-6 print:grid-cols-2 print:gap-8">
          <div>
            <Lines
              items={[
                "This is a flexible sponsorship contribution supporting the overall production and student experience of the inaugural Hack876.",
                "It is intentionally not restricted to one line item.",
                "The funding gives the Hack876 team the ability to deploy resources where they have the greatest impact across areas such as:",
              ]}
            />
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
              {GOLD_AREAS.map((a) => (
                <li key={a} className="flex items-center gap-2.5 font-semibold">
                  <Check className="lp-accent text-sun" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <figure className="lp-keep rounded-2xl border-2 border-dashed border-cream/40 p-7 sm:p-9">
              <figcaption className="text-xs font-extrabold tracking-[0.16em] text-cream/60 uppercase">Proposed recognition</figcaption>
              <p className="mt-6 text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-extrabold tracking-tight">Loring Consulting Engineers</p>
              <p className="lp-accent mt-2 text-lg font-bold text-sun">Platinum Partner · Inaugural Hack876</p>
            </figure>
            <Lines
              className="mt-8"
              items={[
                "The goal is not simply to place Loring’s logo around the event.",
                "It is to recognize Loring as one of the organizations that helped make the first Hack876 possible.",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  13 — Platinum Partner benefits                                                */
/* -------------------------------------------------------------------------- */

const BENEFITS = [
  "Prominent Platinum Partner recognition across Hack876 event materials and digital experiences",
  "Recognition during opening and closing programming",
  "Opportunity for Loring leadership to address students",
  "Participation of Loring engineers as judges, mentors and speakers",
  "Dedicated Loring presence within the event",
  "Recognition in relevant school and participant communications",
  "Inclusion in Hack876 photography, recap content and post-event storytelling",
  "Opportunity to collaborate on an engineering-focused challenge",
  "Early conversation around future Hack876 events and expansion",
];

function GoldBenefits() {
  return (
    <section aria-labelledby="lp-benefits" className="lp-section">
      <div className="lp-wrap">
        <Kicker n="04">Platinum Partnership</Kicker>
        <h2 id="lp-benefits" className="lp-h2 mt-6">
          What Platinum Partnership looks like.
        </h2>
        <p className="lp-prose mt-4">Potential integration includes:</p>

        <ol className="mt-10 grid border-t lp-rule sm:grid-cols-2 lg:grid-cols-3 print:mt-6 print:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <li key={b} className="flex gap-4 border-b lp-rule py-6 pr-6">
              <span className="lp-num text-2xl text-emerald-deep">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[1.05rem] leading-snug font-semibold">{b}</span>
            </li>
          ))}
        </ol>

        <div className="lp-keep mt-14 rounded-3xl bg-night p-8 text-cream sm:p-12 print:mt-8">
          <p className="lp-sub max-w-[36ch]">
            <span className="text-sun">Most importantly:</span> direct participation in the
            experience of approximately {STUDENTS} young Jamaicans at the moment they are deciding what they might become.
          </p>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <>
      <section aria-labelledby="lp-close" className="lp-section lp-close lp-grid-bg border-t lp-rule text-center">
        <div className="lp-wrap flex flex-col items-center">
          <div aria-hidden className="w-28 sm:w-36">
            <DoctorBird flutter={false} className="w-full" />
          </div>
          <h2 id="lp-close" className="lp-marker mt-8 text-[clamp(3.2rem,10vw,7.5rem)]">
            Plant the seed early.
          </h2>
          <div className="lp-prose mx-auto mt-8 text-center">
            <p>Jamaica already produces extraordinary talent.</p>
            <p>The opportunity is to help more of that talent discover what it can become sooner.</p>
          </div>

          <div className="mt-16 w-full max-w-3xl border-t-2 border-ink pt-10 print:mt-10">
            <p className="text-sm font-extrabold tracking-[0.18em] text-ink-soft uppercase">Hack876 × Loring Consulting Engineers</p>
            <p className="lp-statement mt-4">Let&rsquo;s build the first one together.</p>
            <p className="mt-6 text-lg font-bold">Kingston, Jamaica · {eventWhen.short}
          {eventWhen.note}</p>
            {(SITE_URL || event.contactEmail) && (
              <p className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 font-semibold text-emerald-deep">
                {SITE_URL && (
                  <a href={SITE_URL} className="underline decoration-2 underline-offset-4">
                    {SITE_URL.replace(/^https?:\/\//, "")}
                  </a>
                )}
                {event.contactEmail && (
                  <a href={`mailto:${event.contactEmail}`} className="underline decoration-2 underline-offset-4">
                    {event.contactEmail}
                  </a>
                )}
              </p>
            )}
          </div>
        </div>
        <footer className="lp-wrap mt-20 text-left print:mt-auto print:pt-6">
          <h2 className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Sources</h2>
          <ol className="mt-3 space-y-1.5">
            {SOURCES.map((s) => (
              <li key={s.id} id={`source-${s.id}`} className="lp-note scroll-mt-6">
                <span className="font-bold">{s.id}.</span> Loring Consulting Engineers, &ldquo;{s.label}.&rdquo;{" "}
                <a href={s.href} className="break-all underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
                  {s.href.replace("https://", "")}
                </a>
              </li>
            ))}
          </ol>
          <p className="lp-note mt-6">
            A private partnership proposal prepared for Loring Consulting Engineers.
          </p>
        </footer>
      </section>
    </>
  );
}
