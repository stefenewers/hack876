"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DoctorBird } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { Mark, TailLine } from "@/components/art/Marks";
import { useReducedMotion } from "@/components/motion/hooks";
import { applications, event } from "@/data/event";

const CONFETTI_COLORS = ["#12a150", "#ffc93c", "#ef3b2d", "#2ec4c9", "#ffb3c7", "#8fd3f4", "#141716"];

export function ApplySuccess({ firstName, email }: { firstName: string; email: string }) {
  const reduced = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [pieces] = useState(() =>
    Array.from({ length: 70 }, (_, i) => ({
      left: Math.random() * 100,
      dx: (Math.random() - 0.5) * 240,
      spin: 360 + Math.random() * 720,
      delay: Math.random() * 0.6,
      dur: 2.2 + Math.random() * 1.6,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      shape: i % 3,
      size: 8 + Math.random() * 10,
    })),
  );

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    rootRef.current?.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
  }, [reduced]);

  return (
    <div ref={rootRef} className="relative scroll-mt-24">
      {!reduced && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
          {pieces.map((p, i) => (
            <span
              key={i}
              className="confetti absolute top-0 block border-2 border-ink"
              style={
                {
                  left: `${p.left}%`,
                  width: p.size,
                  height: p.shape === 2 ? p.size * 0.5 : p.size,
                  borderRadius: p.shape === 0 ? "999px" : "3px",
                  background: p.color,
                  "--dx": `${p.dx}px`,
                  "--spin": `${p.spin}deg`,
                  "--delay": `${p.delay}s`,
                  "--dur": `${p.dur}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      <div className="text-center">
        <div className="mx-auto w-48 sm:w-56">
          <div className="bird-bob">
            <DoctorBird mood="happy" className="w-full" title="The Doctor Bird, celebrating" />
          </div>
        </div>
        <h2 ref={headingRef} tabIndex={-1} className="display mt-4 text-[clamp(2.6rem,8vw,4.4rem)] leading-[0.95] outline-none">
          {firstName ? `You’re in, ${firstName}!` : "You’re in!"}
          <span className="sr-only"> Your application was submitted.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-2">
          Well, you&rsquo;re in the running. Your application is with us
          {email ? (
            <>
              {" "}
              and we&rsquo;ll be in touch at <strong className="font-bold text-ink">{email}</strong>
            </>
          ) : null}
          .
          {applications.decisionsBy ? ` Decisions go out by ${applications.decisionsBy}.` : ""}
        </p>
      </div>

      {/* Shareable card */}
      <div className="mt-12 flex flex-col items-center">
        <p className="hand -rotate-2 text-2xl text-ink-soft">screenshot it. post it. tag your team.</p>
        <ShareCard />
      </div>

      <div className="mx-auto mt-14 max-w-xl rounded-[1.5rem] border-[3px] border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-ink)]">
        <h3 className="display text-2xl">What happens next</h3>
        <ol className="mt-4 space-y-3">
          {[
            "We read every application. Really.",
            "If you’re accepted, we’ll email you with next steps and a parent/guardian consent form.",
            "Start noticing things that should work better. You’ll need them.",
          ].map((t, i) => (
            <li key={t} className="flex gap-3">
              <span className="display grid h-8 w-8 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-sun">{i + 1}</span>
              <span className="pt-1 text-ink-2">{t}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-secondary btn-sm">
            Back to Hack 876
          </Link>
          <Link href="/#faq" className="btn btn-secondary btn-sm">
            Read the FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}

/** 4:5 card, sized for an Instagram story/post screenshot. */
function ShareCard() {
  return (
    <figure
      aria-label="Shareable card: I applied to Hack 876, Kingston, Jamaica"
      className="relative mt-4 aspect-[4/5] w-full max-w-[380px] rotate-[-1.5deg] overflow-hidden rounded-[2rem] border-[3.5px] border-ink bg-ink text-cream shadow-[8px_10px_0_0_var(--color-emerald)]"
    >
      <div aria-hidden className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-emerald" />
      <div aria-hidden className="absolute top-24 -right-6 h-32 w-32 rounded-full bg-sun/90" />
      <div className="absolute top-6 right-0 w-[64%]">
        <div className="bird-bob">
          <DoctorBird mood="happy" tailColors={["#fbf4e6", "#4fdc8e"]} className="w-full" />
        </div>
      </div>
      <Mark name="spark" color="#ffc93c" className="absolute top-8 left-8 h-9 w-9" />

      <div className="absolute inset-x-6 bottom-7">
        <p className="display text-2xl text-sun">I applied to</p>
        <p className="display mt-1 text-[4.2rem] leading-[0.85]">
          HACK<span className="text-emerald-light">8</span>
          <span className="text-aqua">7</span>
          <span className="text-[#ff6b5b]">6</span>
        </p>
        <TailLine draw={false} colors={["#4fdc8e", "#fbf4e6"]} className="mt-2 h-4 w-full" />
        <p className="display mt-4 text-[1.35rem] leading-tight">{event.tagline}</p>
        <div className="mt-4 flex items-center justify-between text-sm font-bold tracking-[0.14em] text-cream/70 uppercase">
          <span>{event.city}</span>
          <span>{event.year}</span>
        </div>
      </div>
      <Icon name="patty" className="absolute top-[24%] left-7 w-12 rotate-[-12deg]" />
    </figure>
  );
}
