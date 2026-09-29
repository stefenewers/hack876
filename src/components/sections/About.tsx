import type { CSSProperties } from "react";
import { BirdMark } from "@/components/art/DoctorBird";
import { Mark, TailLine } from "@/components/art/Marks";
import { CountUp } from "@/components/motion/CountUp";
import { stats } from "@/data/event";

const statColor: Record<string, string> = {
  emerald: "text-emerald-light",
  sun: "text-sun",
  aqua: "text-aqua",
  bill: "text-[#ff6b5b]",
};

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="on-dark relative overflow-x-clip bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 sm:pt-20 sm:pb-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
          <div data-reveal>
            <p className="eyebrow text-sun">About</p>
            <h2 id="about-title" className="display mt-3 text-[clamp(2.6rem,7vw,4.6rem)]">
              Jamaica&rsquo;s student
              <br />
              <span className="relative inline-block">
                hackathon.
                <TailLine
                  colors={["#4fdc8e", "#ffc93c"]}
                  className="absolute -bottom-3 left-0 h-5 w-full"
                />
              </span>
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-cream/85">
              Hack 876 brings together secondary-school students for one day of building, experimenting, and turning
              ideas into real prototypes.
            </p>

            <ul className="mt-8 space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <NoMark />
                <span>
                  You don&rsquo;t need to arrive with a <s className="decoration-bill decoration-2">startup idea</s>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <NoMark />
                <span>
                  You don&rsquo;t need to be the <s className="decoration-bill decoration-2">best programmer</s> in your
                  school.
                </span>
              </li>
              <li className="flex items-start gap-3 font-bold text-cream">
                <YesMark />
                <span>Bring curiosity, a team, and something you want to make better.</span>
              </li>
            </ul>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-2 lg:gap-x-10">
            {stats.map((s, i) => (
              <div
                key={s.label}
                data-reveal="pop"
                style={{ "--reveal-delay": `${i * 90}ms`, "--reveal-rot": `${i % 2 ? 4 : -4}deg` } as CSSProperties}
                className="relative"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span aria-hidden className={`display block text-[clamp(4.5rem,13vw,7.5rem)] leading-none ${statColor[s.color]}`}>
                    <CountUp to={s.value} />
                  </span>
                  <span aria-hidden className="display mt-1 block text-2xl text-cream">
                    {s.label}
                  </span>
                  <span className="sr-only">
                    {s.value} {s.label}
                  </span>
                </dd>
                {i === 0 && <Mark name="burst" color="#ffc93c" className="absolute -top-4 -left-5 h-8 w-8" />}
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Marquee />
    </section>
  );
}

function NoMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="mt-1 h-6 w-6 shrink-0">
      <path d="M5 5 L19 19 M19 5 L5 19" stroke="#ef3b2d" strokeWidth={3.5} strokeLinecap="round" />
    </svg>
  );
}
function YesMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="mt-1 h-6 w-6 shrink-0">
      <path d="M3 13 L9 19 L21 5" stroke="#4fdc8e" strokeWidth={3.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const WORDS = ["Build", "Break", "Fix", "Pitch", "Demo", "Win", "Repeat"];

function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center gap-6">
          <span className="display text-3xl sm:text-4xl">{w}</span>
          <BirdMark className="h-5 w-8" />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="marquee relative z-10 -mb-6 -rotate-[1.5deg] overflow-hidden border-y-[3px] border-ink bg-sun py-3 text-ink sm:-mb-8">
      <div className="marquee-track flex w-max">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
