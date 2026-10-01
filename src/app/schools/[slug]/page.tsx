import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SchoolBriefPage } from "@/components/schools/SchoolBriefPage";
import { getSchoolBrief, schoolBriefs } from "@/data/schoolBriefs";

/*
 * Private school participation briefs. Reachable from /schools, but kept out
 * of search: they name a community liaison and carry provisional numbers.
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
    description: `A participation brief for the ${brief.short} community.`,
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
  return <SchoolBriefPage brief={brief} />;
}
