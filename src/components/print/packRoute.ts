import type { Metadata } from "next";
import { getPrincipalPack, packSchool, principalPacks } from "@/data/principalPacks";

/* Shared by the three /print/principals routes. Private: noindex, never linked. */

export type PackView = "pack" | "letter" | "booklet";

const titles: Record<PackView, string> = {
  pack: "Principal pack",
  letter: "Letter to the Principal",
  booklet: "Information booklet",
};

export const packParams = () => principalPacks.map((p) => ({ slug: p.key }));

export function packMetadata(slug: string, view: PackView): Metadata {
  const pack = getPrincipalPack(slug);
  if (!pack) return {};
  return {
    title: { absolute: `Hack 876 × ${packSchool(pack).name}: ${titles[view]}` },
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
    openGraph: null,
    twitter: null,
  };
}
