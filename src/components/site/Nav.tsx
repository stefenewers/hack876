"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { applications, nav } from "@/data/event";
import { Logo } from "@/components/art/Wordmark";
import { BirdMark } from "@/components/art/DoctorBird";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = nav.map((n) => n.href.split("#")[1]).filter(Boolean);
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Mobile menu: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a,button");
        const a = f[0];
        const z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const applyLabel = applications.status === "open" ? "Apply" : "Apply";

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-300 ${
        scrolled || open ? "bg-cream/92 py-2 shadow-[0_2px_0_0_var(--color-ink)] backdrop-blur-md" : "py-3 sm:py-4"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group relative z-10 flex items-center gap-2 rounded-lg" aria-label="Hack 876 home">
          <BirdMark className="h-6 w-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-6" />
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const id = item.href.split("#")[1];
            const isActive = pathname === "/" && active === id;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className="relative rounded-full px-3.5 py-2 text-[0.95rem] font-bold transition-colors hover:bg-ink/5"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 -bottom-0.5 h-[3px] origin-left rounded-full bg-emerald transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="relative z-10 flex items-center gap-2">
          <Link href="/apply" className="btn btn-primary btn-sm">
            {applyLabel}
            <span aria-hidden>→</span>
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border-[2.5px] border-ink bg-paper shadow-[2px_3px_0_0_var(--color-ink)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <g stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" className="transition-transform">
                {open ? (
                  <path d="M5 5 L19 19 M19 5 L5 19" />
                ) : (
                  <path d="M4 7 H20 M4 12 H16 M4 17 H20" />
                )}
              </g>
            </svg>
          </button>
        </div>
      </nav>

    </header>
      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panel}
        hidden={!open}
        className="fixed inset-x-0 top-[3.9rem] bottom-0 z-40 overflow-y-auto overscroll-contain bg-cream px-5 pt-6 pb-10 lg:hidden"
      >
        <ul className="flex flex-col gap-1">
          {nav.map((item, i) => (
            <li key={item.href} className="rise" style={{ ["--d" as string]: `${i * 40}ms` }}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="display flex items-center justify-between border-b-2 border-dashed border-ink/20 py-3 text-4xl"
              >
                {item.label}
                <span aria-hidden className="text-2xl text-emerald">
                  ↘
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/apply" onClick={() => setOpen(false)} className="btn btn-primary w-full text-lg">
            Apply to Hack 876 <span aria-hidden>→</span>
          </Link>
          <Link href="/partner" onClick={() => setOpen(false)} className="btn btn-secondary w-full">
            Partner with us
          </Link>
        </div>
      </div>
    </>
  );
}
