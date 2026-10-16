import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { BirdMark } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { event } from "@/data/event";
import { letterCopy, type PrincipalPack } from "@/data/principalPacks";
import "./principal-print.css";

/*
 * The one-page cover letter to a principal. All copy comes from letterCopy(),
 * so the tests check exactly what prints. Signatures are left blank for ink
 * unless a scanned signature is placed in public/print/signatures/.
 */

const signatureFile = (name: string) => `/print/signatures/${name.toLowerCase().replace(/\s+/g, "-")}.png`;
const hasFile = (publicPath: string) => existsSync(path.join(process.cwd(), "public", publicPath));

export function PrincipalLetter({ pack }: { pack: PrincipalPack }) {
  const c = letterCopy(pack);
  const site = event.siteUrl.replace(/^https?:\/\/(www\.)?/, "");
  return (
    <article className="pp-page pp-letter" aria-label="Letter to the Principal">
      <header className="pp-letterhead">
        <div className="flex items-center gap-[6pt]">
          <BirdMark className="h-[22pt] w-[36pt]" />
          <Logo className="!text-[22pt]" />
        </div>
        <p className="pp-letterhead-contact">
          {site} · {event.contactEmail}
        </p>
      </header>

      <div className="pp-refline">
        <p>{c.ref}</p>
        <p>{c.date}</p>
      </div>

      <p className="pp-byhand">BY HAND</p>
      <address className="pp-address not-italic">
        {c.address.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </address>

      <p className="pp-salutation">{c.salutation}</p>
      <p className="pp-subject">{c.subject}</p>

      <div className="pp-letter-body">
        {c.paragraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>

      <p className="pp-close">{c.close}</p>
      <div className="pp-signatures">
        {c.signatories.map((s) => {
          const file = signatureFile(s.name);
          return (
            <div key={s.name}>
              <div className="pp-sign-space">{hasFile(file) && <Image src={file} alt="" width={300} height={110} unoptimized />}</div>
              <p className="pp-sign-name">{s.name}</p>
              <p>{s.title}</p>
            </div>
          );
        })}
      </div>

      <div className="pp-enc">
        <p>{c.enc}</p>
        {c.cc && <p>{c.cc}</p>}
      </div>
    </article>
  );
}
