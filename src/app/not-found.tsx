import Link from "next/link";
import { DoctorBird } from "@/components/art/DoctorBird";
import { Nav } from "@/components/site/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="grain grid min-h-dvh place-items-center bg-cream px-4 pt-24 pb-16 text-center">
        <div>
          <div className="mx-auto w-52 -scale-x-100">
            <div className="bird-bob">
              <DoctorBird className="w-full" />
            </div>
          </div>
          <p className="display mt-6 text-7xl">404</p>
          <h1 className="display mt-2 text-3xl sm:text-4xl">This page flew off.</h1>
          <p className="mx-auto mt-3 max-w-sm text-lg text-ink-2">Something that should exist, doesn&rsquo;t. Yet.</p>
          <Link href="/" className="btn btn-primary mt-8">
            Back to Hack 876
          </Link>
        </div>
      </main>
    </>
  );
}
