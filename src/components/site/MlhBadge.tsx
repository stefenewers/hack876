import Image from "next/image";
import { mlh } from "@/data/event";

/**
 * "An official MLH Hack Day" with the official MLH logo, unaltered, on a white
 * backing (MLH's brand rules: no dark or busy background behind the logo).
 * Links to MLH. Used in the hero and the footer.
 */
export function MlhBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={mlh.siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 rounded-2xl bg-white py-2 pr-4 pl-3 text-ink ${className}`}
    >
      <Image src={mlh.logo} alt="Major League Hacking (MLH)" width={311} height={131} unoptimized className="h-8 w-auto" />
      <span className="text-sm font-bold">{mlh.hackDayBadge}</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
