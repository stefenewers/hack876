import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TailLine } from "@/components/art/Marks";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { schoolBriefs } from "@/data/schoolBriefs";

export const metadata: Metadata = {
  title: "School Resources",
  description: "Information for teachers, administrators and school community members helping students participate in Hack 876.",
  alternates: { canonical: "/schools" },
};

export default function SchoolsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="grain relative min-h-dvh bg-cream pt-28 pb-24 sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="eyebrow text-emerald-deep">For schools</p>
          <h1 className="display mt-3 text-[clamp(2.8rem,9vw,4.8rem)] leading-[0.95]">
            School{" "}
            <span className="relative inline-block">
              Resources
              <TailLine className="absolute -bottom-3 left-0 h-5 w-full" />
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2">
            Information for teachers, administrators and school community members helping students participate in Hack 876.
          </p>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {schoolBriefs.map((b) => (
              <li key={b.slug}>
                <Link href={`/schools/${b.slug}`} className="sticker sticker-hover group flex h-full flex-col bg-paper p-6">
                  <div className="flex items-center gap-4">
                    <Image src={b.crest} alt="" width={64} height={64} className="h-16 w-16 shrink-0 object-contain" />
                    <div>
                      <p className="text-xl leading-tight font-extrabold">{b.school}</p>
                      <p className="mt-0.5 text-sm font-semibold text-ink-soft">Participation brief</p>
                    </div>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-extrabold text-emerald-deep">
                    View {b.short} brief <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-xl text-ink-soft">
            Don&rsquo;t see your school? We&rsquo;re adding briefs as conversations with schools begin.{" "}
            <Link href="/partner" className="font-semibold text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
              Get in touch
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
