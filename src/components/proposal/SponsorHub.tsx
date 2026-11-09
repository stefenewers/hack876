import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { FaqSearch } from "@/components/schools/FaqSearch";
import "@/components/schools/hub.css";
import { copilotChallenge, event, eventPartners, judging, localSponsors, photoConsent, prizes, prizesNote, schedule, tracks } from "@/data/event";
import { budgetEstimate, budgetTotal, confirmedJudges, contact, jmd, organisers, reporting, reportingNote, safeguards } from "@/data/partnership";
import { sponsorFaqs, sponsorGlance, sponsorHubCategories } from "@/data/sponsorHub";
import { inKind, purposes, type BandKey } from "@/data/sponsorship";
import { SchoolStatusList } from "./PartnershipSections";
import { BenefitsMatrix } from "./Sponsorship";

/*
 * The sponsor hub: the web-only part of a partnership proposal, below the
 * printed pages. Collapsible panels with everything a sponsor might ask, then
 * a searchable FAQ. Hidden in print, so the PDF stays short. Content comes
 * from sponsorHub.ts and the shared event data.
 */

/** The estimated event budget, as a table. Shared by the deck page and the hub. */
export function BudgetTable({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <table className="w-full border-collapse text-left">
        <tbody>
          {budgetEstimate.map((l) => (
            <tr key={l.k} className="border-b border-ink/10 align-top">
              <th scope="row" className="py-2 pr-4 font-normal">
                <span className="block font-extrabold print:text-[1.32rem]">{l.k}</span>
                <span className="block text-[0.88rem] leading-snug text-ink-soft print:text-[1.12rem]">{l.note}</span>
              </th>
              <td className="py-2 text-right font-extrabold whitespace-nowrap tabular-nums print:text-[1.32rem]">{l.amount ? jmd(l.amount) : "In kind"}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" className="pt-3 text-lg font-extrabold print:text-[1.6rem]">
              Estimated total
            </th>
            <td className="pt-3 text-right text-lg font-extrabold whitespace-nowrap text-emerald-deep tabular-nums print:text-[1.6rem]">{jmd(budgetTotal)}</td>
          </tr>
        </tfoot>
      </table>
      <p className="lp-note mt-3">
        Estimates in Jamaican dollars. Final costs depend on prices and on support given in kind. Every contributor receives a written account
        of how their contribution was used.
      </p>
    </div>
  );
}

function Panel({ id, title, summary, open = false, children }: { id: string; title: string; summary: string; open?: boolean; children: ReactNode }) {
  return (
    <details id={id} open={open} className="hub-faq group scroll-mt-6">
      <summary>
        <span className="min-w-0 flex-1">
          <span className="block text-[1.15rem] leading-snug font-extrabold">{title}</span>
          <span className="mt-0.5 block text-[0.95rem] leading-snug text-ink-soft">{summary}</span>
        </span>
        <svg viewBox="0 0 20 20" aria-hidden className="mt-1 h-5 w-5 shrink-0 transition-transform group-open:rotate-180">
          <path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="border-t border-ink/10 px-4 pt-4 pb-5 sm:px-5">{children}</div>
    </details>
  );
}

const H = ({ children }: { children: ReactNode }) => <h4 className="text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">{children}</h4>;

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-2 space-y-1.5 text-[0.98rem] leading-snug text-ink-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2.5">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
          <span className="min-w-0">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Pending({ children }: { children: ReactNode }) {
  return (
    <p className="hub-todo mt-3">
      <span className="font-extrabold">To be confirmed with you:</span> {children}
    </p>
  );
}

export function SponsorHub({ org, recommended }: { org: string; recommended: BandKey }) {
  const faqs = sponsorFaqs(org);
  const sponsors = localSponsors.filter((s) => s.confirmed);
  const partners = eventPartners.filter((s) => s.confirmed);
  const vars = { "--sb-primary": "var(--color-emerald-deep)", "--sb-secondary": "var(--color-sun)" } as CSSProperties;
  return (
    <section aria-labelledby="sponsor-hub-title" className="hub lp-no-print border-t-2 border-ink py-12 sm:py-16" style={vars}>
      <div className="hub-wrap">
        {/* The whole hub starts closed, so the page reads as the short proposal until a sponsor wants more. */}
        <details id="sponsor-hub" className="group/hub scroll-mt-6">
          <summary className="hub-card flex cursor-pointer list-none flex-wrap items-center justify-between gap-4 p-5 transition-shadow hover:shadow-[3px_4px_0_0_var(--color-ink)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-aqua sm:p-6 [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 flex-1 basis-72">
              <span className="hub-kicker block">Sponsor hub</span>
              <span id="sponsor-hub-title" className="hub-h2 mt-2 block">
                Everything about Hack876, for {org}.
              </span>
              <span className="mt-2 block text-[1.02rem] leading-snug text-ink-2">
                The schedule, schools, budget, recognition, payment and paperwork, safeguarding, and answers to {faqs.length} questions.
              </span>
            </span>
            <span className="btn btn-primary shrink-0">
              <span className="group-open/hub:hidden">Open the hub</span>
              <span className="hidden group-open/hub:inline">Close the hub</span>
              <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4 transition-transform group-open/hub:rotate-180">
                <path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </summary>

        <p className="hub-lead mt-6">
          The proposal above is the short version. Open any section below, or search for a question. Anything not yet decided is marked, and
          arrangements such as payment are agreed with each sponsor.
        </p>

        <div className="mt-6 grid gap-2.5">
          <Panel id="hub-glance" title="At a glance" summary="Date, venue, students, schools and status." open>
            <dl className="grid gap-2 sm:grid-cols-2">
              {sponsorGlance().map((f) => (
                <div key={f.k} className="rounded-xl border border-ink/15 bg-cream px-3.5 py-2.5">
                  <dt className="text-[0.7rem] font-extrabold tracking-[0.14em] text-ink-soft uppercase">{f.k}</dt>
                  <dd className="mt-0.5 font-extrabold">{f.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5">
              <H>Schools</H>
              <div className="mt-2">
                <SchoolStatusList compact />
              </div>
            </div>
          </Panel>

          <Panel id="hub-day" title="The day" summary="Schedule, tracks, the partner challenge, judging and prizes.">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <H>Schedule ({event.timeZone})</H>
                <ol className="mt-2 space-y-1">
                  {schedule.map((s) => (
                    <li key={s.time + s.title} className="grid grid-cols-[5.5rem_1fr] gap-2 text-[0.95rem] leading-snug">
                      <span className="font-extrabold tabular-nums">{s.time}</span>
                      <span className="text-ink-2">{s.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="space-y-5">
                <div>
                  <H>Tracks</H>
                  <List items={tracks.map((t) => (
                    <>
                      <strong className="text-ink">{t.name}.</strong> {t.line}
                    </>
                  ))} />
                </div>
                <div>
                  <H>Partner challenge</H>
                  <p className="mt-2 text-[0.98rem] leading-snug text-ink-2">
                    <strong className="text-ink">{copilotChallenge.name}.</strong> {copilotChallenge.summary}
                  </p>
                </div>
                <div>
                  <H>Judging</H>
                  <p className="mt-2 text-[0.98rem] leading-snug text-ink-2">
                    {confirmedJudges.length} confirmed judges score every team on {judging.map((j) => j.name).join(", ")}. Sponsors have no say
                    over judging.
                  </p>
                </div>
                <div>
                  <H>Prizes</H>
                  <List items={prizes.map((p) => (
                    <>
                      <strong className="text-ink">{p.name}:</strong> {p.reward ?? "to be announced"}
                    </>
                  ))} />
                  {prizesNote && <p className="lp-note mt-2">{prizesNote}</p>}
                </div>
              </div>
            </div>
          </Panel>

          <Panel id="hub-people" title="Who is involved" summary="Organisers, judges, sponsors and event partners.">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-5">
                <div>
                  <H>Organisers</H>
                  <List items={organisers.map((p) => (p.organization ? `${p.name}, ${p.organization}` : p.name))} />
                </div>
                <div>
                  <H>Confirmed judges</H>
                  <p className="mt-2 text-[0.98rem] leading-snug text-ink-2">{confirmedJudges.map((p) => p.name).join(", ")}.</p>
                </div>
                <div>
                  <H>Event partners</H>
                  <p className="mt-2 text-[0.98rem] leading-snug text-ink-2">
                    {partners.map((p) => p.name).join(" and ")}. They support the programme and are not funders.
                  </p>
                </div>
              </div>
              <div>
                <H>Sponsors already on board</H>
                <ul className="mt-2 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                  {sponsors.map((s) => (
                    <li key={s.name} className="flex flex-col items-center gap-1 text-center">
                      <span className="relative block h-14 w-full rounded-xl border border-ink/15 bg-white">
                        <Image src={s.logo} alt="" fill sizes="120px" className="object-contain p-1.5" />
                      </span>
                      <span className="text-[0.78rem] leading-tight font-bold">{s.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Panel>

          <Panel id="hub-budget" title="Budget and where support goes" summary={`An estimated ${jmd(budgetTotal)}, line by line.`}>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <BudgetTable />
              <div>
                <H>What a contribution can support</H>
                <List items={Object.values(purposes).map((p) => (
                  <>
                    <strong className="text-ink">{p.label}.</strong> {p.text}
                  </>
                ))} />
                <p className="lp-note mt-2">A sponsor never has to cover a whole cost. Support can go to the event overall or to a use agreed with you.</p>
              </div>
            </div>
          </Panel>

          <Panel id="hub-recognition" title="Contribution levels and recognition" summary="What each level receives, and support in kind.">
            <BenefitsMatrix recommended={recommended} />
            <div className="mt-5">
              <H>{inKind.name}</H>
              <p className="mt-2 text-[0.98rem] leading-snug text-ink-2">
                {inKind.text} Examples: {inKind.examples.join(", ").toLowerCase()}. {inKind.recognition}
              </p>
            </div>
            <div className="mt-5">
              <H>Logo and artwork</H>
              <p className="mt-2 text-[0.98rem] leading-snug text-ink-2">
                A vector logo (SVG, EPS or PDF) or a high-resolution PNG with a transparent background, with any brand guidelines. We use your logo
                unaltered.
              </p>
              <Pending>artwork deadlines for signage and shirts, and how you would like to be credited.</Pending>
            </div>
          </Panel>

          <Panel id="hub-payment" title="Payment and paperwork" summary="Arranged with each sponsor, to suit your preference.">
            <List items={["How and when to pay", "Invoices, receipts and any documents your finance team needs", "Which entity receives the funds", "A written sponsorship agreement, if you would like one"]} />
            <Pending>all of the above. Each is agreed with you once a contribution is decided, to suit your process.</Pending>
          </Panel>

          <Panel id="hub-safeguarding" title="Safeguarding and rules" summary="Most participants are minors. How we protect them.">
            <List items={safeguards} />
            <p className="mt-3 text-[0.98rem] leading-snug text-ink-2">{photoConsent}</p>
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              <a href="/code-of-conduct" className="font-bold text-emerald-deep underline decoration-2 underline-offset-4">
                Code of Conduct
              </a>
              <a href="/rules" className="font-bold text-emerald-deep underline decoration-2 underline-offset-4">
                Event Rules
              </a>
            </p>
          </Panel>

          <Panel id="hub-after" title="After the event" summary="The written recap every sponsor receives.">
            <List items={reporting} />
            <p className="lp-note mt-2">{reportingNote}</p>
            <Pending>when the recap is sent.</Pending>
          </Panel>
        </div>

        <div className="mt-12">
          <p className="hub-kicker">Questions</p>
          <h3 className="hub-h2 mt-2 !text-[clamp(1.5rem,3vw,2rem)]">Search for an answer.</h3>
          <div className="mt-5">
            <FaqSearch
              faqs={faqs}
              categories={sponsorHubCategories}
              contactEmail={event.contactEmail}
              audiences={[]}
              placeholder="e.g. Can we choose what our contribution supports?"
              hint={["budget", "logo", "invoice"]}
            />
          </div>
        </div>

        <div className="hub-card mt-10 flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="min-w-0">
            <p className="hub-h3">Talk to the organisers</p>
            <p className="mt-1 text-ink-2">{contact.names.join(" and ")}, Hack876 organisers.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="btn btn-secondary btn-sm">
                {contact.email}
              </a>
            )}
            {contact.booking && (
              <a href={contact.booking} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                Book a call<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
        </details>
      </div>
    </section>
  );
}
