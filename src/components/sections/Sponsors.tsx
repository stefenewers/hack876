import Image from "next/image";
import Link from "next/link";
import { DoctorBird } from "@/components/art/DoctorBird";
import { previewUnconfirmedSponsors, sponsors } from "@/data/event";

export function Sponsors() {
  const visible = sponsors.filter((s) => s.confirmed || previewUnconfirmedSponsors);
  const organizing = visible.filter((s) => s.level === "organizing");
  const confirmed = visible.filter((s) => s.level !== "organizing");

  return (
    <section id="sponsors" aria-labelledby="sponsors-title" className="relative bg-cream-2 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="text-center">
          <p className="eyebrow text-emerald-deep">Sponsors</p>
          <h2 id="sponsors-title" className="display mt-3 text-[clamp(2.4rem,6.5vw,4.2rem)]">
            Made possible by
          </h2>
        </div>

        {organizing.map((s) => (
          <div key={s.name} data-reveal className="mx-auto mt-12 flex max-w-sm flex-col items-center">
            <p className="text-xs font-extrabold tracking-[0.18em] text-ink-soft uppercase">Organizing sponsor</p>
            <a
              href={s.url || undefined}
              target={s.url ? "_blank" : undefined}
              rel={s.url ? "noopener noreferrer" : undefined}
              className="sticker mt-4 block h-36 w-full overflow-hidden bg-[#fdfcf6] p-6 sm:h-40"
            >
              <span className="relative block h-full w-full">
                <Image src={s.logo} alt={s.name} fill sizes="384px" className="object-contain" />
              </span>
            </a>
          </div>
        ))}

        {confirmed.length > 0 ? (
          <ul className="mt-12 flex flex-wrap justify-center gap-5 sm:gap-7">
            {confirmed.map((s) => (
              <li key={s.name} data-reveal="pop" className="relative w-[calc(50%-10px)] sm:w-60">
                {!s.confirmed && (
                  <span className="absolute -top-3 -right-2 z-10 rotate-6 rounded-full border-2 border-ink bg-sun px-2.5 py-0.5 text-xs font-extrabold tracking-wide uppercase shadow-[2px_2px_0_0_var(--color-ink)]">
                    Preview<span className="hidden sm:inline"> · unconfirmed</span>
                  </span>
                )}
                <a
                  href={s.url || undefined}
                  target={s.url ? "_blank" : undefined}
                  rel={s.url ? "noopener noreferrer" : undefined}
                  className="sticker sticker-hover grid aspect-[3/2] place-items-center overflow-hidden bg-white p-5"
                >
                  <span className={`relative block h-full w-full ${s.pending ? "opacity-45 grayscale" : ""}`}>
                    <Image src={s.logo} alt={s.name} fill sizes="240px" className="object-contain" />
                  </span>
                </a>
                {s.pending && (
                  <p className="mt-3 text-center">
                    <span className="inline-block rounded-full border-2 border-dashed border-ink/40 bg-cream px-2 py-0.5 text-[0.65rem] font-extrabold tracking-wide whitespace-nowrap text-ink-soft uppercase sm:px-2.5 sm:text-[0.7rem]">
                      Pending confirmation
                    </span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p data-reveal className="mx-auto mt-8 max-w-md rounded-2xl border-[3px] border-dashed border-ink/30 px-6 py-8 text-center text-lg font-semibold text-ink-soft">
            Sponsor logos land here once they&rsquo;re confirmed.
          </p>
        )}

        <div
          data-reveal
          className="relative mt-14 flex flex-col items-start gap-6 overflow-hidden rounded-[2rem] border-[3px] border-ink bg-emerald p-7 text-white shadow-[6px_8px_0_0_var(--color-ink)] sm:flex-row sm:items-center sm:justify-between sm:p-10"
        >
          <div className="relative z-10 max-w-xl">
            <h3 className="display text-3xl sm:text-4xl">Interested in supporting Hack 876?</h3>
            <p className="mt-2 text-lg text-white/90">
              Help 80 students build something real. We&rsquo;d love to talk.
            </p>
          </div>
          <Link href="/partner" className="btn btn-primary relative z-10 text-lg">
            Partner with us <span aria-hidden>→</span>
          </Link>
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-10 w-56 opacity-15">
            <DoctorBird flutter={false} className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
