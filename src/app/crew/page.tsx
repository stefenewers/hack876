import type { Metadata } from "next";
import Link from "next/link";
import { Mark, TailLine } from "@/components/art/Marks";
import { CrewForm } from "@/components/forms/CrewForm";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { crewCodeMatches, crewOpen } from "@/lib/crewCode";

/* Invite-only sign-up for the Hack 876 Crew. Unlisted: not in the nav, footer or sitemap, and noindex here and in next.config.ts. */

export const metadata: Metadata = {
  title: "Join the crew",
  description: "Sign up to help make Hack 876 happen.",
  robots: "noindex, nofollow, noarchive",
  openGraph: {
    title: "Join the Hack 876 crew",
    description: "Tell us who you are, how much time you’ve got, and where you could really move the needle.",
    url: "/crew",
    siteName: "Hack 876",
    locale: "en_JM",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Join the Hack 876 crew", description: "Sign up to help make Hack 876 happen." },
};

export default async function CrewPage(props: PageProps<"/crew">) {
  const { k } = await props.searchParams;
  const open = crewOpen();
  const code = typeof k === "string" ? k.trim() : "";
  const unlocked = open && crewCodeMatches(code);

  return (
    <>
      <Nav />
      <main id="main" className="grain relative min-h-dvh bg-cream pt-28 pb-24 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="eyebrow text-emerald-deep">For the Hack 876 crew</p>
          <h1 className="display mt-3 text-[clamp(2.8rem,9vw,4.8rem)] leading-[0.95]">
            Join the{" "}
            <span className="relative inline-block">
              crew.
              <TailLine className="absolute -bottom-3 left-0 h-5 w-full" />
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2">
            You&rsquo;re one of the people making Hack 876 happen. Tell us who you are, how much time you&rsquo;ve got, and where you could
            really move the needle. Takes a minute.
          </p>
          <div className="mt-14">
            {open ? (
              /* Only a valid code ever reaches the browser, and only because it is already in the person's URL. */
              <CrewForm unlocked={unlocked} code={unlocked ? code : undefined} />
            ) : (
              <div className="rounded-[2rem] border-[3px] border-ink bg-paper p-8 text-center shadow-[6px_8px_0_0_var(--color-ink)]">
                <Mark name="spark" color="#ef3b2d" className="mx-auto h-10 w-10" />
                <h2 className="display mt-4 text-4xl">Crew sign-up isn&rsquo;t open right now.</h2>
                <p className="mx-auto mt-3 max-w-md text-lg text-ink-2">Check the WhatsApp group for when it opens.</p>
                <Link href="/" className="btn btn-secondary mt-6">
                  Back to Hack 876
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
