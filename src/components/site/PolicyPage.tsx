import Link from "next/link";
import type { ReactNode } from "react";
import { TailLine } from "@/components/art/Marks";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { event } from "@/data/event";

/*
 * Layout for short public policy pages (Code of Conduct, Rules). Same shell as
 * /schools: Nav, cream main, display heading with the tail underline, Footer.
 */

export type PolicySection = { id: string; title: string; body: ReactNode };

export function PolicyPage({
  eyebrow,
  title,
  underline,
  intro,
  sections,
  related,
}: {
  eyebrow: string;
  /** Plain words before the underlined part of the heading. */
  title: string;
  underline: string;
  intro: ReactNode;
  sections: PolicySection[];
  related: { href: string; label: string };
}) {
  return (
    <>
      <Nav />
      <main id="main" className="grain relative min-h-dvh bg-cream pt-28 pb-24 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="eyebrow text-emerald-deep">{eyebrow}</p>
          <h1 className="display mt-3 text-[clamp(2.8rem,9vw,4.8rem)] leading-[0.95]">
            {title}{" "}
            <span className="relative inline-block">
              {underline}
              <TailLine className="absolute -bottom-3 left-0 h-5 w-full" />
            </span>
          </h1>
          <div className="mt-8 max-w-2xl space-y-3 text-lg leading-relaxed text-ink-2">{intro}</div>

          <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="chip text-sm">
                {s.title}
              </a>
            ))}
          </nav>

          <div className="mt-10 grid gap-5">
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className="scroll-mt-28 rounded-[1.25rem] border-[3px] border-ink bg-paper p-5 shadow-[3px_4px_0_0_var(--color-ink)] sm:p-7"
              >
                <h2 id={`${s.id}-title`} className="text-2xl font-extrabold tracking-tight">
                  {s.title}
                </h2>
                <div className="policy-body mt-3 space-y-3 text-[1.05rem] leading-relaxed text-ink-2">{s.body}</div>
              </section>
            ))}
          </div>

          <p className="mt-10 text-ink-2">
            Questions?{" "}
            {event.contactEmail && (
              <>
                Email{" "}
                <a href={`mailto:${event.contactEmail}`} className="font-bold text-ink underline decoration-emerald decoration-2 underline-offset-4">
                  {event.contactEmail}
                </a>
                . Also read the{" "}
              </>
            )}
            <Link href={related.href} className="font-bold text-ink underline decoration-emerald decoration-2 underline-offset-4">
              {related.label}
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

/** A bulleted list in the site's style. */
export function Points({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-[0.6em] h-2 w-2 shrink-0 rounded-full bg-emerald" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
