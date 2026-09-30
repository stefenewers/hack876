import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat_Brush, Permanent_Marker } from "next/font/google";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { event } from "@/data/event";
import "./globals.css";

const marker = Permanent_Marker({
  variable: "--font-marker",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat_Brush({
  variable: "--font-caveat",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${event.name} · ${event.tagline}`,
    template: `%s · ${event.name}`,
  },
  description: event.shortDescription,
  openGraph: {
    title: `${event.name} · ${event.city} · ${event.year}`,
    description: event.shortDescription,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fbf4e6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-JM"
      // Lets Next.js switch off smooth scrolling while it resets scroll on navigation.
      data-scroll-behavior="smooth"
      className={`${marker.variable} ${bricolage.variable} ${caveat.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Flag JS early so reveal animations never hide content for no-JS visitors. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="btn btn-primary btn-sm sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to content
        </a>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
