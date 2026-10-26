import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage, Points } from "@/components/site/PolicyPage";
import { event, incidentLead, mlh, photoConsent, venue, venueSafety } from "@/data/event";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description: "Hack 876 follows the MLH Code of Conduct. How everyone at the event looks after each other, and how to report a problem.",
  alternates: { canonical: "/code-of-conduct" },
};

const email = event.contactEmail;
const linkClass = "font-bold text-ink underline decoration-emerald decoration-2 underline-offset-4";
const Mail = () =>
  email ? (
    <a href={`mailto:${email}`} className={linkClass}>
      {email}
    </a>
  ) : null;
const MlhMail = () => (
  <a href={`mailto:${mlh.incidentEmail}`} className={linkClass}>
    {mlh.incidentEmail}
  </a>
);
const MlhCode = ({ children = "MLH Code of Conduct" }: { children?: string }) => (
  <a href={mlh.codeOfConductUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

/** Marks a detail that is not confirmed yet. */
const Pending = ({ children }: { children: string }) => (
  <span className="ml-1 inline-block rounded-full border-2 border-dashed border-ink/40 px-2 py-0.5 align-middle text-[0.7rem] font-extrabold tracking-wide text-ink-soft uppercase">
    {children}
  </span>
);

// TODO(owner): list the on-site emergency contact and the nearest hospital (venueSafety.nearestHospital in event.ts).
const venueSafetyRows = [
  { k: "Exits and assembly point", v: venueSafety.exits && venueSafety.assemblyPoint ? `${venueSafety.exits} Assembly point: ${venueSafety.assemblyPoint}` : null },
  { k: "First aid", v: venueSafety.firstAid },
  { k: "Accessibility", v: venueSafety.accessibility },
  { k: "Nearest hospital", v: venueSafety.nearestHospital },
];

export default function CodeOfConductPage() {
  return (
    <PolicyPage
      eyebrow="Code of Conduct"
      title="Be good to"
      underline="each other."
      intro={
        <>
          <p>
            Hack 876 is {mlh.hackDayBadge.replace(/^An /, "an ")} and follows the <MlhCode />. Everyone at the event, students, mentors,
            judges, volunteers, sponsors and staff, must follow it.
          </p>
          <p className="text-base text-ink-soft">
            The page below puts that code in plain words for a secondary-school event, with extra rules to keep students safe. Where
            anything here differs from the MLH Code of Conduct, the MLH Code of Conduct applies.
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
                photoConsent,
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
          id: "venue",
          title: "At the venue",
          body: (
            <>
              <p>We will share the exits, assembly point and first-aid location at the opening session and post them here before the event.</p>
              <dl className="grid gap-2">
                {venueSafetyRows.map((row) => (
                  <div key={row.k}>
                    <dt className="inline font-bold text-ink">{row.k}: </dt>
                    <dd className="inline">{row.v ?? <Pending>To be confirmed</Pending>}</dd>
                  </div>
                ))}
              </dl>
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
                Reports are handled confidentially.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border-[2.5px] border-ink bg-paper p-4">
                  <p className="font-extrabold text-ink">Hack 876 organizers</p>
                  <p className="mt-1">Any organizer or volunteer in a Hack 876 shirt, or email <Mail />.</p>
                </div>
                <div className="rounded-2xl border-[2.5px] border-ink bg-paper p-4">
                  <p className="font-extrabold text-ink">MLH</p>
                  <p className="mt-1">
                    Email <MlhMail />. Students and adults can report directly to MLH at any time, during or after the event.
                  </p>
                </div>
              </div>
              <p>
                <strong className="text-ink">Hack 876 incident lead:</strong>{" "}
                {incidentLead ? (
                  `${incidentLead.name}, ${incidentLead.contact}`
                ) : (
                  <>
                    to be announced before the event. <Pending>To be confirmed</Pending>
                  </>
                )}
              </p>
            </>
          ),
        },
        {
          id: "escalation",
          title: "What happens after a report",
          body: (
            <ol className="list-decimal space-y-2 pl-5">
              <li>Tell any organizer or volunteer, or the incident lead.</li>
              <li>Organizers keep the student safe and separate people where needed.</li>
              <li>
                Serious or safeguarding matters are passed to the school’s accompanying teacher and the student’s parent or guardian, as
                appropriate, and to MLH at <MlhMail />.
              </li>
              <li>In an emergency, call local emergency services first.</li>
            </ol>
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
