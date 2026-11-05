import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SchoolSheet } from "@/components/schools/SchoolSheet";
import { getSchoolBrief, isHub, schoolHubs } from "@/data/schoolBriefs";
import { schoolSheets, type SheetKey } from "@/data/schoolHub";

/* Printable one-page sheets for confirmed schools' hubs. The PDFs in /public/proposals are printed from these (npm run print:schools). */

export const dynamicParams = false;

export function generateStaticParams() {
  return schoolHubs.flatMap((b) => schoolSheets(b).map((s) => ({ slug: b.slug, sheet: s.key })));
}

export async function generateMetadata({ params }: PageProps<"/schools/[slug]/sheets/[sheet]">): Promise<Metadata> {
  const { slug, sheet } = await params;
  const brief = getSchoolBrief(slug);
  const def = brief && schoolSheets(brief).find((s) => s.key === sheet);
  if (!brief || !def) return {};
  return {
    title: { absolute: `Hack 876 × ${brief.school}: ${def.title}` },
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
    openGraph: null,
    twitter: null,
  };
}

export default async function SchoolSheetRoute({ params }: PageProps<"/schools/[slug]/sheets/[sheet]">) {
  const { slug, sheet } = await params;
  const brief = getSchoolBrief(slug);
  if (!brief || !isHub(brief) || !schoolSheets(brief).some((s) => s.key === sheet)) notFound();
  return <SchoolSheet brief={brief} sheet={sheet as SheetKey} />;
}
