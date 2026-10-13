import type { Metadata } from "next";
import Link from "next/link";
import { BirdMark } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { PartnerHub } from "@/components/partnerhub/PartnerHub";
import { event } from "@/data/event";
import { deckCategories, deckRegistry } from "@/data/sponsorDecks/registry";

/*
 * Unlisted directory of sponsor and partner proposals, for people helping with
 * introductions. Anyone with the link can open it; it is not an authenticated
 * area. It is not linked from the public site and is kept out of search, here
 * and via X-Robots-Tag in next.config.ts. Entries come from the deck registry.
 */

export const metadata: Metadata = {
  title: { absolute: "Hack876 Partnership Hub" },
  description: "Prepared proposals for partnership conversations.",
  robots: "noindex, nofollow, noarchive",
  openGraph: null,
  twitter: null,
};

export default function PartnerHubPage() {
  return (
    <div className="min-h-dvh bg-cream text-ink">
      <header className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.4rem]" />
        </Link>
      </header>
      <main id="main" className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <p className="eyebrow text-emerald-deep">For people making introductions</p>
        <h1 className="mt-2 text-[clamp(2.2rem,6vw,3.6rem)] leading-[1] font-extrabold tracking-[-0.04em]">Hack876 Partnership Hub</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
          Find the proposal for an organisation, then share its link or PDF. Each proposal is written for one organisation and opens on
          its own page.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
          Prepared proposals for partnership conversations. Inclusion does not indicate a confirmed partnership. Each proposal is marked by how ready it is to
          forward. That describes the proposal, not the organisation. This page is unlisted, not private.
        </p>
        <div className="mt-8">
          <PartnerHub decks={deckRegistry} categories={deckCategories} siteUrl={event.siteUrl} />
        </div>
        <p className="mt-10 text-sm text-ink-soft">
          Questions about a proposal?{" "}
          {event.contactEmail && (
            <a href={`mailto:${event.contactEmail}`} className="font-bold text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
              {event.contactEmail}
            </a>
          )}
        </p>
      </main>
    </div>
  );
}
