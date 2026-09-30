import Image from "next/image";
import type { CSSProperties } from "react";
import { BirdMark } from "@/components/art/DoctorBird";
import { Mark } from "@/components/art/Marks";
import { people, previewUnconfirmedPeople, roleLabels, type Person, type PersonRole } from "@/data/event";

const roles: PersonRole[] = ["judge", "speaker", "mentor"];
const groups: PersonRole[] = ["judge", "speaker", "tbd", "mentor"];
const roleColor: Record<PersonRole, string> = { judge: "bg-sun", speaker: "bg-aqua", mentor: "bg-pink", tbd: "bg-sun" };

export function People() {
  const confirmed = people.filter((p) => p.confirmed || previewUnconfirmedPeople);

  return (
    <section id="people" aria-labelledby="people-title" className="relative bg-cream-2 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-emerald-deep">People</p>
            <h2 id="people-title" className="display mt-3 text-[clamp(2.4rem,6.5vw,4.2rem)]">
              Judges, speakers
              <br />
              &amp; mentors.
            </h2>
          </div>
          <p className="max-w-md text-lg text-ink-2">
            People who build things for a living, here to cheer you on, help you get unstuck, and pick the winners.
          </p>
        </div>

        {confirmed.length === 0 ? (
          <ComingSoon />
        ) : (
          groups.map((role) => {
            const group = confirmed.filter((p) => p.role === role);
            if (group.length === 0) return null;
            return (
              <div key={role} className="mt-14">
                <h3 className="display text-3xl">{roleLabels[role].plural}</h3>
                <ul className="mt-6 flex flex-wrap justify-center gap-5 [&>li]:w-[calc(50%-0.625rem)] sm:[&>li]:w-[calc(33.333%-0.834rem)] lg:[&>li]:w-[calc(25%-0.9375rem)]">
                  {group.map((p, i) => (
                    <PersonCard key={p.name} person={p} index={i} />
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

function PersonCard({ person, index }: { person: Person; index: number }) {
  const rot = [-2, 1.5, -1, 2][index % 4];
  const body = (
    <>
      <div className="relative aspect-square overflow-hidden rounded-[1rem] border-[3px] border-ink bg-mint">
        {person.photo ? (
          <Image src={person.photo} alt={`Portrait of ${person.name}`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
        ) : (
          <div className="grid h-full place-items-center">
            <BirdMark className="h-16 w-24 opacity-70" />
          </div>
        )}
        <span className={`absolute top-2 left-2 hidden rounded-full border-2 border-ink px-2.5 py-0.5 text-xs font-extrabold tracking-wider whitespace-nowrap uppercase sm:inline-block ${roleColor[person.role]}`}>
          {roleLabels[person.role].singular}
        </span>
      </div>
      <p className="mt-3 text-lg leading-tight font-extrabold">{person.name}</p>
      <p className="text-sm font-semibold text-ink-soft">
        {person.title ? `${person.title}, ` : ""}
        {person.organization}
      </p>
      {person.bio && <p className="mt-2 text-sm text-ink-2">{person.bio}</p>}
    </>
  );
  return (
    <li data-reveal="pop" className="sticker sticker-hover relative bg-paper p-3" style={{ rotate: `${rot}deg`, "--reveal-delay": `${index * 60}ms` } as CSSProperties}>
      {!person.confirmed && (
        <span className="absolute -top-3 -right-2 z-10 rotate-6 rounded-full border-2 border-ink bg-sun px-2.5 py-0.5 text-xs font-extrabold tracking-wide uppercase shadow-[2px_2px_0_0_var(--color-ink)]">
          Preview<span className="hidden sm:inline"> · unconfirmed</span>
        </span>
      )}
      {person.url ? (
        <a href={person.url} target="_blank" rel="noopener noreferrer" className="block rounded-lg">
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  );
}

function ComingSoon() {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
      {roles.map((role, i) => (
        <div
          key={role}
          data-reveal="pop"
          style={{ rotate: `${[-2, 1, -1.5][i]}deg`, "--reveal-delay": `${i * 80}ms` } as CSSProperties}
          className="sticker relative bg-paper p-4"
        >
          <div className="relative hidden aspect-[4/3] place-items-center overflow-hidden rounded-[1rem] border-[3px] border-dashed border-ink/40 bg-cream sm:grid">
            <span className="display text-[5.5rem] leading-none text-ink/10" aria-hidden>
              ?
            </span>
            <span className={`absolute top-3 left-3 rounded-full border-2 border-ink px-3 py-0.5 text-xs font-extrabold tracking-wider uppercase ${roleColor[role]}`}>
              {roleLabels[role].plural}
            </span>
            <Mark name="dots" className="absolute right-4 bottom-4 h-3 w-10" color="#141716" />
          </div>
          <span className={`inline-block rounded-full border-2 border-ink px-3 py-0.5 text-xs font-extrabold tracking-wider uppercase sm:hidden ${roleColor[role]}`}>
            {roleLabels[role].plural}
          </span>
          <p className="display mt-2 text-2xl sm:mt-4">{roleLabels[role].plural} announcing soon</p>
          <p className="mt-1 text-ink-soft">We&rsquo;ll post names here as they confirm.</p>
        </div>
      ))}
    </div>
  );
}
