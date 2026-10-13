import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SchoolBriefPage } from "@/components/schools/SchoolBriefPage";
import { SchoolHubPage } from "@/components/schools/SchoolHubPage";
import { getSchoolBrief, schoolBriefs } from "@/data/schoolBriefs";

/*
 * A school's page. It starts as a participation brief (a pitch) and becomes a
 * participation hub once the school's entry has `hub` set; the brief then
 * lives on at /schools/<slug>/brief. Reachable from /schools, but kept out of
 * search: these pages name a liaison and carry provisional numbers.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return schoolBriefs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/schools/[slug]">): Promise<Metadata> {
  const brief = getSchoolBrief((await params).slug);
  if (!brief) return {};
  const title = `Hack 876 × ${brief.school}`;
  return {
    title: { absolute: title },
    description: brief.hub
      ? `Everything ${brief.short} students, parents and teachers need to know about Hack 876.`
      : `A participation brief for the ${brief.short} community.`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
    openGraph: null,
    twitter: null,
  };
}

export default async function SchoolBriefRoute({ params }: PageProps<"/schools/[slug]">) {
  const brief = getSchoolBrief((await params).slug);
  if (!brief) notFound();
  return brief.hub ? <SchoolHubPage brief={brief} /> : <SchoolBriefPage brief={brief} />;
}
