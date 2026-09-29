import type { CSSProperties } from "react";
import { Icon } from "@/components/art/Icons";
import { Mark } from "@/components/art/Marks";
import { prizes, type Prize } from "@/data/event";

const bg: Record<string, string> = {
  sun: "bg-sun",
  sky: "bg-sky",
  peach: "bg-peach",
  pink: "bg-pink",
  bill: "bg-bill text-white",
  aqua: "bg-aqua",
};

/* Visual podium order: 2nd, 1st, 3rd. Mobile stacks 1st, 2nd, 3rd. */
const podiumLayout: Record<number, { order: string; lift: string; rot: number }> = {
  1: { order: "order-1 sm:order-2", lift: "sm:-translate-y-8", rot: -1 },
  2: { order: "order-2 sm:order-1", lift: "sm:translate-y-2", rot: 1.5 },
  3: { order: "order-3", lift: "sm:translate-y-6", rot: -2 },
};

export function Prizes() {
  const anyReward = prizes.some((p) => p.reward);
  const podium = prizes.filter((p) => p.place).sort((a, b) => a.place! - b.place!);
  const special = prizes.filter((p) => !p.place);

  return (
    <section id="prizes" aria-labelledby="prizes-title" className="grain relative bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-emerald-deep">Prizes</p>
            <h2 id="prizes-title" className="display mt-3 text-[clamp(2.4rem,6.5vw,4.2rem)]">
              Build. Present.
              <br />
              Get recognized.
            </h2>
          </div>
          <p className="max-w-md text-lg text-ink-2">
            {anyReward
              ? "Here’s what’s up for grabs."
              : "Six ways to walk away a winner. What you actually win gets announced soon."}
          </p>
        </div>

        {/* Podium */}
        <ol className="mt-16 grid gap-5 sm:grid-cols-3 sm:items-end sm:gap-6">
          {podium.map((p, i) => {
            const l = podiumLayout[p.place!];
            const first = p.place === 1;
            return (
              <li
                key={p.name}
                data-reveal="pop"
                className={`${l.order} ${l.lift}`}
                style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
              >
                <div
                  className={`sticker sticker-hover relative flex flex-col items-center p-6 text-center ${bg[p.color]} ${first ? "sm:pt-10 sm:pb-9" : ""}`}
                  style={{ rotate: `${l.rot}deg` }}
                >
                  {first && <Mark name="spark" className="absolute top-4 right-4 h-9 w-9" />}
                  {first && <Mark name="burst" className="absolute top-6 left-5 h-8 w-8" />}
                  <Icon name={p.icon} className={first ? "h-24 w-24 sm:h-32 sm:w-32" : "h-16 w-16 sm:h-20 sm:w-20"} />
                  <h3 className={`display mt-4 leading-none ${first ? "text-4xl sm:text-5xl" : "text-3xl"}`}>{p.name}</h3>
                  <p className="mt-2 font-semibold opacity-90">{p.line}</p>
                  <Reward prize={p} />
                </div>
              </li>
            );
          })}
        </ol>

        {/* Special awards */}
        <h3 data-reveal className="display mt-16 text-center text-3xl sm:text-4xl">
          Plus special awards
        </h3>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-6">
          {special.map((p, i) => (
            <li
              key={p.name}
              data-reveal="pop"
              style={{ "--reveal-delay": `${i * 70}ms`, rotate: `${[2, -1.5, 1][i % 3]}deg` } as CSSProperties}
              className={`sticker sticker-hover flex items-center gap-4 p-5 ${bg[p.color]}`}
            >
              <Icon name={p.icon} className="h-16 w-16 shrink-0" />
              <div>
                <h4 className="display text-2xl leading-none sm:text-[1.7rem]">{p.name}</h4>
                <p className="mt-1.5 text-[0.95rem] leading-snug font-semibold opacity-90">{p.line}</p>
                <Reward prize={p} small />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Reward({ prize, small = false }: { prize: Prize; small?: boolean }) {
  if (prize.reward) return <p className={`mt-3 font-extrabold ${small ? "text-sm" : "text-lg"}`}>{prize.reward}</p>;
  return (
    <p className={`mt-3 inline-flex w-fit rounded-full border-2 border-current/40 px-2.5 py-0.5 font-bold opacity-80 ${small ? "text-xs" : "text-sm"}`}>
      Prize announced soon
    </p>
  );
}
