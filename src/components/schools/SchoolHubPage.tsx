import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BirdMark } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { Logo } from "@/components/art/Wordmark";
import { Footer } from "@/components/site/Footer";
import { buildTypes, eligibility, event, people, schools } from "@/data/event";
import { schoolAlumni, type SchoolBrief } from "@/data/schoolBriefs";
import {
  applicationAsks,
  applicationState,
  bringList,
  hubCategories,
  hubFacts,
  hubFaqs,
  openItems,
  schoolSheets,
  statusLabel,
  type HubFaq,
  type HubStatus,
} from "@/data/schoolHub";
import { FaqSearch } from "./FaqSearch";
import "./hub.css";

/*
 * A school's participation hub: everything a student, parent or teacher needs
 * to take part, in one place. Rendered at /schools/<slug> for any school whose
 * brief has `hub` set. Event facts come from event.ts via schoolHub.ts; only
 * the relationship and community details come from the school's entry.
 */

const TEAM = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;

const statusClass: Record<HubStatus, string> = {
  confirmed: "border-ink bg-mint text-emerald-dark",
  tentative: "border-ink bg-sun-light text-ink",
  pending: "border-dashed border-ink/40 bg-cream text-ink-soft",
};

function Status({ s }: { s?: HubStatus }) {
  return s ? <span className={`hub-status ${statusClass[s]}`}>{statusLabel[s]}</span> : null;
}

