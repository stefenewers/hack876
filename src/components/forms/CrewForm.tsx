"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { submitCrew, unlockCrew, type CrewState } from "@/app/actions";
import { DoctorBird } from "@/components/art/DoctorBird";
import { Confetti } from "@/components/motion/Confetti";
import { useReducedMotion } from "@/components/motion/hooks";
import { CAPACITY, validateCrew, type CrewErrors } from "@/lib/crew";
import { TextAreaField, TextField } from "./Fields";

/*
 * The /crew sign-up: a code card until the crew code is entered (or arrives in
 * the link), then the form, then a celebration. The server checks the code
 * again on submit, so unlocking here is a convenience, not a gate.
 */

const card = "rounded-[2rem] border-[3px] border-ink bg-paper shadow-[6px_8px_0_0_var(--color-ink)]";

export function CrewForm({ unlocked, code: initialCode }: { unlocked: boolean; code?: string }) {
  const reduced = useReducedMotion();
  const [code, setCode] = useState<string | null>(unlocked && initialCode ? initialCode : null);
  const [tried, setTried] = useState(false);
  const [unlock, unlockAction, unlocking] = useActionState(async (prev: { ok: boolean }, data: FormData) => {
    const result = await unlockCrew(prev, data);
    setTried(true);
    if (result.ok) setCode(String(data.get("code") ?? "").trim());
    return result;
  }, { ok: false });

  const onUnlock = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => unlockAction(data));
  };

  /* Arrived with a valid link: straight to the form. */
  if (unlocked && code) return <SignUp code={code} />;

  return (
    <div>
      <div className={`${card} flex flex-col items-center gap-5 p-6 sm:flex-row sm:items-start sm:p-8`}>
        <DoctorBird mood={code ? "happy" : "sly"} className="w-24 shrink-0 sm:w-28" title={code ? "The Doctor Bird, pleased" : "The Doctor Bird, waiting"} />
        {code ? (
          <div className="self-center text-center sm:text-left" aria-live="polite">
            <p className="display text-3xl">You&rsquo;re in.</p>
            <p className="mt-1 text-ink-2">Welcome, crew. The form is just below.</p>
          </div>
        ) : (
          <form onSubmit={onUnlock} noValidate className="w-full">
            <TextField
              name="code"
              label="Crew code"
              hint="It’s in the WhatsApp group."
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              error={tried && !unlock.ok && !unlocking ? "Hmm, that’s not it. Check the WhatsApp group." : undefined}
            />
            <button type="submit" className="btn btn-primary mt-4" disabled={unlocking}>
              {unlocking ? "Checking…" : "Unlock"} {!unlocking && <span aria-hidden>→</span>}
            </button>
          </form>
        )}
      </div>
      {code && (
        <div className={`mt-8 ${reduced ? "" : "rise"}`} style={{ ["--d" as string]: "0s" }}>
          <SignUp code={code} />
        </div>
      )}
    </div>
  );
}

const initial: CrewState = { status: "idle" };

