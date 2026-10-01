import Link from "next/link";
import { BirdMark } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { Logo } from "@/components/art/Wordmark";
import { event, nav } from "@/data/event";

const sheet = ["ackee", "patty", "laptop", "culture", "bagjuice", "lignum", "headphones", "sticky"];

export function Footer() {
  return (
    <footer className="on-dark relative bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg" aria-label="Hack 876 home">
              <BirdMark className="h-7 w-11 [&_*]:stroke-cream" />
              <Logo className="text-[2rem] text-cream" />
            </Link>
            <p className="display mt-4 text-2xl text-cream/90">{event.tagline}</p>
            <p className="mt-2 text-cream/60">
              {event.city} · {event.year}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-[0.7rem] text-sun">Explore</p>
            <ul className="mt-3 grid grid-cols-2 gap-y-2 font-semibold">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="rounded hover:text-sun">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#parents" className="rounded hover:text-sun">
                  Parents
                </Link>
              </li>
              <li>
                <Link href="/#prizes" className="rounded hover:text-sun">
                  Prizes
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-[0.7rem] text-sun">Get involved</p>
            <ul className="mt-3 space-y-2 font-semibold">
              <li>
                <Link href="/apply" className="rounded hover:text-sun">
                  Apply as a hacker
                </Link>
              </li>
              <li>
                <Link href="/partner" className="rounded hover:text-sun">
                  Partner with us
                </Link>
              </li>
              {event.contactEmail && (
                <li>
                  <a href={`mailto:${event.contactEmail}`} className="rounded hover:text-sun">
                    {event.contactEmail}
                  </a>
                </li>
              )}
              {event.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="rounded hover:text-sun">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* sticker sheet */}
        <div aria-hidden className="mt-14 flex flex-wrap items-center justify-center gap-4 border-t border-cream/10 pt-10 sm:gap-6">
          {sheet.map((n, i) => (
            <Icon key={n} name={n} className="diecut wiggle-hover h-12 w-12 sm:h-14 sm:w-14" style={{ rotate: `${[-10, 8, -4, 12, -8, 6, -12, 4][i]}deg` }} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/schools"
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-1.5 text-sm font-semibold text-cream/75 transition-colors hover:border-sun hover:text-sun"
          >
            School Resources <span aria-hidden>→</span>
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-cream/50">
          © {event.year} Hack 876 · Made in Kingston
        </p>
      </div>
    </footer>
  );
}
