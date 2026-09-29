import type { CSSProperties } from "react";
import { Icon } from "@/components/art/Icons";
import { faqs, parents, event } from "@/data/event";

function Answer({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\s*\n/).map((para, i) => (
        <p key={i} className={i ? "mt-3" : undefined}>
          {para}
        </p>
      ))}
    </>
  );
}

function PendingTag() {
  return (
    <span className="ml-2 inline-block -translate-y-px rounded-full border-[1.5px] border-ink/40 bg-sun-light px-2 py-0.5 align-middle text-[0.7rem] font-extrabold tracking-wide text-ink uppercase">
      details coming
    </span>
  );
}

export function Faq() {
  const half = Math.ceil(faqs.length / 2);
  const cols = [faqs.slice(0, half), faqs.slice(half)];

  return (
    <section id="faq" aria-labelledby="faq-title" className="grain relative bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="max-w-3xl">
          <p className="eyebrow text-emerald-deep">FAQ</p>
          <h2 id="faq-title" className="display mt-3 text-[clamp(2.4rem,6.5vw,4.2rem)]">
            Questions? Good.
          </h2>
          <p className="mt-4 max-w-lg text-lg text-ink-2">
            The short answers. {event.contactEmail ? (
              <>
                Still stuck? Email{" "}
                <a className="font-bold underline decoration-emerald decoration-2 underline-offset-4" href={`mailto:${event.contactEmail}`}>
                  {event.contactEmail}
                </a>
                .
              </>
            ) : null}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-6">
          {cols.map((col, c) => (
            <div key={c} className="flex flex-col gap-4">
              {col.map((f, i) => (
                <details
                  key={f.q}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 40}ms` } as CSSProperties}
                  className="group rounded-[1.25rem] border-[3px] border-ink bg-paper shadow-[3px_4px_0_0_var(--color-ink)] transition-[box-shadow,transform] open:bg-white open:shadow-[5px_6px_0_0_var(--color-emerald)]"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-[1rem] px-5 py-4 text-lg font-extrabold sm:px-6">
                    {f.q}
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-sun text-xl leading-none transition-transform duration-300 group-open:rotate-45 group-open:bg-emerald group-open:text-white"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-[1.02rem] leading-relaxed text-ink-2 sm:px-6">
                    <Answer text={f.a} />
                    {f.pending && <PendingTag />}
                  </div>
                </details>
              ))}
            </div>
          ))}
        </div>

        <Parents />
      </div>
    </section>
  );
}

function Parents() {
  return (
    <div
      id="parents"
      data-reveal
      className="mt-16 scroll-mt-28 rounded-[2rem] border-[3px] border-ink bg-sky-light p-6 sm:mt-20 sm:p-10"
      aria-labelledby="parents-title"
      role="region"
    >
      <div className="flex flex-wrap items-center gap-4">
        <Icon name="people" className="h-12 w-12" />
        <div>
          <h2 id="parents-title" className="display text-3xl sm:text-4xl">
            For parents &amp; guardians
          </h2>
          <p className="mt-1 text-ink-2">
            Hack 876 is a supervised, school-day-length event for secondary students. Here&rsquo;s what to expect.
          </p>
        </div>
      </div>
      <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {parents.map((p) => (
          <div key={p.topic} className="border-t-[2.5px] border-ink/15 pt-4">
            <dt className="font-extrabold">
              {p.topic}
              {p.pending && <PendingTag />}
            </dt>
            <dd className="mt-1.5 text-ink-2">{p.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
