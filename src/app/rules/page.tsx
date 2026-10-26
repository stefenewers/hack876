import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage, Points } from "@/components/site/PolicyPage";
import { eligibility, eventWhen, judging, schedule } from "@/data/event";

export const metadata: Metadata = {
  title: "Event Rules",
  description: "Teams, building, submission and judging rules for Hack 876.",
  alternates: { canonical: "/rules" },
};

const at = (title: string) => schedule.find((s) => s.title === title)?.time ?? "";
const START = at("Hacking begins");
const END = at("Hacking ends");
const TEAM = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;

export default function RulesPage() {
  return (
    <PolicyPage
      eyebrow="Event Rules"
      title="How the day"
      underline="works."
      intro={
        <p>
          The short version: build something new on the day, be honest about what you used, and submit on time. Hacking runs from {START} to{" "}
          {END} on {eventWhen.long}.
        </p>
      }
      related={{ href: "/code-of-conduct", label: "Code of Conduct" }}
      sections={[
        {
          id: "teams",
          title: "Teams",
          body: (
            <Points
              items={[
                `Teams have ${TEAM} students.`,
                `Everyone on a team must be an accepted participant in ${eligibility.forms}.`,
                "Teams are made up of students from the same school, unless the organizers approve otherwise. For example, we may form mixed teams for students who apply without a team and say they are open to it.",
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
                `All project work starts when hacking begins at ${START} and stops at ${END}.`,
                "Ideas, sketches and planning before the day are fine. Code written before the day is not.",
                "You can use open-source libraries, APIs, templates and AI coding tools, as long as you list them in your submission.",
                "You must be able to explain what you built and how it works. Judges will ask.",
              ]}
            />
          ),
        },
        {
          id: "submitting",
          title: "Submitting",
          body: (
            <>
              <p>Submit your project by {END}. Your submission needs:</p>
              <Points
                items={[
                  "Your project name",
                  "A short description of what it does",
                  "Your team members",
                  "A link to your code or a demo",
                  "The tools and AI you used",
                ]}
              />
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
              <p>
                The judges’ decisions are final. A judge with a conflict of interest, such as a close personal or school tie to a team, steps
                aside from scoring that team.
              </p>
            </>
          ),
        },
        {
          id: "ownership",
          title: "Your work is yours",
          body: <p>Teams keep ownership of everything they build at Hack 876.</p>,
        },
        {
          id: "conduct",
          title: "Conduct",
          body: (
            <p>
              Everyone at Hack 876 follows the{" "}
              <Link href="/code-of-conduct" className="font-bold text-ink underline decoration-emerald decoration-2 underline-offset-4">
                Code of Conduct
              </Link>
              . Breaking it can mean disqualification.
            </p>
          ),
        },
      ]}
    />
  );
}
