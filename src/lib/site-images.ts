import type { StaticImageData } from "next/image";

import sheniLisi from "@/components/sheni-lisi.jpg";
import sheniLisi1 from "@/components/sheni-lisi1.jpg";
import sheniSamgor from "@/components/sheni-samgor.jpg";
import sheniSamgor1 from "@/components/sheni-samgor1.jpg";
import sheniUnivQucha from "@/components/sheni-univ-qucha.jpg";

export const siteImages = {
  "sheni-lisi": sheniLisi,
  "sheni-lisi1": sheniLisi1,
  "sheni-samgor": sheniSamgor,
  "sheni-samgor1": sheniSamgor1,
  "sheni-univ-qucha": sheniUnivQucha,
} as const;

export type SiteImageKey = keyof typeof siteImages;

export function resolveSiteImage(src: string): string | StaticImageData {
  if (src in siteImages) {
    return siteImages[src as SiteImageKey];
  }

  return src;
}
