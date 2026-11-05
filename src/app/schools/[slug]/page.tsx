import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SchoolBriefPage } from "@/components/schools/SchoolBriefPage";
import { SchoolHubPage } from "@/components/schools/SchoolHubPage";
import { eventWhen, venue } from "@/data/event";
import { getSchoolBrief, isHub, isPitch, schoolBriefs } from "@/data/schoolBriefs";
import { formsFor, mediaHref } from "@/data/schoolHub";

/*
 * A school's page. For a confirmed school (event.ts `confirmedSchools`, with
 * `hub` set) it is the participation hub, and any pitch it was sent lives on
 * at /schools/<slug>/brief. For any other school it is that school's
 * participation brief, reachable by direct link only. Kept out of search: these
 * pages name a liaison and carry provisional numbers. Hubs still get a full
 * link preview for WhatsApp and email; briefs get none.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return schoolBriefs.filter((b) => isHub(b) || isPitch(b)).map((b) => ({ slug: b.slug }));
}

const noindex = { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } };

export async function generateMetadata({ params }: PageProps<"/schools/[slug]">): Promise<Metadata> {
  const brief = getSchoolBrief((await params).slug);
  if (!brief) return {};
  const title = `Hack 876 × ${brief.school}`;
  if (!isHub(brief)) {
    return { title: { absolute: title }, description: `A participation brief for the ${brief.short} community.`, robots: noindex, openGraph: null, twitter: null };
  }
  const description = `${brief.school} is taking part in Hack 876, ${eventWhen.long} at the ${venue.name}, Kingston. Free for students in ${formsFor(brief)}. Everything students, parents, teachers and ambassadors need, and how to register.`;
  const image = { url: mediaHref(brief, "og"), width: 1200, height: 630, alt: `Hack 876 × ${brief.school}: confirmed participating school.` };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/schools/${brief.slug}` },
    robots: noindex,
    openGraph: { type: "website", title, description, url: `/schools/${brief.slug}`, siteName: "Hack 876", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export default async function SchoolRoute({ params }: PageProps<"/schools/[slug]">) {
  const brief = getSchoolBrief((await params).slug);
  if (!brief) notFound();
  if (isHub(brief)) return <SchoolHubPage brief={brief} />;
  if (isPitch(brief)) return <SchoolBriefPage brief={brief} />;
  notFound();
}