function SignUp({ code }: { code: string }) {
  const [errors, setErrors] = useState<CrewErrors>({});
  const [state, formAction, pending] = useActionState(async (prev: CrewState, data: FormData) => {
    const result = await submitCrew(prev, data);
    if (result.status === "error") setErrors(result.errors);
    return result;
  }, initial);
  const renderedAt = useRef<HTMLInputElement>(null);

  /* The time trap: when the form first appeared. */
  useEffect(() => {
    if (renderedAt.current && !renderedAt.current.value) renderedAt.current.value = String(Date.now());
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const r = validateCrew(Object.fromEntries(data));
    if (!r.ok) {
      setErrors(r.errors);
      const first = Object.keys(r.errors)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setErrors({});
    startTransition(() => formAction(data));
  };

  if (state.status === "success") return <CrewSuccess {...state} />;

  return (
    <form onSubmit={onSubmit} noValidate className={`${card} relative p-5 sm:p-9`}>
      <input type="hidden" name="k" value={code} />
      <input ref={renderedAt} type="hidden" name="t" defaultValue="" />
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="hp_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {state.status === "error" && state.message && (
        <p role="alert" className="mb-6 rounded-2xl border-[2.5px] border-bill-deep bg-[#fff1ee] px-4 py-3 font-semibold text-bill-deep">
          {state.message}
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="fullName" label="Full name" autoComplete="name" error={errors.fullName} />
        <TextField name="organization" label="Current company" autoComplete="organization" hint="Or school, or ‘freelance’." error={errors.organization} />
        <TextField name="email" type="email" label="Email" autoComplete="email" inputMode="email" error={errors.email} />
        <TextField name="phone" type="tel" label="Phone / WhatsApp" autoComplete="tel" inputMode="tel" placeholder="876 555 0123" error={errors.phone} />
        <div className="sm:col-span-2">
          <CapacitySlider error={errors.capacity} />
        </div>
        <div className="sm:col-span-2">
          <TextAreaField
            name="needle"
            label="Where could you really move the needle?"
            hint="Intros, a skill, a venue, food, a contact at a company, your time on the day…"
            rows={3}
            maxLength={600}
            error={errors.needle}
          />
        </div>
      </div>
      <p className="mt-6 text-sm text-ink-soft">
        We use this only to coordinate Hack 876. Just Stefen and Nadani see it, and we&rsquo;ll delete it after the event wraps unless you ask us to
        keep you posted.
      </p>
      <div className="mt-6 flex justify-end">
        <button type="submit" className="btn btn-primary text-lg" disabled={pending}>
          {pending ? "Sending…" : "Count me in"} {!pending && <span aria-hidden>→</span>}
        </button>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Capacity slider                                                            */
/* -------------------------------------------------------------------------- */

const FILL = ["bg-sky", "bg-emerald", "bg-sun", "bg-bill"];

/** A native range input (keyboard, touch and screen readers for free) laid over a progress-bar track. */
function CapacitySlider({ error }: { error?: string }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(1);
  const c = CAPACITY[i];
  const last = CAPACITY.length - 1;
  const pct = (i / last) * 100;
  /* Keep the bird and the fill inside the track at the ends. */
  const pos = Math.min(96, Math.max(4, pct));
  const move = reduced ? "" : "duration-500 ease-[var(--ease-out-quart)]";
  const id = "f-capacity";

  return (
    <div>
      <label htmlFor={id} className="field-label">
        How much time can you give?
      </label>
      <div aria-live="polite" className="mt-1">
        <p className="display text-3xl sm:text-4xl">
          {c.label} <span className="font-sans text-base font-bold tracking-normal text-ink-soft normal-case sm:text-lg">{c.hours}</span>
        </p>
      </div>
      <p className="hand mt-1 -rotate-1 text-xl text-ink-soft">{c.caption}</p>

      <div className="relative mt-14 px-1">
        <div
          aria-hidden
          className={`absolute -top-12 w-14 -translate-x-1/2 ${reduced ? "" : "transition-[left]"} ${move}`}
          style={{ left: `${pos}%` }}
        >
          <DoctorBird tail={false} mood={i >= 2 ? "happy" : "sly"} className="w-full" />
        </div>
        <div className="relative h-3 rounded-full border-[2.5px] border-ink bg-paper outline-offset-4 has-[input:focus-visible]:outline-[3px] has-[input:focus-visible]:outline-ink has-[input:focus-visible]:outline-solid">
          <div aria-hidden className={`absolute inset-y-0 left-0 rounded-full ${FILL[i]} ${reduced ? "" : "transition-[width,background-color]"} ${move}`} style={{ width: `${pos}%` }} />
          <input
            id={id}
            type="range"
            name="capacityIndex"
            min={0}
            max={last}
            step={1}
            value={i}
            onChange={(e) => setI(Number(e.currentTarget.value))}
            aria-valuetext={`${c.label}, ${c.hours}`}
            aria-invalid={error ? true : undefined}
            className="absolute inset-x-0 top-1/2 h-10 w-full -translate-y-1/2 cursor-pointer appearance-none opacity-0"
          />
        </div>
        <input type="hidden" name="capacity" value={c.key} />
        <div className="mt-3 grid grid-cols-4 text-xs font-bold sm:text-sm">
          {CAPACITY.map((s, n) => (
            <button
              key={s.key}
              type="button"
              tabIndex={-1}
              onClick={() => setI(n)}
              className={`cursor-pointer rounded-md px-0.5 ${n === 0 ? "text-left" : n === last ? "text-right" : "text-center"} ${n === i ? "text-ink" : "text-ink-soft"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      {error && <p className="mt-2 text-[0.95rem] font-bold text-bill-deep">{error}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Success                                                                    */
/* -------------------------------------------------------------------------- */

function CrewSuccess({ firstName, capacityLabel, organization }: { firstName: string; capacityLabel: string; organization: string }) {
  const reduced = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    rootRef.current?.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
  }, [reduced]);

  return (
    <div ref={rootRef} className="relative scroll-mt-24">
      {!reduced && <Confetti />}
      <div className="text-center">
        <div className="mx-auto w-40 sm:w-48">
          <div className="bird-bob">
            <DoctorBird mood="happy" className="w-full" title="The Doctor Bird, celebrating" />
          </div>
        </div>
        <h2 ref={headingRef} tabIndex={-1} className="display mt-4 text-[clamp(2.4rem,8vw,4rem)] leading-[0.95] outline-none">
          {firstName ? `Welcome to the crew, ${firstName}!` : "Welcome to the crew!"}
          <span className="sr-only"> Your sign-up was sent.</span>
        </h2>
        {organization && capacityLabel && (
          <p className="mt-5">
            <span className="chip">
              {organization} · {capacityLabel}
            </span>
          </p>
        )}
      </div>

      <div className="mx-auto mt-10 max-w-xl rounded-[1.5rem] border-[3px] border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-ink)]">
        <h3 className="display text-2xl">What happens next</h3>
        <ol className="mt-4 space-y-3">
          {[
            "Stefen or Nadani will message you on WhatsApp within a week.",
            "There’s a copy in your inbox.",
            "Need to change something? Just reply to that email.",
          ].map((t, i) => (
            <li key={t} className="flex gap-3">
              <span className="display grid h-8 w-8 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-sun">{i + 1}</span>
              <span className="pt-1 text-ink-2">{t}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <Link href="/" className="btn btn-secondary btn-sm">
            Back to Hack 876
          </Link>
        </div>
      </div>
    </div>
  );
}
