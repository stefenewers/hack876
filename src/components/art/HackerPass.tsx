import { DoctorBird } from "./DoctorBird";
import { Logo } from "./Wordmark";
import { event } from "@/data/event";

/**
 * A Hack 876 "Hacker" conference pass hanging from a lanyard. Decorative.
 * `lanyard` sets the strap colour so it reads on any background.
 */
export function HackerPass({ lanyard = "var(--color-emerald)", className = "" }: { lanyard?: string; className?: string }) {
  return (
    <div aria-hidden className={`mx-auto flex w-full max-w-[17rem] flex-col items-center ${className}`}>
      {/* Lanyard */}
      <div className="flex h-24 w-full justify-center print:h-20">
        <span className="h-full w-4 skew-x-[18deg] border-x-2 border-ink" style={{ background: lanyard }} />
        <span className="h-full w-4 -skew-x-[18deg] border-x-2 border-ink" style={{ background: lanyard }} />
      </div>
      <div className="pass-sway -mt-2 w-full">
        <div className="mx-auto h-5 w-10 rounded-t-md border-2 border-b-0 border-ink bg-[#c9ccca]" />
        <div className="overflow-hidden rounded-2xl border-[3px] border-ink bg-paper text-ink shadow-[5px_6px_0_0_var(--color-ink)]">
          <div className="flex items-center justify-between bg-ink px-4 py-3 text-cream">
            <Logo className="text-[1.35rem]" />
            <span className="font-mono text-[0.62rem] font-bold tracking-[0.16em]">KINGSTON · {event.year}</span>
          </div>
          <div className="px-5 pt-5 pb-4">
            <p className="font-mono text-[0.62rem] font-bold tracking-[0.18em] text-ink-soft">PASS TYPE</p>
            <p className="display mt-1 text-[2.6rem] leading-none text-[#e0600a]">Hacker</p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[0.62rem] font-bold tracking-[0.18em] text-ink-soft">HACKATHONS</p>
                <p className="mt-1 text-3xl leading-[0.9] font-extrabold tracking-[-0.05em] tabular-nums">#001</p>
              </div>
              <DoctorBird flutter={false} tail={false} className="h-14 w-16" />
            </div>
            <div className="pass-barcode mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
