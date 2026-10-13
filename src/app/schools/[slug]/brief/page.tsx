import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SchoolBriefPage } from "@/components/schools/SchoolBriefPage";
import { getSchoolBrief, schoolBriefs } from "@/data/schoolBriefs";

/*
 * The original participation brief (the slide-style pitch and the source of
 * its PDF), kept for schools whose main page has become a hub.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return schoolBriefs.filter((b) => b.hub).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/schools/[slug]/brief">): Promise<Metadata> {
  const brief = getSchoolBrief((await params).slug);
  if (!brief) return {};
  return {
    title: { absolute: `Hack 876 × ${brief.school}: participation brief` },
    description: `The participation brief prepared for ${brief.school}.`,
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
    openGraph: null,
    twitter: null,
  };
}

export default async function SchoolBriefArchiveRoute({ params }: PageProps<"/schools/[slug]/brief">) {
  const brief = getSchoolBrief((await params).slug);
  if (!brief?.hub) notFound();
  return <SchoolBriefPage brief={brief} />;
}
