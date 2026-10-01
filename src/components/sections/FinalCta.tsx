import Link from "next/link";
import { HackerPass } from "@/components/art/HackerPass";
import { Icon } from "@/components/art/Icons";
import { BrushEdge, Mark } from "@/components/art/Marks";
import { applications } from "@/data/event";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative mt-10 overflow-x-clip bg-emerald text-white">
      <BrushEdge side="top" color="#12a150" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <div data-reveal className="relative z-10">
          <h2 id="cta-title" className="display text-[clamp(2.8rem,8vw,5.6rem)] leading-[0.95] text-white">
            Bring an idea.
            <br />
            <span className="text-sun">Leave with a prototype.</span>
          </h2>
          <p className="mt-6 max-w-lg text-xl text-white/90">80 spots. One day. Find something worth fixing, then build it.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/apply" className="btn btn-primary px-8 text-lg">
              {applications.status === "open" ? "Apply now" : "Get notified"} <span aria-hidden>→</span>
            </Link>
            <Link href="/#faq" className="btn btn-ghost-dark">
              Read the FAQ
            </Link>
          </div>
        </div>
        <div aria-hidden className="relative mx-auto w-full max-w-[420px]">
          <div className="absolute inset-x-[12%] top-[22%] bottom-[4%] rounded-full bg-emerald-deep" />
          <HackerPass lanyard="var(--color-sun)" className="relative max-w-[18rem] lg:-mt-28" />
          <Icon name="trophy" className="diecut float-slow absolute bottom-2 -left-2 w-16 sm:w-20" style={{ ["--rot" as string]: "-10deg" }} />
          <Mark name="spark" color="#ffc93c" className="absolute top-[30%] right-0 h-10 w-10" />
        </div>
      </div>
    </section>
  );
}
