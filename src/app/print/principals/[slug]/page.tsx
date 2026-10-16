import { notFound } from "next/navigation";
import { PrincipalBooklet } from "@/components/print/PrincipalBooklet";
import { PrincipalLetter } from "@/components/print/PrincipalLetter";
import { packMetadata, packParams } from "@/components/print/packRoute";
import { getPrincipalPack } from "@/data/principalPacks";

/* The full principal pack: the letter, then the booklet. Printed by scripts/print-principal-packs.mjs. */

export const dynamicParams = false;
export const generateStaticParams = packParams;

export async function generateMetadata({ params }: PageProps<"/print/principals/[slug]">) {
  return packMetadata((await params).slug, "pack");
}

export default async function PrincipalPackPage({ params }: PageProps<"/print/principals/[slug]">) {
  const pack = getPrincipalPack((await params).slug);
  if (!pack) notFound();
  return (
    <main id="main" className="pp-stage">
      <PrincipalLetter pack={pack} />
      <PrincipalBooklet pack={pack} />
    </main>
  );
}
