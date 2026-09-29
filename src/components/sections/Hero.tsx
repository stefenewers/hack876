"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { BIRD_VIEWBOX, DoctorBird, TAIL_BASE } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { Mark } from "@/components/art/Marks";
import { Wordmark } from "@/components/art/Wordmark";
import { useReducedMotion } from "@/components/motion/hooks";
import { applications, event } from "@/data/event";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const birdRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const tailA = useRef<SVGPathElement>(null);
  const tailB = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const hero = heroRef.current;
    const bird = birdRef.current;
    const follow = followRef.current;
    const mark = markRef.current;
    const svg = svgRef.current;
    if (!hero || !bird || !follow || !mark || !svg || !tailA.current || !tailB.current) return;

    // Pointer follow: target offset for the bird, and a lagging copy for the tail bend.
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const lag = { x: 0, y: 0 };
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = hero.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 36;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 28;
    };

    const draw = (t: number) => {
      const h = hero.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${h.width} ${h.height}`);

      const b = bird.getBoundingClientRect();
      const sx = b.left - h.left + (TAIL_BASE.x / BIRD_VIEWBOX.w) * b.width;
      const sy = b.top - h.top + (TAIL_BASE.y / BIRD_VIEWBOX.h) * b.height;

      const m = mark.getBoundingClientRect();
      const ey = m.bottom - h.top + Math.max(6, m.height * 0.06);
      const ex = m.left - h.left - Math.min(40, m.width * 0.06);
      const mid = m.left - h.left + m.width * 0.55;

      // Wave + lag give the streamers a hovering, trailing feel.
      const w1 = reduced ? 0 : Math.sin(t * 1.6) * 14;
      const w2 = reduced ? 0 : Math.cos(t * 1.1) * 10;
      const lx = -lag.x * 1.6;
      const ly = -lag.y * 1.6;

      // First control point swings right of the wordmark so the streamers never cut through the letters.
      const cx = Math.max(sx - 30, m.right - h.left + 30);
      const dA = `M ${sx} ${sy} C ${cx + lx} ${sy + 140 + w1 + ly}, ${mid + 120 + w2} ${ey + 10 + w1 * 0.4}, ${mid} ${ey} S ${ex + 60} ${ey - 16 + w2 * 0.5}, ${ex} ${ey + 4}`;
      const dB = `M ${sx + 8} ${sy + 4} C ${cx + 40 + lx} ${sy + 170 - w1 + ly}, ${mid + 150 - w2} ${ey + 26 - w1 * 0.3}, ${mid - 10} ${ey + 16} S ${ex + 70} ${ey + 2 - w2 * 0.4}, ${ex + 16} ${ey + 20}`;
      tailA.current!.setAttribute("d", dA);
      tailB.current!.setAttribute("d", dB);
    };

    const loop = (now: number) => {
      const t = (now - start) / 1000;
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      lag.x += (pos.x - lag.x) * 0.04;
      lag.y += (pos.y - lag.y) * 0.04;
      follow.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${pos.x * 0.12}deg)`;
      draw(t);
      if (visible) raf = requestAnimationFrame(loop);
    };

    // Kick off the streamer draw-in slightly after the bird starts flying.
    const drawTimer = window.setTimeout(() => {
      tailA.current?.classList.add("is-in");
      tailB.current?.classList.add("is-in");
    }, reduced ? 0 : 650);

    if (reduced) {
      draw(0);
      const onResize = () => draw(0);
      window.addEventListener("resize", onResize);
      document.fonts?.ready.then(() => draw(0));
      return () => {
        window.clearTimeout(drawTimer);
        window.removeEventListener("resize", onResize);
      };
    }

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) raf = requestAnimationFrame(loop);
    });
    io.observe(hero);
    hero.addEventListener("pointermove", onPointer);
    raf = requestAnimationFrame(loop);

    return () => {
      window.clearTimeout(drawTimer);
      cancelAnimationFrame(raf);
      io.disconnect();
      hero.removeEventListener("pointermove", onPointer);
    };
  }, [reduced]);

  const applyOpen = applications.status === "open";

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-title"
      className="grain relative overflow-hidden bg-cream pt-24 sm:pt-28 lg:min-h-[min(100svh,960px)]"
    >
      {/* Soft sky disc + a few hand marks behind everything */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[6%] -right-[10%] h-[70vw] max-h-[760px] w-[70vw] max-w-[760px] rounded-full bg-sky-light sm:top-[4%] lg:right-[-4%]" />
        <div className="absolute top-[18%] right-[8%] h-[34vw] max-h-[360px] w-[34vw] max-w-[360px] rounded-full bg-sun-light/70" />
      </div>

      {/* Streamers overlay (drawn by JS; sits above the sky, below the text) */}
      <svg ref={svgRef} aria-hidden className="pointer-events-none absolute inset-0 z-0 h-full w-full" overflow="visible">
        <path ref={tailA} pathLength={1} className="tail-draw" fill="none" stroke="#141716" strokeWidth={7} strokeLinecap="round" />
        <path
          ref={tailB}
          pathLength={1}
          className="tail-draw"
          style={{ "--draw-delay": "90ms" } as CSSProperties}
          fill="none"
          stroke="#12a150"
          strokeWidth={7}
          strokeLinecap="round"
        />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-0 lg:px-8">
        {/* Copy */}
        <div className="order-2 pb-40 sm:pb-52 lg:order-1 lg:pt-10 lg:pb-52">
          <p className="eyebrow rise relative z-10 mb-3 -ml-3 inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-ink-soft" style={{ "--d": "0.2s" } as CSSProperties}>
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-bill" />
            {event.city} · {event.year}
          </p>

          <div ref={markRef} className="relative inline-block">
            <Wordmark as="h1" id="hero-title" animate className="text-[clamp(4.2rem,17vw,11.5rem)]" />
          </div>

          <p
            className="display rise mt-8 max-w-xl text-[clamp(2rem,6.4vw,3.6rem)] leading-[1.02] sm:mt-10"
            style={{ "--d": "1s" } as CSSProperties}
          >
            Build something
            <br />
            <span className="relative inline-block">
              that should exist.
              <Mark name="spark" color="#ef3b2d" className="absolute -top-5 -right-9 h-8 w-8 sm:-right-10" />
            </span>
          </p>

          <p className="rise mt-5 max-w-md text-lg leading-relaxed text-ink-2" style={{ "--d": "1.15s" } as CSSProperties}>
            One day. One team. Make something real. A hackathon for secondary-school students across Kingston.
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-3 sm:gap-4" style={{ "--d": "1.3s" } as CSSProperties}>
            <Link href="/apply" className="btn btn-primary px-7 text-lg">
              {applyOpen ? "Apply" : "Get notified"} <span aria-hidden>→</span>
            </Link>
            <Link href="#about" className="btn btn-secondary">
              Learn more
            </Link>
            <Link
              href="/partner"
              className="ml-1 rounded font-bold underline decoration-emerald decoration-[3px] underline-offset-4 hover:decoration-bill"
            >
              Partner with us
            </Link>
          </div>
        </div>

        {/* Bird + stickers */}
        <div className="relative order-1 h-[250px] sm:h-[340px] lg:order-2 lg:h-auto">
          <div
            ref={birdRef}
            className="hero-bird-in absolute top-0 right-[-8%] w-[min(68vw,280px)] sm:right-[4%] sm:w-[420px] lg:top-[4%] lg:right-[-6%] lg:w-[min(46vw,600px)]"
          >
            <div ref={followRef} className="will-change-transform">
              <div className="bird-bob">
                <DoctorBird tail={false} title="The Hack 876 Doctor Bird, hovering" className="w-full drop-shadow-[6px_8px_0_rgba(20,23,22,0.12)]" />
              </div>
            </div>
          </div>

          {/* scattered stickers */}
          <div aria-hidden className="pointer-events-none">
            <StickerNote className="rise float-slow absolute top-[62%] left-[4%] hidden w-36 sm:block lg:top-[66%] lg:left-[10%] lg:w-40" rot={-8} d="1.4s" />
            <div className="rise absolute top-[62%] right-[10%] hidden sm:block lg:top-[70%] lg:right-[4%]" style={{ "--d": "1.55s" } as CSSProperties}>
              <Icon name="patty" className="diecut float-slow h-16 w-16 lg:h-20 lg:w-20" style={{ "--rot": "10deg" } as CSSProperties} />
            </div>
            <div className="rise absolute top-[4%] left-[4%] w-12 sm:w-auto lg:top-[48%] lg:left-[30%]" style={{ "--d": "1.6s" } as CSSProperties}>
              <Icon name="lignum" className="diecut float-slow h-12 w-12 sm:h-16 sm:w-16" style={{ "--rot": "-12deg" } as CSSProperties} />
            </div>
          </div>
        </div>
      </div>

      <Mountains />
    </section>
  );
}

