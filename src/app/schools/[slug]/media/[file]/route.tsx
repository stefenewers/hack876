import { notFound } from "next/navigation";
import { getSchoolBrief, isHub, schoolHubs } from "@/data/schoolBriefs";
import { mediaFile, mediaVariants } from "@/data/schoolHub";
import { schoolGraphic, schoolQrPng } from "@/lib/schoolMedia";

/*
 * Share graphics and the QR code for each confirmed school's hub, e.g.
 * /schools/campion/media/hack876-campion-story.png. Prerendered at build time
 * for every hub, so every download link on a hub points at a real file.
 */

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return schoolHubs.flatMap((b) => mediaVariants.map((v) => ({ slug: b.slug, file: mediaFile(b, v.key) })));
}

export async function GET(_req: Request, { params }: RouteContext<"/schools/[slug]/media/[file]">) {
  const { slug, file } = await params;
  const brief = getSchoolBrief(slug);
  const variant = brief && isHub(brief) ? mediaVariants.find((v) => mediaFile(brief, v.key) === file) : undefined;
  if (!brief || !variant) notFound();
  return variant.key === "qr" ? schoolQrPng(brief) : schoolGraphic(brief, variant.key);
}
