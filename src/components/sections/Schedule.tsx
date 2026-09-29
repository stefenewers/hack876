"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { DoctorBird } from "@/components/art/DoctorBird";
import { BrushEdge, Mark } from "@/components/art/Marks";
import { useReducedMotion } from "@/components/motion/hooks";
import { event, phaseLabels, schedule, type SchedulePhase } from "@/data/event";

const phaseDot: Record<SchedulePhase, string> = {
  arrive: "bg-sky",
  build: "bg-emerald-light",
  show: "bg-sun",
  celebrate: "bg-[#ff6b5b]",
};

export function Schedule() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  // The bird flies down the timeline, drawing its tail as you scroll.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (reduced) {
      list.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = list.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const p = Math.min(1, Math.max(0, (anchor - r.top) / r.height));
      list.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <section id="schedule" aria-labelledby="schedule-title" className="on-dark relative mt-10 bg-night text-cream">
      <BrushEdge side="top" color="#0f2a20" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start" data-reveal>
          <p className="eyebrow text-sun">Schedule</p>
          <h2 id="schedule-title" className="display mt-3 text-[clamp(2.6rem,7vw,4.6rem)]">
            One day.
            <br />A lot can happen.
          </h2>
          <p className="mt-6 max-w-sm text-lg text-cream/80">
            Doors open at 8. Hacking starts at 9:45. By 7:30 you&rsquo;ll have built something that didn&rsquo;t exist
            this morning.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-cream/30 px-4 py-2 font-bold">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-sun" />
            {event.date ? new Date(event.date + "T12:00:00").toLocaleDateString("en-JM", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : event.dateLabel}
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-cream/80" aria-label="Phases">
            {(Object.keys(phaseLabels) as SchedulePhase[]).map((ph) => (
              <li key={ph} className="flex items-center gap-2">
                <span aria-hidden className={`h-3 w-3 rounded-full border-2 border-ink ${phaseDot[ph]}`} />
                {phaseLabels[ph]}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-cream/60">Times may shift a little. Final run-of-show goes to accepted hackers.</p>
        </div>

        <ol ref={listRef} className="relative" style={{ "--p": 0 } as CSSProperties}>
          {/* Tail rail: faint guide + drawn streamers */}
          <div aria-hidden className="pointer-events-none absolute top-2 bottom-2 left-[13px] w-[30px] sm:left-[17px]">
            <svg viewBox="0 0 30 1000" preserveAspectRatio="none" className="h-full w-full" overflow="visible">
              <path d={RAIL_A} fill="none" stroke="rgba(251,244,230,.12)" strokeWidth={3} strokeDasharray="2 8" strokeLinecap="round" />
              <path
                d={RAIL_A}
                pathLength={1}
                fill="none"
                stroke="#4fdc8e"
                strokeWidth={5}
                strokeLinecap="round"
               
                style={{ strokeDasharray: 1, strokeDashoffset: "calc(1 - var(--p))" }}
              />
              <path
                d={RAIL_B}
                pathLength={1}
                fill="none"
                stroke="#fbf4e6"
                strokeWidth={3}
                strokeLinecap="round"
               
                style={{ strokeDasharray: 1, strokeDashoffset: "calc(1 - var(--p))" }}
              />
            </svg>
            <div
              className="absolute left-1/2 w-[92px] -translate-x-[30%] -translate-y-[92%]"
              style={{ top: "calc(var(--p) * 100%)" }}
            >
              <DoctorBird tail={false} className="w-full rotate-[28deg]" />
            </div>
          </div>

          {schedule.map((item, idx) => {
            const showPhase = idx === 0 || schedule[idx - 1].phase !== item.phase;
            return (
              <li key={item.time + item.title} className="relative grid grid-cols-[44px_1fr] gap-x-4 sm:grid-cols-[56px_1fr] sm:gap-x-6">
                {showPhase && (
                  <p className={`eyebrow col-start-2 mb-3 text-[0.72rem] text-cream/55 ${idx === 0 ? "" : "mt-8"}`}>{phaseLabels[item.phase]}</p>
                )}
                <span aria-hidden className="relative col-start-1 row-span-1 flex justify-center pt-5">
                  <span className={`relative z-10 h-4 w-4 rounded-full border-[3px] border-ink ring-4 ring-night ${phaseDot[item.phase]}`} />
                </span>
                <div
                  className={`col-start-2 mb-3 rounded-2xl border-2 px-4 py-3.5 transition-colors sm:px-5 ${
                    item.highlight ? "border-cream bg-cream text-ink shadow-[4px_5px_0_0_#12a150]" : "border-cream/15 bg-white/[0.03]"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5">
                    <p className={`display shrink-0 text-xl whitespace-nowrap tabular-nums sm:w-[7.2rem] sm:text-2xl ${item.highlight ? "text-emerald-deep" : "text-sun"}`}>
                      <time>{item.time}</time>
                    </p>
                    <h3 className="text-lg font-extrabold sm:text-xl">{item.title}</h3>
                  </div>
                  <p className={`mt-0.5 ${item.highlight ? "text-ink-2" : "text-cream/70"}`}>{item.note}</p>
                </div>
              </li>
            );
          })}
          <li aria-hidden className="relative mt-4 pl-[60px] sm:pl-[80px]">
            <Mark name="star" color="#ffc93c" className="inline h-8 w-8" />
          </li>
        </ol>
      </div>
      <BrushEdge side="bottom" color="#0f2a20" />
    </section>
  );
}

const RAIL_A = "M15 0 C 30 80, 0 160, 15 250 C 30 340, 0 420, 15 500 C 30 580, 0 660, 15 750 C 30 840, 0 920, 15 1000";
const RAIL_B = "M9 0 C 24 80, -6 160, 9 250 C 24 340, -6 420, 9 500 C 24 580, -6 660, 9 750 C 24 840, -6 920, 9 1000";
