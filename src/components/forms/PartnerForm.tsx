"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { submitPartner, type PartnerState } from "@/app/actions";
import { DoctorBird } from "@/components/art/DoctorBird";
import { validatePartner, type PartnerErrors } from "@/lib/application";
import { TextAreaField, TextField } from "./Fields";

const initial: PartnerState = { status: "idle" };

export function PartnerForm() {
  const [errors, setErrors] = useState<PartnerErrors>({});
  const [state, formAction, pending] = useActionState(async (prev: PartnerState, data: FormData) => {
    const result = await submitPartner(prev, data);
    if (result.status === "error") setErrors(result.errors);
    return result;
  }, initial);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state.status === "success") doneRef.current?.focus();
  }, [state.status]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const r = validatePartner(Object.fromEntries(data));
    if (!r.ok) {
      setErrors(r.errors);
      const first = Object.keys(r.errors)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setErrors({});
    startTransition(() => formAction(data));
  };

  if (state.status === "success") {
    return (
      <div className="rounded-[2rem] border-[3px] border-ink bg-paper p-8 text-center shadow-[6px_8px_0_0_var(--color-ink)]">
        <DoctorBird mood="happy" className="mx-auto w-40" />
        <h2 ref={doneRef} tabIndex={-1} className="display mt-4 text-4xl outline-none">
          Thank you!
        </h2>
        <p className="mx-auto mt-2 max-w-md text-lg text-ink-2">We got your message and we&rsquo;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-[2rem] border-[3px] border-ink bg-paper p-5 shadow-[6px_8px_0_0_var(--color-ink)] sm:p-9">
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {state.status === "error" && state.message && (
        <p role="alert" className="mb-6 rounded-2xl border-[2.5px] border-bill-deep bg-[#fff1ee] px-4 py-3 font-semibold text-bill-deep">
          {state.message}
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="name" label="Your name" autoComplete="name" error={errors.name} />
        <TextField name="organization" label="Organization" autoComplete="organization" error={errors.organization} />
        <TextField name="email" type="email" label="Email" autoComplete="email" error={errors.email} />
        <TextField name="phone" type="tel" label="Phone" optional autoComplete="tel" error={errors.phone} />
        <div className="sm:col-span-2">
          <TextAreaField
            name="message"
            label="How would you like to be involved?"
            hint="Sponsoring, mentoring, judging, food, prizes, hardware, something else. Tell us what you’re thinking."
            maxLength={2000}
            error={errors.message}
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button type="submit" className="btn btn-primary text-lg" disabled={pending}>
          {pending ? "Sending…" : "Send"} {!pending && <span aria-hidden>→</span>}
        </button>
      </div>
    </form>
  );
}
