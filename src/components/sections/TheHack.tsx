import type { CSSProperties } from "react";
import { DoctorBird } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { Mark, TailLine } from "@/components/art/Marks";
import { buildTypes } from "@/data/event";

export function TheHack() {
  return (
    <section id="hack" aria-labelledby="hack-title" className="grain relative overflow-hidden bg-cream pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:px-8">
        <div data-reveal>
          <p className="eyebrow text-emerald-deep">The Hack</p>
          <h2 id="hack-title" className="display mt-3 text-[clamp(2.7rem,7.5vw,5rem)]">
            Build something
            <br />
            <span className="relative inline-block">
              that should exist.
              <TailLine className="absolute -bottom-4 left-0 h-6 w-full" />
            </span>
          </h2>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
            Find a problem, opportunity, or experience you care about. Then spend the day turning your idea into
            something people can actually see, use, or experience.
          </p>

          <h3 className="mt-10 text-sm font-extrabold tracking-[0.14em] text-ink-soft uppercase">You could build</h3>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {buildTypes.map((b, i) => (
              <li key={b.label}>
                <span className="chip" style={{ "--r": `${i % 2 ? 2 : -2}deg` } as CSSProperties}>
                  <Icon name={b.icon} className="h-6 w-6" />
                  {b.label}
                </span>
              </li>
            ))}
            <li className="hand flex items-center gap-1 px-2 text-xl text-ink-soft">
              + whatever else brings it to life
            </li>
          </ul>

          <p className="mt-8 max-w-md text-ink-soft">
            Use whatever tech fits your idea. Never built anything before? That&rsquo;s fine.
          </p>
        </div>

        <LaptopScene />
      </div>
    </section>
  );
}

/** A laptop lid covered in stickers, the bird hovering over it. Pure illustration. */
function LaptopScene() {
  const lidStickers: { name: string; cls: string; rot: number }[] = [
    { name: "ackee", cls: "top-[14%] left-[10%] w-[18%]", rot: -12 },
    { name: "patty", cls: "top-[58%] left-[14%] w-[17%]", rot: 8 },
    { name: "culture", cls: "top-[16%] right-[12%] w-[15%]", rot: 10 },
    { name: "bagjuice", cls: "bottom-[10%] right-[16%] w-[13%]", rot: -8 },
    { name: "spark", cls: "top-[10%] left-[42%] w-[10%]", rot: 0 },
  ];
  return (
    <div data-reveal="pop" className="relative mx-auto w-full max-w-[560px]" style={{ "--reveal-rot": "3deg" } as CSSProperties}>
      <div aria-hidden className="absolute inset-[8%] -z-10 rounded-full bg-mint" />

      {/* Laptop lid */}
      <div className="relative mt-24 aspect-[4/3] rotate-[-3deg] rounded-[1.6rem] border-[3.5px] border-ink bg-[#d9dee1] shadow-[8px_10px_0_0_var(--color-ink)] sm:mt-28">
        <div aria-hidden className="absolute inset-3 rounded-[1.1rem] border-2 border-dashed border-ink/10" />
        {lidStickers.map((s) => (
          <Icon
            key={s.name}
            name={s.name}
            className={`diecut wiggle-hover absolute ${s.cls}`}
            style={{ rotate: `${s.rot}deg` }}
          />
        ))}

        {/* Hack 876 die-cut sticker in the middle */}
        <div className="absolute top-[40%] left-[40%] -translate-x-1/4 -translate-y-1/4 rotate-[-6deg] rounded-2xl border-[3px] border-ink bg-ink px-4 py-2 shadow-[0_0_0_4px_#fff,4px_6px_0_4px_rgba(20,23,22,.9)]">
          <span className="display text-3xl text-cream sm:text-4xl">
            HACK<span className="text-emerald-light">8</span>
            <span className="text-aqua">7</span>
            <span className="text-[#ff6b5b]">6</span>
          </span>
        </div>

        {/* Round "I built it" sticker */}
        <div className="absolute right-[6%] bottom-[34%] grid h-20 w-20 rotate-[14deg] place-items-center rounded-full border-[3px] border-ink bg-sun text-center shadow-[0_0_0_4px_#fff,3px_5px_0_4px_rgba(20,23,22,.9)] sm:h-24 sm:w-24">
          <span className="display text-[0.95rem] leading-tight sm:text-lg">
            I built
            <br />
            it.
          </span>
        </div>
      </div>

      {/* Bird hovering on the lid edge */}
      <div className="absolute -top-6 left-[18%] w-[46%] sm:-top-10">
        <div className="bird-bob">
          <DoctorBird className="w-full" tailColors={["#141716", "#12a150"]} />
        </div>
      </div>

      {/* Loose desk bits */}
      <Icon name="sticky" className="diecut float-slow absolute -bottom-6 -left-4 w-20 sm:w-24" style={{ "--rot": "-10deg" } as CSSProperties} />
      <Icon name="headphones" className="diecut float-slow absolute top-4 -right-2 w-20 sm:w-24" style={{ "--rot": "12deg" } as CSSProperties} />
      <Icon name="plug" className="diecut absolute right-[8%] -bottom-8 w-16 rotate-6" />
      <Mark name="spark" color="#ef3b2d" className="absolute top-6 left-0 h-9 w-9" />
    </div>
  );
}