function Paras({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {text.split("\n\n").map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function SectionHead({ id, kicker, title, children }: { id: string; kicker: string; title: string; children?: ReactNode }) {
  return (
    <header>
      <p className="hub-kicker">{kicker}</p>
      <h2 id={id} className="hub-h2 mt-2">
        {title}
      </h2>
      {children && <div className="hub-lead mt-3">{children}</div>}
    </header>
  );
}

const NAV = [
  { href: "#students", label: "Students" },
  { href: "#parents", label: "Parents" },
  { href: "#teachers", label: "Teachers" },
  { href: "#ai-tools", label: "AI tools" },
  { href: "#apply", label: "Applying" },
  { href: "#community", label: "Community" },
  { href: "#resources", label: "Downloads" },
  { href: "#contact", label: "Contact" },
];

export function SchoolHubPage({ brief }: { brief: SchoolBrief }) {
  const faqs = hubFaqs(brief);
  const byId = (id: string) => faqs.find((f) => f.id === id) as HubFaq;
  const vars = { "--sb-primary": brief.colors.primary, "--sb-secondary": brief.colors.secondary, "--sb-ink": brief.colors.ink } as CSSProperties;

  return (
    <div className="hub" style={vars}>
      <header className="hub-wrap flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack 876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.4rem]" />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/schools" className="hidden text-sm font-bold text-ink-soft underline-offset-4 hover:underline sm:inline">
            School Resources
          </Link>
          {applicationState.open && (
            <Link href="/apply" className="btn btn-primary btn-sm">
              Apply <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </header>

      <main id="main">
        <Hero brief={brief} />

        <nav aria-label="On this page" className="hub-nav">
          <div className="hub-wrap hub-scroll flex items-center gap-1 overflow-x-auto py-2">
            <a href="#questions" className="hub-nav-search mr-1">
              <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
                <path d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm7.5 13-3.6-3.6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              Search questions
            </a>
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </div>
        </nav>

        <Paths short={brief.short} />
        <Students brief={brief} byId={byId} />
        <Parents byId={byId} />
        <AiTools />
        <Applying brief={brief} />
        <Beyond />
        <Community brief={brief} />
        <Teachers brief={brief} />
        <Resources brief={brief} />

        <section id="questions" aria-labelledby="hub-questions" className="border-t border-ink/10 bg-cream-2 py-14 sm:py-20">
          <div className="hub-wrap">
            <SectionHead id="hub-questions" kicker="Questions & answers" title="Find your answer.">
              <p>
                Every question we have been asked so far, including the ones we cannot fully answer yet. Press <kbd className="rounded border border-ink/30 bg-paper px-1.5 text-sm font-bold">/</kbd>{" "}
                anywhere on this page to search.
              </p>
            </SectionHead>
            <div className="mt-8">
              <FaqSearch faqs={faqs} categories={hubCategories} contactEmail={event.contactEmail} />
            </div>
          </div>
        </section>

        <Contact brief={brief} />
      </main>
      <Footer />

      {/* Always-reachable search on phones. */}
      <a
        href="#questions"
        className="hub-no-print fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-sun px-4 py-2.5 text-sm font-extrabold shadow-[3px_4px_0_0_var(--color-ink)] sm:hidden"
      >
        <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
          <path d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm7.5 13-3.6-3.6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        Ask a question
      </a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero: the essentials                                                      */
/* -------------------------------------------------------------------------- */

function Hero({ brief }: { brief: SchoolBrief }) {
  const facts = hubFacts();
  return (
    <section aria-labelledby="hub-title" className="border-t border-ink/10 pt-8 pb-10 sm:pt-12 sm:pb-14">
      <div className="hub-wrap">
        <div className="flex items-center gap-3">
          <Image src={brief.crest} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
          <p className="hub-kicker">{brief.school} · Participation hub</p>
        </div>
        <h1 id="hub-title" className="mt-5 max-w-[20ch] text-[clamp(2.3rem,6.2vw,4.4rem)] leading-[1] font-extrabold tracking-[-0.04em] text-balance">
          {brief.short} × Hack 876. <span className="hub-under text-[var(--sb-primary)]">Everything you need to know.</span>
        </h1>
        <p className="hub-lead mt-5">
          Hack 876 is a one-day build competition for Jamaican secondary-school students. Teams pick a real problem, build a working
          prototype and present it to industry judges. This page is for {brief.short} students, parents, guardians and teachers.
        </p>

        <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div key={f.k} className="hub-card px-4 py-3.5">
              <dt className="flex items-center justify-between gap-2 text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">
                {f.k}
                <Status s={f.status} />
              </dt>
              <dd className="mt-1 text-[1.08rem] leading-snug font-extrabold">{f.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          {applicationState.open ? (
            <Link href="/apply" className="btn btn-primary">
              Apply now <span aria-hidden>→</span>
            </Link>
          ) : (
            <span className="rounded-full border-2 border-dashed border-ink/40 px-4 py-2 font-bold text-ink-soft">{applicationState.label}</span>
          )}
          <a href="#apply" className="font-bold underline decoration-2 underline-offset-4">
            How applying works
          </a>
          <span className="flex items-center gap-2 text-sm font-bold text-ink-soft">
            <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${applicationState.open ? "bg-emerald" : "bg-ink/30"}`} />
            {applicationState.label}
          </span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Choose your path                                                          */
/* -------------------------------------------------------------------------- */

function Paths({ short }: { short: string }) {
  const paths = [
    { href: "#students", icon: "rocket", title: "For students", text: "What to expect, who can take part, what you need to know, teams and how to apply." },
    { href: "#parents", icon: "heart", title: "For parents", text: "Venue, hours, food, supervision, consent, transport, safety and costs." },
    { href: "#teachers", icon: "learn", title: "For teachers", text: "Recommending students, who does well, ambassadors and materials to share." },
    { href: "#questions", icon: "sticky", title: "Questions & answers", text: "Search every question we have been asked, by topic or by who is asking." },
  ];
  return (
    <section aria-label={`Where to start, for the ${short} community`} className="py-10 sm:py-14">
      <div className="hub-wrap">
        <p className="hub-kicker">Start here</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((p) => (
            <li key={p.href}>
              <a href={p.href} className="hub-card group flex h-full flex-col p-5 transition-transform hover:-translate-y-0.5 hover:shadow-[3px_4px_0_0_var(--color-ink)]">
                <Icon name={p.icon} className="h-11 w-11" />
                <span className="hub-h3 mt-3">{p.title}</span>
                <span className="mt-1.5 flex-1 text-[0.97rem] leading-snug text-ink-2">{p.text}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 font-extrabold text-[var(--sb-primary)]">
                  Go <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Students                                                                  */
/* -------------------------------------------------------------------------- */

function Students({ brief, byId }: { brief: SchoolBrief; byId: (id: string) => HubFaq }) {
  const blocks = ["coding", "what-build", "training", "team"].map(byId);
  const kinds = [
    { kind: "need" as const, title: "Bring", cls: "bg-mint" },
    { kind: "nice" as const, title: "Good to have", cls: "bg-sun-light" },
    { kind: "pending" as const, title: "Still to be confirmed", cls: "bg-cream" },
  ];
  return (
    <section id="students" aria-labelledby="hub-students" className="border-t border-ink/10 bg-paper py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-students" kicker="For students" title="You build something. Then you show it.">
          <p>
            You arrive with an idea or none at all, join a team of {TEAM}, and leave with something that works. Teams can mix
            schools, so you may build with students you have never met.
          </p>
        </SectionHead>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {blocks.map((f) => (
            <article key={f.id} className="hub-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="hub-h3 max-w-[26ch]">{f.q}</h3>
                <Status s={f.status} />
              </div>
              <Paras text={f.a} className="mt-2.5 text-[1rem] leading-relaxed text-ink-2" />
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_1.4fr]">
          <div className="hub-card-soft p-5">
            <h3 className="hub-h3">Things students have built at hackathons</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {buildTypes.map((b) => (
                <li key={b.label} className="flex items-center gap-1.5 rounded-full border border-ink/20 bg-cream px-3 py-1 text-sm font-bold">
                  <Icon name={b.icon} className="h-5 w-5" />
                  {b.label}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-soft">You choose the problem and the medium. AI is allowed, not required.</p>
          </div>

          <div className="hub-card-soft p-5" data-anchor id="bring">
            <h3 className="hub-h3">What to bring</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {kinds.map((k) => (
                <div key={k.kind}>
                  <p className={`inline-block rounded-full border-2 border-ink px-2.5 py-0.5 text-[0.68rem] font-extrabold tracking-wide uppercase ${k.cls}`}>{k.title}</p>
                  <ul className="mt-2 space-y-1.5 text-[0.95rem] leading-snug text-ink-2">
                    {bringList
                      .filter((b) => b.kind === k.kind)
                      .map((b) => (
                        <li key={b.item}>{b.item}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-ink-2">
          Ready?{" "}
          <a href="#apply" className="font-bold text-ink underline decoration-2 underline-offset-4">
            See how {brief.short} students apply
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Parents and guardians                                                     */
/* -------------------------------------------------------------------------- */

function Parents({ byId }: { byId: (id: string) => HubFaq }) {
  const topics: { title: string; id: string; icon: string }[] = [
    { title: "Date", id: "when", icon: "clock" },
    { title: "Venue", id: "where", icon: "pin" },
    { title: "Hours", id: "overnight", icon: "clock" },
    { title: "Food", id: "food", icon: "patty" },
    { title: "Supervision and safeguarding", id: "supervision", icon: "people" },
    { title: "Consent", id: "consent", icon: "notebook" },
    { title: "Drop-off, pick-up and transport", id: "transport", icon: "move" },
    { title: "Emergency contacts", id: "emergency", icon: "badge" },
    { title: "Access, medical and dietary needs", id: "access", icon: "wellbeing" },
    { title: "Costs", id: "cost", icon: "business" },
  ];
  return (
    <section id="parents" aria-labelledby="hub-parents" className="border-t border-ink/10 py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-parents" kicker="For parents and guardians" title="The practical details.">
          <p>
            What is settled, and what is not yet. Where something is marked &ldquo;Details forthcoming&rdquo;, it has not been decided
            and you will hear from us before your child is asked to commit to anything.
          </p>
        </SectionHead>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {topics.map((t) => {
            const f = byId(t.id);
            return (
              <li key={t.id} className="hub-card flex gap-4 p-5">
                <Icon name={t.icon} className="h-10 w-10 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="hub-h3">{t.title}</h3>
                    <Status s={f.status} />
                  </div>
                  <Paras text={f.a} className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2" />
                  {f.link && (
                    <a
                      href={f.link.href}
                      {...(f.link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="mt-2 inline-block font-bold text-[var(--sb-primary)] underline decoration-2 underline-offset-4"
                    >
                      {f.link.label}
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  AI tools, age restrictions and consent                                    */
/* -------------------------------------------------------------------------- */

function AiTools() {
  const points = [
    { t: "Being under 18 does not stop you applying.", d: "Students in the eligible forms can apply whatever their age." },
    { t: "Not every AI tool is open to minors.", d: "Some third-party AI tools set a minimum age, and some are for adults only." },
    { t: "A parent cannot waive a provider's age limit.", d: "Consent does not override a hard minimum age. Under-18s will not be asked or allowed to use an adults-only tool." },
    { t: "Organizers will say which tools are allowed.", d: "We are still choosing age-appropriate tools and any sponsored access." },
    { t: "No team should be stuck.", d: "Teams should have suitable options without every student needing an age-restricted product." },
    { t: "Procedures come before the event.", d: "Final consent, permitted-tool and account-access steps will be shared in advance." },
  ];
  return (
    <section id="ai-tools" aria-labelledby="hub-ai" className="border-t border-ink/10 bg-night py-14 text-cream sm:py-20">
      <div className="hub-wrap">
        <p className="text-[0.74rem] font-extrabold tracking-[0.16em] text-sun uppercase">AI tools, age limits and consent</p>
        <h2 id="hub-ai" className="hub-h2 mt-2">
          Clear rules, shared before the day.
        </h2>
        <p className="mt-3 max-w-2xl text-[1.08rem] leading-relaxed text-cream/80">
          AI is allowed at Hack 876, not required. The list of permitted tools is not final, so here is exactly where things stand.
        </p>
        <ol className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <li key={p.t} className="rounded-2xl border border-cream/20 bg-cream/[0.05] p-5">
              <p className="text-sm font-extrabold text-sun">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1.5 text-[1.08rem] leading-snug font-extrabold">{p.t}</p>
              <p className="mt-1.5 text-[0.97rem] leading-relaxed text-cream/75">{p.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 inline-flex flex-wrap items-center gap-2 text-sm text-cream/70">
          <span className="hub-status border-dashed border-cream/50 text-cream">Details forthcoming</span>
          The permitted-tool list and the consent form.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Applications and selection                                                */
/* -------------------------------------------------------------------------- */

function Applying({ brief }: { brief: SchoolBrief }) {
  const steps: { t: string; d: string; s?: HubStatus }[] = [
    { t: "Your school introduces you", d: `${brief.short} shares this page and recommends students in ${eligibility.forms}.` },
    { t: "You apply yourself", d: "Every student fills in the Hack 876 application. Nobody is entered on your behalf." },
    { t: "We read every application", d: "The organizing team reviews them. Detailed criteria have not been published.", s: "pending" },
    { t: "You hear back", d: "The closing date and decision date have not been set.", s: "pending" },
    { t: "Teams come together", d: `Teams of ${TEAM}. Bring friends or be matched, including with other schools. Final rules are still being settled.`, s: "tentative" },
  ];
  return (
    <section id="apply" aria-labelledby="hub-apply" className="border-t border-ink/10 bg-paper py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-apply" kicker="Applications and selection" title="How a student gets in.">
          <p>
            A school recommendation does not guarantee admission. For planning we have roughly {brief.planningRange.min} to{" "}
            {brief.planningRange.max} {brief.short} students in mind. That range is provisional, not a quota.
          </p>
        </SectionHead>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <ol className="grid gap-2.5">
            {steps.map((s, i) => (
              <li key={s.t} className="hub-card flex gap-4 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--sb-primary)] font-extrabold text-white">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="hub-h3">{s.t}</h3>
                    <Status s={s.s} />
                  </div>
                  <p className="mt-1 text-[0.98rem] leading-relaxed text-ink-2">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="hub-card h-fit p-5">
            <h3 className="hub-h3">What the application asks</h3>
            <ul className="mt-3 space-y-2 text-[0.98rem] leading-snug text-ink-2">
              {applicationAsks.map((a) => (
                <li key={a} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sb-primary)]" />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-soft">No test and no trick questions. We want to know what you like making.</p>
            {applicationState.open ? (
              <Link href="/apply" className="btn btn-primary mt-5 w-full">
                Start your application <span aria-hidden>→</span>
              </Link>
            ) : (
              <p className="mt-5 rounded-xl border-2 border-dashed border-ink/40 px-4 py-3 text-center font-bold text-ink-soft">{applicationState.label}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Beyond event day                                                          */
/* -------------------------------------------------------------------------- */

function Beyond() {
  return (
    <section id="beyond" aria-labelledby="hub-beyond" className="border-t border-ink/10 py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-beyond" kicker="Beyond event day" title="What it can lead to, honestly." />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <div className="hub-card p-5">
            <p className="hub-status border-ink bg-mint text-emerald-dark">On the day</p>
            <ul className="mt-3 space-y-2 text-[1rem] leading-snug text-ink-2">
              {[
                "Build next to engineers, mentors and technical professionals.",
                "Present to judges who work in the industry.",
                "Meet students from other schools who like making things.",
                "Leave with a project you can show and talk about.",
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="hub-card p-5">
            <p className="hub-status border-dashed border-ink/40 bg-cream text-ink-soft">What we hope to build</p>
            <p className="mt-3 text-[1rem] leading-relaxed text-ink-2">
              Over time we want longer-term pathways involving companies, universities and mentors. None exist yet, and no formal
              career-development programme has been arranged.
            </p>
            <p className="mt-3 rounded-xl bg-[color-mix(in_srgb,var(--sb-secondary)_30%,transparent)] px-4 py-3 text-[0.98rem] font-bold">
              Hack 876 does not promise internships, jobs, scholarships, interviews or placements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  School community: alumni                                                  */
/* -------------------------------------------------------------------------- */

function Community({ brief }: { brief: SchoolBrief }) {
  const alumni = schoolAlumni(brief.school);
  if (alumni.length === 0) return null;
  const tag = { judge: "Judge", organizer: "Organizer" } as const;
  return (
    <section id="community" aria-labelledby="hub-community" className="border-t border-ink/10 bg-paper py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-community" kicker={`The ${brief.short} connection`} title={brief.alumni?.headline ?? `${brief.short} in the room.`}>
          <p>
            {alumni.filter((p) => p.role === "judge").length} Hack 876 judges and {alumni.filter((p) => p.role === "organizer").length}{" "}
            organizers went to {brief.short}. Students will present to people who started where they are.
          </p>
        </SectionHead>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {alumni.map((p) => {
            const after = (p.schools ?? []).filter((s) => !(schools as readonly string[]).includes(s));
            return (
              <li key={p.name} className="hub-card flex gap-4 p-4">
                {p.photo && <Image src={p.photo} alt={p.name} width={80} height={80} className="h-20 w-20 shrink-0 rounded-xl border-2 border-ink object-cover" />}
                <div className="min-w-0">
                  <p className="text-[0.66rem] font-extrabold tracking-[0.14em] text-[var(--sb-primary)] uppercase">
                    {p.pending ? `${tag[p.role as "judge" | "organizer"]} · pending` : tag[p.role as "judge" | "organizer"]}
                  </p>
                  <p className="mt-0.5 text-[1.08rem] leading-tight font-extrabold">{p.name}</p>
                  <p className="mt-1 text-sm leading-snug text-ink-soft">
                    {brief.short}
                    {after.map((s) => ` → ${s}`).join("")}
                  </p>
                  {p.organization && <p className="mt-0.5 text-sm font-bold">{p.organization}</p>}
                </div>
              </li>
            );
          })}
        </ul>
        {brief.alumni && <p className="mt-4 text-sm text-ink-soft">{brief.alumni.note}</p>}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Teachers: recommendations, liaison, ambassadors                           */
/* -------------------------------------------------------------------------- */

function Teachers({ brief }: { brief: SchoolBrief }) {
  const hub = brief.hub!;
  const { liaison } = brief;
  const organizers = people.filter((p) => p.role === "organizer" && p.confirmed);
  return (
    <section id="teachers" aria-labelledby="hub-teachers" className="border-t border-ink/10 py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-teachers" kicker="For teachers" title="Light for the school. Handled by us.">
          <p>
            {brief.short} is not asked for money or to organize anything. The school&rsquo;s part is sharing the opportunity and
            recommending students. Hack 876 does the rest.
          </p>
        </SectionHead>

        <div className="mt-8 grid gap-3 lg:grid-cols-2">
          <div className="hub-card p-5">
            <h3 className="hub-h3">How recommending works</h3>
            <ol className="mt-3 space-y-2.5 text-[0.98rem] leading-snug text-ink-2">
              {hub.faculty.process.map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--sb-primary)] text-xs font-extrabold text-white">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
          <div className="hub-card p-5">
            <h3 className="hub-h3">Who tends to do well</h3>
            <ul className="mt-3 space-y-2 text-[0.98rem] leading-snug text-ink-2">
              {hub.faculty.profiles.map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sb-primary)]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="hub-card p-5">
            <p className="hub-status border-ink bg-mint text-emerald-dark">Faculty liaison</p>
            <p className="mt-2 text-xl font-extrabold">{liaison.name}</p>
            <p className="font-bold text-[var(--sb-primary)]">{liaison.title}</p>
            <p className="mt-0.5 text-sm text-ink-soft">{liaison.credentials}</p>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-2">{liaison.role}</p>
            <p className="mt-3 border-t border-ink/10 pt-3 text-sm text-ink-soft">{liaison.note}</p>
          </div>
          <div className="hub-card p-5">
            <p className="hub-status border-dashed border-ink/40 bg-cream text-ink-soft">Student ambassadors · to be nominated</p>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-2">{hub.ambassadors.summary}</p>
            <ul className="mt-3 space-y-2 text-[0.98rem] leading-snug text-ink-2">
              {hub.ambassadors.duties.map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sb-primary)]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hub-card-soft mt-3 flex flex-wrap items-center gap-4 p-5">
          <div className="flex shrink-0 -space-x-3">
            {organizers.map((o) => (o.photo ? <Image key={o.name} src={o.photo} alt={o.name} width={44} height={44} className="h-11 w-11 rounded-full border-2 border-ink object-cover" /> : null))}
          </div>
          <p className="min-w-[16rem] flex-1 text-[0.98rem] leading-snug text-ink-2">
            <strong className="text-ink">The Hack 876 organizing team</strong> runs event operations, applications, consent forms and all
            official communication with students and parents.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Downloads                                                                 */
/* -------------------------------------------------------------------------- */

function Resources({ brief }: { brief: SchoolBrief }) {
  const sheets = schoolSheets(brief);
  const link = `${event.siteUrl.replace(/^https?:\/\/(www\.)?/, "")}/schools/${brief.slug}`;
  const items = [
    ...sheets.map((s) => ({ title: s.title, blurb: s.blurb, href: s.href, filename: s.filename, kind: "PDF · 1 page" })),
    { title: `${brief.short} participation brief`, blurb: "The original presentation for school leadership.", href: brief.pdf.href, filename: brief.pdf.filename, kind: "PDF · slides" },
  ];
  return (
    <section id="resources" aria-labelledby="hub-resources" className="border-t border-ink/10 bg-paper py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-resources" kicker="Downloads" title="Ready to share.">
          <p>Printable sheets for noticeboards, class groups and parents. Nobody at {brief.short} needs to rewrite anything.</p>
        </SectionHead>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {items.map((it) => (
            <li key={it.href} className="hub-card flex flex-col p-5">
              <p className="text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">{it.kind}</p>
              <h3 className="hub-h3 mt-1">{it.title}</h3>
              <p className="mt-1.5 flex-1 text-[0.97rem] leading-snug text-ink-2">{it.blurb}</p>
              <a href={it.href} download={it.filename} className="btn btn-secondary btn-sm mt-4 self-start">
                <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
                  <path d="M10 3v9m0 0-3.5-3.5M10 12l3.5-3.5M4 14.5V16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download
              </a>
            </li>
          ))}
        </ul>
        <div className="hub-card-soft mt-3 flex flex-wrap items-center justify-between gap-3 p-5">
          <div>
            <h3 className="hub-h3">Share this page</h3>
            <p className="mt-1 text-[0.97rem] text-ink-2">One link for students, parents and teachers.</p>
          </div>
          <p className="rounded-xl border-2 border-ink bg-cream px-4 py-2 font-mono text-sm font-bold break-all select-all">{link}</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact and what is still open                                            */
/* -------------------------------------------------------------------------- */

function Contact({ brief }: { brief: SchoolBrief }) {
  return (
    <section id="contact" aria-labelledby="hub-contact" className="border-t border-ink/10 py-14 sm:py-20">
      <div className="hub-wrap grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHead id="hub-contact" kicker="Contact" title="Still have a question?" />
          <div className="mt-6 grid gap-3">
            <div className="hub-card p-5">
              <h3 className="hub-h3">About Hack 876</h3>
              <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2">
                The event, applications, consent, tools, safety or anything on this page.
              </p>
              {event.contactEmail && (
                <a href={`mailto:${event.contactEmail}`} className="mt-3 inline-block text-lg font-extrabold text-[var(--sb-primary)] underline decoration-2 underline-offset-4">
                  {event.contactEmail}
                </a>
              )}
            </div>
            <div className="hub-card p-5">
              <h3 className="hub-h3">About {brief.short}&rsquo;s arrangements</h3>
              <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2">{brief.hub!.schoolChannel}</p>
            </div>
          </div>
        </div>

        <div className="hub-card-soft h-fit p-5 sm:p-6">
          <p className="hub-status border-dashed border-ink/40 bg-cream text-ink-soft">Details forthcoming</p>
          <h3 className="hub-h3 mt-2">What we have not decided yet</h3>
          <p className="mt-1.5 text-[0.97rem] leading-relaxed text-ink-2">
            We would rather say so than guess. This page is updated as each one is settled.
          </p>
          <ul className="mt-3 space-y-2 text-[0.97rem] leading-snug text-ink-2">
            {openItems.map((t) => (
              <li key={t} className="flex gap-2.5">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />
                {t}
              </li>
            ))}
            <li className="flex gap-2.5">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />
              Who the {brief.short} student ambassadors will be
            </li>
          </ul>
          <p className="mt-4 border-t border-ink/10 pt-3 text-sm text-ink-soft">{brief.hub!.status}</p>
        </div>
      </div>
    </section>
  );
}
