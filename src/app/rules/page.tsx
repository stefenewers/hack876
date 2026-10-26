import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { PolicyPage, Points } from "@/components/site/PolicyPage";
import { cloudflareChallenge, eligibility, eventWhen, judging, mlh, registration, schedule } from "@/data/event";

export const metadata: Metadata = {
  title: "Event Rules",
  description: "Teams, building, submitting, the Best Use of Cloudflare challenge and judging at Hack 876, an official MLH Hack Day.",
  alternates: { canonical: "/rules" },
};

/** A schedule time by the start of its title, so a longer title ("Hacking ends. Submissions close.") still matches. */
const at = (title: string) => schedule.find((s) => s.title.startsWith(title))?.time ?? "";
const START = at("Hacking begins");
const END = at("Hacking ends");
const SUBMIT_OPEN = at("Submissions open");
const DEMOS = at("Judging");
const TEAM = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;

const linkClass = "font-bold text-ink underline decoration-emerald decoration-2 underline-offset-4";
const Ext = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);
const Challenges = () => <Ext href={registration.challengesUrl}>MLH Challenges page</Ext>;

export default function RulesPage() {
  return (
    <PolicyPage
      eyebrow="Event Rules"
      title="How the day"
      underline="works."
      intro={
        <>
          <p>
            The short version: build something new on the day, be honest about what you used, and submit on time. Hacking runs from {START} to{" "}
            {END} on {eventWhen.long}.
          </p>
          <p className="text-base text-ink-soft">
            Hack 876 is {mlh.hackDayBadge.replace(/^An /, "an ")}. The <Ext href={mlh.standardRulesUrl}>MLH Standard Hackathon Rules</Ext> and the{" "}
            <Ext href={mlh.codeOfConductUrl}>MLH Code of Conduct</Ext> apply. If these rules and the MLH rules differ, the MLH rules apply.
          </p>
        </>
      }
      related={{ href: "/code-of-conduct", label: "Code of Conduct" }}
      sections={[
        {
          id: "teams",
          title: "Teams",
          body: (
            <Points
              items={[
                `Teams have ${TEAM} students, all in ${eligibility.forms}.`,
                "Every student registers on MLH themselves, with a free MyMLH account. There is no school nomination.",
                "Teams are made up of students from the same school, unless the organizers approve otherwise. For example, we may form mixed teams for students who register without a team and say they are open to it.",
                "Organizers, judges, mentors, sponsors and anyone working with them on this event do not compete or join teams.",
              ]}
            />
          ),
        },
        {
          id: "building",
          title: "Building",
          body: (
            <Points
              items={[
                `All project work happens during the event: building starts when hacking begins at ${START} and stops at ${END}.`,
                "You can plan and brainstorm beforehand, but you must not start building before hacking begins.",
                "Existing libraries, APIs, frameworks, templates and open-source tools are allowed. Credit them in your submission.",
                "AI tools are allowed. Say in your submission which AI tools you used and how. A student on the team must be able to explain and demo what you built.",
                "Every team must be able to demo its project at the event.",
              ]}
            />
          ),
        },
        {
          id: "submitting",
          title: "Submitting",
          body: (
            <>
              <p>
                Submissions go only through the <Challenges />. No other channel counts.
              </p>
              <Points
                items={[
                  `Submissions open at ${SUBMIT_OPEN} and close at ${END}, before demos start at ${DEMOS}.`,
                  "Every presenting team must submit, and must select every challenge it is eligible for, including Best Use of Cloudflare if it applies. Teams that do not submit do not demo and are not judged.",
                  "One team member signs in with their MyMLH account to submit, after checking in at the venue.",
                  "Your code must be public, for example in a public GitHub repository, and must stay public after the event for the project to be eligible for prizes.",
                  "The submission includes a short description, the link to your code, a demo video or link if the Challenges page asks for one, and which AI tools you used and how.",
                ]}
              />
            </>
          ),
        },
        {
          id: "cloudflare",
          title: cloudflareChallenge.name,
          body: (
            <>
              <p>
                An optional partner challenge. Any team can enter, in addition to its track. To be eligible, a project must show all of the
                following:
              </p>
              <Points
                items={[
                  <>
                    <strong className="text-ink">Deployed on Cloudflare Workers.</strong> A live Worker URL linked in the submission.
                  </>,
                  <>
                    <strong className="text-ink">Meaningful use of Workers AI.</strong> The project’s core feature uses a Workers AI model, not a
                    token call.
                  </>,
                  <>
                    <strong className="text-ink">A README</strong> that names the Worker and the model or models used.
                  </>,
                  <>
                    <strong className="text-ink">Shown in the demo.</strong> The demo shows the Worker and Workers AI doing real work.
                  </>,
                ]}
              />
              <p>
                Cloudflare docs:{" "}
                {cloudflareChallenge.docs.map((d, i) => (
                  <span key={d.href}>
                    {i > 0 && " · "}
                    <Ext href={d.href}>{d.label}</Ext>
                  </span>
                ))}
                .
              </p>
              <p>
                Challenge details and anything on offer are on the <Challenges />.
              </p>
            </>
          ),
        },
        {
          id: "judging",
          title: "Judging",
          body: (
            <>
              <p>Each team gives a short demo to the judges. Judges score every project on these criteria, each weighted equally:</p>
              <Points items={judging.map((j) => <><strong className="text-ink">{j.name}.</strong> {j.body}</>)} />
              {/* TODO(owner): confirm the tie rule before publishing. */}
              <p>
                If two or more teams have the same total score, the judges break the tie by comparing their Execution scores. If they are still
                tied, the judges discuss and decide by majority vote.
              </p>
              <p>
                A judge must tell the head judge if they have a personal, family, employment or financial connection to a team, and must not
                score that team. The head judge reassigns scoring where needed.
              </p>
              <p>
                The judges’ decisions are final. The Best Use of Cloudflare winner is chosen by the judges from entries that meet the
                requirements above.
              </p>
            </>
          ),
        },
        {
          id: "prizes",
          title: "Prizes",
          body: (
            <p>
              Prizes listed on the <Link href="/#prizes" className={linkClass}>home page</Link> are provided by Hack 876 organizers and local
              sponsors and are tentative. Challenge details are on the <Challenges />.
            </p>
          ),
        },
        {
          id: "ownership",
          title: "Your work is yours",
          body: (
            <p>
              Teams keep ownership of everything they build at Hack 876. Hack 876, MLH and partners may show project names and descriptions
              when promoting the event, but never a participant’s name with their photo without permission.
            </p>
          ),
        },
        {
          id: "conduct",
          title: "Conduct",
          body: (
            <p>
              Everyone at Hack 876 follows the <Ext href={mlh.codeOfConductUrl}>MLH Code of Conduct</Ext> and our{" "}
              <Link href="/code-of-conduct" className={linkClass}>
                Code of Conduct
              </Link>
              . Breaking it can mean removal from the event and disqualification.
            </p>
          ),
        },
      ]}
    />
  );
}
