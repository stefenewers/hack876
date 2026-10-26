import type { ReactNode } from "react";
import { registration } from "@/data/event";

/*
 * Every register button on the site. Students register on MLH, so this is
 * always an external link to `registration.url`, opened in a new tab.
 */
export function RegisterLink({
  long = false,
  className,
  children,
  onClick,
}: {
  /** "Register on MLH" instead of "Register". */
  long?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <a href={registration.url} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      {children ?? (
        <>
          {long ? registration.labelLong : registration.label} <span aria-hidden>→</span>
        </>
      )}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** The line shown near register buttons. */
export function AccountNote({ className = "" }: { className?: string }) {
  return <p className={`text-sm font-semibold ${className}`}>{registration.accountNote}</p>;
}
