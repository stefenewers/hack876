import type { Metadata } from "next";
import { Icon } from "@/components/art/Icons";
import { TailLine } from "@/components/art/Marks";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { eligibility, schools } from "@/data/event";

export const metadata: Metadata = {
  title: "Partner with us",
  description: "Support Hack 876, a one-day hackathon for secondary-school students in Kingston, Jamaica.",
};

export default function PartnerPage() {
  return (
    <>
      <Nav />
      <main id="main" className="grain relative min-h-dvh bg-cream pt-28 pb-24 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="eyebrow text-emerald-deep">Partner with us</p>
          <h1 className="display mt-3 text-[clamp(2.8rem,9vw,4.8rem)] leading-[0.95]">
            Help students{" "}
            <span className="relative inline-block">
              build it.
              <TailLine className="absolute -bottom-3 left-0 h-5 w-full" />
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2">
            Hack 876 brings {eligibility.maxHackers} students from {schools.length} Kingston schools together for one day
            of building. Partners make that day happen, through funding, mentors, judges, prizes, food, or hardware.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: "people", t: "Meet Jamaica’s next builders" },
              { icon: "board", t: "Put your team in the room as mentors or judges" },
              { icon: "trophy", t: "Back a prize or a track" },
            ].map((x, i) => (
              <li key={x.t} className="sticker flex items-center gap-3 bg-paper p-4 font-bold" style={{ rotate: `${[-1.5, 1, -1][i]}deg` }}>
                <Icon name={x.icon} className="h-10 w-10 shrink-0" />
                {x.t}
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <PartnerForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
