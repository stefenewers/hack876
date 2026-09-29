import type { Metadata } from "next";
import Link from "next/link";
import { DoctorBird } from "@/components/art/DoctorBird";
import { Mark, TailLine } from "@/components/art/Marks";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { applications, eligibility } from "@/data/event";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to Hack 876, a one-day hackathon for secondary-school students in Kingston, Jamaica.",
};

export default function ApplyPage() {
  const open = applications.status === "open";

  return (
    <>
      <Nav />
      <main id="main" className="grain relative min-h-dvh bg-cream pt-28 pb-24 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute top-24 -right-24 -z-10 h-80 w-80 rounded-full bg-sky-light sm:h-[28rem] sm:w-[28rem]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <header className="relative">
            <div aria-hidden className="absolute -top-10 right-0 w-28 sm:-top-16 sm:-right-10 sm:w-44">
              <div className="bird-bob">
                <DoctorBird className="w-full" />
              </div>
            </div>
            <p className="eyebrow text-emerald-deep">Applications {open ? "open" : applications.status === "closed" ? "closed" : "coming soon"}</p>
            <h1 className="display mt-3 max-w-[12ch] text-[clamp(3rem,10vw,5.2rem)] leading-[0.92]">
              Apply to{" "}
              <span className="relative inline-block">
                Hack 876
                <TailLine className="absolute -bottom-3 left-0 h-5 w-full" />
              </span>
            </h1>

            {open && (
              <>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2">
                  Participating schools recommend students, and recommended students apply here. Open to{" "}
                  {eligibility.forms}. It takes about 10 minutes.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {["No résumé", "No GitHub needed", "No coding experience needed", "No team needed"].map((t, i) => (
                    <li key={t} className="chip" style={{ rotate: `${i % 2 ? 1.5 : -1.5}deg` }}>
                      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
                        <path d="M4 13 L9.5 18 L20 6" stroke="#12a150" strokeWidth={3.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {t}
                    </li>
                  ))}
                </ul>
                {applications.deadline && (
                  <p className="mt-6 font-bold">
                    Deadline: <time dateTime={applications.deadline}>{applications.deadline}</time>
                  </p>
                )}
              </>
            )}
          </header>

          <div className="mt-16">
            {open ? (
              <>
                <noscript>
                  <p className="mb-6 rounded-2xl border-[2.5px] border-ink bg-sun-light p-4 font-semibold">
                    The application form needs JavaScript. Please enable it, or try another browser.
                  </p>
                </noscript>
                <ApplyForm />
              </>
            ) : (
              <div className="rounded-[2rem] border-[3px] border-ink bg-paper p-8 text-center shadow-[6px_8px_0_0_var(--color-ink)]">
                <Mark name="spark" color="#ef3b2d" className="mx-auto h-10 w-10" />
                <h2 className="display mt-4 text-4xl">
                  {applications.status === "closed" ? "Applications are closed." : "Applications open soon."}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-lg text-ink-2">
                  {applications.status === "closed"
                    ? "Thanks to everyone who applied. See you at Hack 876."
                    : "Your school will let you know when it’s time. In the meantime, start noticing things that should work better."}
                </p>
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
