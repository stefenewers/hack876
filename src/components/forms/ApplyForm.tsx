"use client";

import { startTransition, useActionState, useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { submitApplication, type ApplyState } from "@/app/actions";
import { DoctorBird } from "@/components/art/DoctorBird";
import { eligibility, schools } from "@/data/event";
import {
  APPLICATION_STEPS,
  LONG_ANSWER_MAX,
  ROLES,
  validateApplication,
  type FieldErrors,
} from "@/lib/application";
import { ChoiceGroup, SelectField, TextAreaField, TextField } from "./Fields";
import { ApplySuccess } from "./ApplySuccess";

const STEP_TITLES = ["About you", "How you think", "Your role & team", "Links"];
const STEP_BLURBS = [
  "The basics, so we know who you are and how to reach you.",
  "No wrong answers. Write like you talk. A few honest sentences beat an essay.",
  "No team yet? Totally fine. We’ll help you find one.",
  "All optional. No GitHub or portfolio needed. If you’ve got something to show, drop it here.",
];
const DRAFT_KEY = "hack876-apply-draft-v1";

const initial: ApplyState = { status: "idle" };

export function ApplyForm() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  // Server errors are applied here (not in an effect) and jump to the first step that needs fixing.
  const [state, formAction, pending] = useActionState(async (prev: ApplyState, data: FormData) => {
    const result = await submitApplication(prev, data);
    if (result.status === "error") {
      setErrors(result.errors);
      const bad = APPLICATION_STEPS.findIndex((fields) => fields.some((f) => result.errors[f]));
      if (bad >= 0) setStep(bad);
    }
    return result;
  }, initial);
  const [hasTeam, setHasTeam] = useState<string>("");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const last = STEP_TITLES.length - 1;

  const readForm = () => (formRef.current ? Object.fromEntries(new FormData(formRef.current)) : {});

  useEffect(() => {
    if (state.status === "success") {
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
    }
  }, [state.status]);

  /* ---- move focus to the step heading on step change (not on first load) ---- */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [step]);

  /* ---- restore + autosave a draft (per-device convenience only) ---- */
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as Record<string, string>;
        for (const [k, v] of Object.entries(draft)) {
          const el = form.elements.namedItem(k);
          if (!el) continue;
          if (el instanceof RadioNodeList) {
            // Click (rather than set .checked) so React's onChange runs, e.g. to reveal teammate names.
            el.forEach((n) => {
              const r = n as HTMLInputElement;
              if (r.value === v && !r.checked) r.click();
            });
          } else if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
            el.value = v;
            el.dispatchEvent(new Event("input", { bubbles: true }));
          }
        }
      }
    } catch {}
  }, []);

  const saveTimer = useRef<number | undefined>(undefined);
  const onFormInput = useCallback(() => {
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      if (!formRef.current) return;
      const data = Object.fromEntries(new FormData(formRef.current));
      delete data.company;
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
        setSavedAt(Date.now());
      } catch {}
    }, 500);
  }, []);

  /* ---- per-step validation ---- */
  const validateStep = (s: number) => {
    const result = validateApplication(readForm(), { schools, forms: eligibility.formOptions });
    const stepErrors: FieldErrors = {};
    if (!result.ok) {
      for (const f of APPLICATION_STEPS[s]) if (result.errors[f]) stepErrors[f] = result.errors[f];
    }
    setErrors((prev) => {
      const next = { ...prev };
      for (const f of APPLICATION_STEPS[s]) delete next[f];
      return { ...next, ...stepErrors };
    });
    const firstBad = APPLICATION_STEPS[s].find((f) => stepErrors[f]);
    if (firstBad) {
      requestAnimationFrame(() => document.getElementById(`f-${firstBad}`)?.focus());
      return false;
    }
    return true;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(last, s + 1));
  };

  // We dispatch the action ourselves (instead of <form action>) so React doesn't
  // auto-reset the form, which would wipe answers if the server sends errors back.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < last) {
      next();
      return;
    }
    // Final check across every step before hitting the server.
    const result = validateApplication(readForm(), { schools, forms: eligibility.formOptions });
    if (!result.ok) {
      setErrors(result.errors);
      const bad = APPLICATION_STEPS.findIndex((fields) => fields.some((f) => result.errors[f]));
      setStep(bad >= 0 ? bad : 0);
      return;
    }
    const data = new FormData(e.currentTarget);
    startTransition(() => formAction(data));
  };

  if (state.status === "success") {
    return <ApplySuccess firstName={state.firstName} email={state.email} />;
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const progress = step / last;

  return (
    <div>
      {/* Progress: the bird flies along its own tail */}
      <div className="relative mb-10 px-1" aria-hidden>
        <div className="relative h-3 rounded-full border-[2.5px] border-ink bg-paper">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-emerald transition-[width] duration-500 ease-[var(--ease-out-quart)]"
            style={{ width: `${Math.max(4, progress * 100)}%` }}
          />
        </div>
        <div
          className="absolute -top-9 w-16 -translate-x-1/2 transition-[left] duration-500 ease-[var(--ease-out-quart)]"
          style={{ left: `${Math.max(4, progress * 100)}%` }}
        >
          <DoctorBird tail={false} className="w-full" />
        </div>
        <ol className="mt-3 grid grid-cols-4 text-xs font-bold text-ink-soft sm:text-sm">
          {STEP_TITLES.map((t, i) => (
            <li key={t} className={`${i === step ? "text-ink" : ""} ${i === 0 ? "text-left" : i === last ? "text-right" : "text-center"}`}>
              <span className="hidden sm:inline">{t}</span>
              <span className="sm:hidden">{i + 1}</span>
            </li>
          ))}
        </ol>
      </div>

      <form ref={formRef} onSubmit={onSubmit} onInput={onFormInput} onChange={onFormInput} noValidate className="relative">
        {/* Honeypot */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="rounded-[2rem] border-[3px] border-ink bg-paper p-5 shadow-[6px_8px_0_0_var(--color-ink)] sm:p-9">
          <p className="eyebrow text-emerald-deep" aria-live="polite">
            Step {step + 1} of {STEP_TITLES.length}
          </p>
          <h2 ref={headingRef} tabIndex={-1} className="display mt-2 scroll-mt-28 text-4xl outline-none sm:text-5xl">
            {STEP_TITLES[step]}
          </h2>
          <p className="mt-2 max-w-xl text-ink-2">{STEP_BLURBS[step]}</p>

          {(errorCount > 0 || (state.status === "error" && state.message)) && (
            <div role="alert" className="mt-6 rounded-2xl border-[2.5px] border-bill-deep bg-[#fff1ee] px-4 py-3 font-semibold text-bill-deep">
              {state.status === "error" && state.message && Object.keys(state.errors).length === 0
                ? state.message
                : `Almost there. ${errorCount === 1 ? "One answer needs" : `${errorCount} answers need`} another look.`}
            </div>
          )}

          {/* Step 1 */}
          <div hidden={step !== 0} className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <TextField name="fullName" label="Full name" autoComplete="name" error={errors.fullName} />
            </div>
            <TextField name="email" type="email" label="Email" autoComplete="email" inputMode="email" error={errors.email} hint="One you actually check." />
            <TextField name="phone" type="tel" label="Phone" autoComplete="tel" inputMode="tel" placeholder="876 555 0123" error={errors.phone} hint="In case we need to reach you fast." />
            <div className="sm:col-span-2">
              <SelectField name="school" label="School" placeholder="Choose your school" options={schools} error={errors.school} />
            </div>
            <ChoiceGroup
              name="form"
              label="Form"
              options={eligibility.formOptions.map((f) => ({ value: f, label: f }))}
              error={errors.form}
            />
            <TextField name="age" type="number" inputMode="numeric" min={13} max={21} label="Age" className="input max-w-[8rem]" error={errors.age} />
          </div>

          {/* Step 2 */}
          <div hidden={step !== 1} className="mt-8 grid gap-7">
            <TextAreaField name="enjoy" label="What kinds of things do you enjoy creating or solving?" maxLength={LONG_ANSWER_MAX} error={errors.enjoy} />
            <TextAreaField
              name="built"
              label="Tell us about something you’ve built, organized, researched, designed, or improved."
              hint="Doesn’t have to be tech. A club, an event, a side hustle, a science project. It all counts."
              maxLength={LONG_ANSWER_MAX}
              error={errors.built}
            />
            <TextAreaField name="why" label="Why do you want to come to Hack 876?" maxLength={LONG_ANSWER_MAX} error={errors.why} />
            <TextAreaField name="jamaica" label="What’s one thing in Jamaica you think should work better?" maxLength={LONG_ANSWER_MAX} error={errors.jamaica} />
          </div>

          {/* Step 3 */}
          <div hidden={step !== 2} className="mt-8 grid gap-8">
            <ChoiceGroup
              name="role"
              label="What role do you see yourself playing?"
              hint="You won’t be locked in. Most people end up doing a bit of everything."
              options={ROLES.map((r) => ({ value: r, label: r }))}
              error={errors.role}
            />
            <ChoiceGroup
              name="hasTeam"
              label="Do you already have a team?"
              hint={`Teams are ${eligibility.teamSize.min}–${eligibility.teamSize.max} students.`}
              options={[
                { value: "yes", label: "Yes, I have a team" },
                { value: "no", label: "Not yet" },
              ]}
              onChange={setHasTeam}
              error={errors.hasTeam}
            />
            <div hidden={hasTeam !== "yes"}>
              <TextAreaField
                name="teammates"
                label="Teammate names"
                hint="Names and schools, separated by commas. They each need to apply too."
                rows={3}
                maxLength={500}
                optional={hasTeam !== "yes"}
                error={errors.teammates}
              />
            </div>
            <ChoiceGroup
              name="openToMatch"
              label="Are you open to being matched with students from another school?"
              options={[
                { value: "yes", label: "Yes, sounds fun" },
                { value: "no", label: "I’d rather not" },
              ]}
              error={errors.openToMatch}
            />
          </div>

          {/* Step 4 */}
          <div hidden={step !== 3} className="mt-8 grid gap-6">
            <TextField name="github" label="GitHub" optional placeholder="username or github.com/you" autoComplete="off" error={errors.github} />
            <TextField name="portfolio" label="Portfolio or website" optional placeholder="yoursite.com" inputMode="url" error={errors.portfolio} />
            <TextField name="projectLink" label="A project you’re proud of" optional placeholder="Link to a demo, video, doc, anything" inputMode="url" error={errors.projectLink} />
            <p className="rounded-2xl bg-mint px-4 py-3 text-ink-2">
              By submitting, you confirm your answers are your own. If you’re accepted, we’ll ask a parent or guardian for
              consent before the event.
            </p>
          </div>

          {/* Nav */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-ink/15 pt-6">
            {step > 0 ? (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="btn btn-secondary btn-sm">
                <span aria-hidden>←</span> Back
              </button>
            ) : (
              <span className="text-sm text-ink-soft" aria-live="polite">
                {savedAt ? "Draft saved on this device" : "Your answers save on this device as you type"}
              </span>
            )}
            {step < last ? (
              <button type="submit" className="btn btn-primary">
                Next <span aria-hidden>→</span>
              </button>
            ) : (
              <button type="submit" className="btn btn-primary px-7 text-lg" disabled={pending} aria-disabled={pending}>
                {pending ? "Sending…" : "Submit application"} {!pending && <span aria-hidden>→</span>}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
