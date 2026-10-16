import { notFound } from "next/navigation";
import { PrincipalLetter } from "@/components/print/PrincipalLetter";
import { packMetadata, packParams } from "@/components/print/packRoute";
import { getPrincipalPack } from "@/data/principalPacks";

/* The one-page cover letter to a principal. */

export const dynamicParams = false;
export const generateStaticParams = packParams;

export async function generateMetadata({ params }: PageProps<"/print/principals/[slug]/letter">) {
  return packMetadata((await params).slug, "letter");
}

export default async function PrincipalLetterPage({ params }: PageProps<"/print/principals/[slug]/letter">) {
  const pack = getPrincipalPack((await params).slug);
  if (!pack) notFound();
  return (
    <main id="main" className="pp-stage">
      <PrincipalLetter pack={pack} />
    </main>
  );
}
