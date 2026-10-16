import { notFound } from "next/navigation";
import { PrincipalBooklet } from "@/components/print/PrincipalBooklet";
import { packMetadata, packParams } from "@/components/print/packRoute";
import { getPrincipalPack } from "@/data/principalPacks";

/* The eight-page information booklet for a principal. */

export const dynamicParams = false;
export const generateStaticParams = packParams;

export async function generateMetadata({ params }: PageProps<"/print/principals/[slug]/booklet">) {
  return packMetadata((await params).slug, "booklet");
}

export default async function PrincipalBookletPage({ params }: PageProps<"/print/principals/[slug]/booklet">) {
  const pack = getPrincipalPack((await params).slug);
  if (!pack) notFound();
  return (
    <main id="main" className="pp-stage">
      <PrincipalBooklet pack={pack} />
    </main>
  );
}
