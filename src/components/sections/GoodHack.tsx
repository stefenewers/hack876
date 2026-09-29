import type { CSSProperties } from "react";
import { Mark, TailLine } from "@/components/art/Marks";
import { judging, principles } from "@/data/event";

const cardColors = ["bg-sun", "bg-aqua", "bg-bill text-white", "bg-emerald text-white"];
const tilts = [-2, 1.5, -1, 2];

export function GoodHack() {
  return (
    <section id="judging" aria-labelledby="good-title" className="grain relative bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="max-w-3xl">
          <p className="eyebrow text-emerald-deep">What counts</p>
          <h2 id="good-title" className="display mt-3 text-[clamp(2.6rem,7vw,4.6rem)]">
            What makes a good hack?
          </h2>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {principles.map((p, i) => (
            <li
              key={p.title}
              data-reveal="pop"
              style={{ "--reveal-delay": `${i * 80}ms`, rotate: `${tilts[i]}deg` } as CSSProperties}
              className={`sticker sticker-hover relative p-6 ${cardColors[i]}`}
            >
              <span aria-hidden className="display absolute -top-5 -left-3 grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-paper text-xl text-ink shadow-[2px_3px_0_0_var(--color-ink)]">
                {i + 1}
              </span>
              <h3 className="display pt-2 text-[1.85rem] leading-[1.02]">{p.title}</h3>
              <p className="mt-3 font-semibold opacity-90">{p.body}</p>
            </li>
          ))}
        </ol>

        {/* Signature line */}
        <div data-reveal className="relative mx-auto mt-20 max-w-5xl text-center sm:mt-28">
          <Mark name="spark" color="#ef3b2d" className="absolute -top-8 left-[6%] h-10 w-10 sm:left-[2%]" />
          <Mark name="ticks" color="#12a150" className="absolute -right-2 -bottom-6 h-10 w-10 sm:right-[4%]" />
          <p className="display text-[clamp(2.4rem,8vw,5.6rem)] leading-[0.98]">
            Complexity{" "}
            <span className="relative inline-block">
              alone
              <TailLine variant="underline" className="absolute -bottom-3 left-0 h-5 w-full" colors={["#ef3b2d", "#141716"]} />
            </span>{" "}
            does not win Hack&nbsp;876.
          </p>
          <p className="mx-auto mt-8 max-w-xl text-lg text-ink-2">
            A simple idea that works, solves something real, and is explained well beats a pile of tech every time.
          </p>
        </div>

        {/* Judging lenses */}
        <div data-reveal className="mt-20 rounded-[2rem] border-[3px] border-ink bg-paper p-6 shadow-[6px_8px_0_0_var(--color-ink)] sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="display text-3xl sm:text-4xl">What judges look at</h3>
            <p className="max-w-sm text-ink-soft">Six things, in plain language. No secret formula.</p>
          </div>
          <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {judging.map((j, i) => (
              <div key={j.name} className="flex gap-4">
                <span aria-hidden className="display mt-0.5 text-3xl leading-none text-emerald">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <dt className="text-lg font-extrabold">{j.name}</dt>
                  <dd className="mt-1 text-ink-2">{j.body}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