function StickerNote({ className, rot, d }: { className: string; rot: number; d: string }) {
  return (
    <div className={className} style={{ "--rot": `${rot}deg`, "--d": d } as CSSProperties}>
      <svg viewBox="0 0 120 120" className="diecut w-full">
        <path d="M6 8 H114 V92 L90 114 H6 Z" fill="#ffc93c" stroke="#141716" strokeWidth={3.5} strokeLinejoin="round" />
        <path d="M90 114 V92 H114" fill="#e6ad24" stroke="#141716" strokeWidth={3.5} strokeLinejoin="round" />
        <text x="18" y="46" fontFamily="var(--font-caveat)" fontSize="25" fill="#141716">
          fix this
        </text>
        <text x="18" y="76" fontFamily="var(--font-caveat)" fontSize="25" fill="#141716">
          → build it
        </text>
      </svg>
    </div>
  );
}

/** Layered Blue Mountains silhouette that melts into the dark band below. */
function Mountains() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[110px] w-full sm:h-[170px] lg:h-[220px]"
    >
      <path d="M0 120 C 120 80, 200 60, 300 90 C 380 112, 440 50, 560 44 C 680 38, 720 96, 820 88 C 920 80, 980 30, 1100 36 C 1220 42, 1320 90, 1440 70 V220 H0 Z" fill="#7bc96f" />
      <path d="M0 150 C 110 120, 220 108, 330 128 C 440 148, 520 96, 640 100 C 760 104, 820 150, 940 140 C 1060 130, 1140 92, 1260 104 C 1350 112, 1400 130, 1440 124 V220 H0 Z" fill="#12a150" />
      <path d="M0 176 C 120 160, 240 150, 360 166 C 480 182, 600 150, 720 156 C 840 162, 960 186, 1080 176 C 1200 166, 1320 150, 1440 162 V220 H0 Z" fill="#0a5c33" />
      <path d="M0 204 C 160 190, 300 186, 460 196 C 620 206, 760 186, 920 190 C 1080 194, 1240 206, 1440 196 V220 H0 Z" fill="#141716" />
    </svg>
  );
}
