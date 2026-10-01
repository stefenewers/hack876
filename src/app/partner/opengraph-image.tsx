import { siteOgImage } from "@/lib/og";

export const alt = "Hack 876: a one-day hackathon for Jamaican secondary-school students.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return siteOgImage();
}
