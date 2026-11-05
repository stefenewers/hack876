import type { HubStatus } from "@/data/schoolHub";

/* One look per fact status, shared by the hub, the FAQ search and the printable sheets. */

export const statusClass: Record<HubStatus, string> = {
  confirmed: "border-ink bg-mint text-emerald-dark",
  pending: "border-ink bg-sun-light text-ink",
  later: "border-ink bg-sky-light text-ink",
  school: "border-dashed border-ink/60 bg-cream text-ink",
};

export const sheetPillClass: Record<HubStatus, string> = { confirmed: "bg-mint", pending: "bg-sun-light", later: "bg-sky-light", school: "bg-cream" };
