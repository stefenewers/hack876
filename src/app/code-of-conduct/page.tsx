import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage, Points } from "@/components/site/PolicyPage";
import { event, venue } from "@/data/event";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description: "How everyone at Hack 876 looks after each other: students, mentors, judges, volunteers and organizers.",
  alternates: { canonical: "/code-of-conduct" },
};

const email = event.contactEmail;
const Mail = () =>
  email ? (
    <a href={`mailto:${email}`} className="font-bold text-ink underline decoration-emerald decoration-2 underline-offset-4">
      {email}
    </a>
  ) : null;

export default function CodeOfConductPage() {
  return (
    <PolicyPage
      eyebrow="Code of Conduct"
      title="Be good to"
      underline="each other."
      intro={
        <>
          <p>
            Hack 876 is a day for building, learning and having fun. Everyone deserves to feel safe and welcome while they do it. This
            Code of Conduct applies to everyone at the event: students, mentors, judges, volunteers, sponsors and organizers.
          </p>
          <p className="text-base text-ink-soft">
            It is based on the{" "}
            <a href="https://mlh.io/code-of-conduct" target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
              Major League Hacking Code of Conduct
            </a>
            , rewritten for a secondary-school event.
          </p>
        </>
      }
      related={{ href: "/rules", label: "Event Rules" }}
      sections={[
        {
          id: "expected",
          title: "What we expect",
          body: (
            <Points
              items={[
                "Be kind and respectful to everyone, including people on other teams and from other schools.",
                "Include people. Listen to your teammates and give everyone a chance to contribute.",
                "Ask for help when you need it, and offer help when you can.",
                "Follow instructions from organizers, volunteers and your school’s teachers.",
                "Win well, lose well. Cheer for other teams’ demos.",
              ]}
            />
          ),
        },
        {
          id: "not-ok",
          title: "Zero tolerance",
          body: (
            <>
              <p>There is no place at Hack 876 for:</p>
              <Points
                items={[
                  "Harassment of any kind, in person or online.",
                  "Bullying, threats, intimidation or unwanted physical contact.",
                  "Discrimination or jokes about anyone’s race, gender, religion, disability, appearance, background or school.",
                  "Sexual language, images or behaviour.",
                ]}
              />
            </>
          ),
        },
        {
          id: "respect",
          title: "Respect the space",
          body: (
            <Points
              items={[
                `Look after the ${venue.name}, its staff and its property. Leave your area as clean as you found it.`,
                "Respect other people’s equipment and projects. Don’t touch another team’s laptop or work without asking.",
                "No alcohol, drugs, vaping, smoking or weapons of any kind, anywhere at the event.",
              ]}
            />
          ),
        },
        {
          id: "online",
          title: "Online and photos",
          body: (
            <Points
              items={[
                "The same rules apply in group chats, on social media and in anything you build or present.",
                "Don’t take or share photos or videos of other students without their permission.",
                "Hack 876 only uses photos of students with school and parent or guardian consent.",
                "Don’t share anyone’s personal information.",
              ]}
            />
          ),
        },
        {
          id: "safeguarding",
          title: "Keeping everyone safe",
          body: (
            <>
              <p>Most people at Hack 876 are under 18, so we take extra care.</p>
              <Points
                items={[
                  "Adults at the event, including mentors, judges and volunteers, are never alone one-on-one with a student. They work in open, shared spaces.",
                  "Students stay at the venue for the whole event, unless they are collected or signed out in line with their school’s rules.",
                  "Each school’s accompanying teacher remains responsible for their own students throughout the day.",
                ]}
              />
            </>
          ),
        },
        {
          id: "report",
          title: "How to report a problem",
          body: (
            <>
              <p>
                If something makes you or someone else feel unsafe or uncomfortable, tell us. You won’t get in trouble for speaking up.
              </p>
              <Points
                items={[
                  "Speak to any organizer or volunteer. They will be wearing a Hack 876 shirt.",
                  <>Or email <Mail />, during or after the event.</>,
                ]}
              />
              <p>Reports are handled confidentially. If it’s an emergency, find an adult right away.</p>
            </>
          ),
        },
        {
          id: "consequences",
          title: "What happens if someone breaks this code",
          body: (
            <>
              <p>
                Organizers decide what happens, depending on what took place. That can range from a warning to being asked to leave the
                event. For students, we will also let their school and accompanying teacher know.
              </p>
              <p>
                Breaking this code can also mean a team is disqualified. See the{" "}
                <Link href="/rules" className="font-bold text-ink underline decoration-emerald decoration-2 underline-offset-4">
                  Event Rules
                </Link>
                .
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
