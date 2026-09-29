"use client";

import { useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

function describedBy(id: string, hint?: ReactNode, error?: string, extra?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null, extra].filter(Boolean).join(" ") || undefined;
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-[0.95rem] font-bold text-bill-deep">
      <svg viewBox="0 0 20 20" aria-hidden className="mt-0.5 h-4 w-4 shrink-0">
        <circle cx="10" cy="10" r="9" fill="currentColor" />
        <path d="M10 5.5v5.5M10 14v.2" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      {error}
    </p>
  );
}

type Base = { name: string; label: ReactNode; hint?: ReactNode; error?: string; optional?: boolean };

function Label({ id, label, optional }: { id: string; label: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={id} className="field-label">
      {label}
      {optional && <span className="ml-2 text-sm font-semibold text-ink-soft">(optional)</span>}
    </label>
  );
}

export function TextField({ name, label, hint, error, optional, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const id = `f-${name}`;
  return (
    <div>
      <Label id={id} label={label} optional={optional} />
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      <input
        id={id}
        name={name}
        className="input"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        required={!optional}
        {...rest}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  hint,
  error,
  options,
  placeholder,
  ...rest
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[]; placeholder: string }) {
  const id = `f-${name}`;
  return (
    <div>
      <Label id={id} label={label} />
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      <select
        id={id}
        name={name}
        className="input"
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        required
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  hint,
  error,
  optional,
  maxLength,
  ...rest
}: Base & TextareaHTMLAttributes<HTMLTextAreaElement> & { maxLength?: number }) {
  const id = `f-${name}`;
  const [count, setCount] = useState(0);
  const near = maxLength ? count > maxLength * 0.9 : false;
  return (
    <div>
      <Label id={id} label={label} optional={optional} />
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      <textarea
        id={id}
        name={name}
        className="input"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error, maxLength ? `${id}-count` : undefined)}
        required={!optional}
        maxLength={maxLength}
        onInput={(e) => setCount(e.currentTarget.value.length)}
        data-counter
        {...rest}
      />
      <div className="flex items-start justify-between gap-4">
        <ErrorText id={id} error={error} />
        {maxLength && (
          <p id={`${id}-count`} className={`mt-2 ml-auto shrink-0 text-sm tabular-nums ${near ? "font-bold text-bill-deep" : "text-ink-soft"}`}>
            <span className="sr-only">Characters used: </span>
            {count}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}

export function ChoiceGroup({
  name,
  label,
  hint,
  error,
  options,
  onChange,
}: Base & { options: { value: string; label: string }[]; onChange?: (v: string) => void }) {
  const id = `f-${name}`;
  return (
    <fieldset aria-describedby={describedBy(id, hint, error)} aria-invalid={error ? true : undefined}>
      <legend className="field-label">{label}</legend>
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      <div className="mt-1 flex flex-wrap gap-2.5" id={id} tabIndex={-1}>
        {options.map((o) => (
          <label key={o.value} className="choice">
            <input type="radio" name={name} value={o.value} onChange={() => onChange?.(o.value)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      <ErrorText id={id} error={error} />
    </fieldset>
  );
}
