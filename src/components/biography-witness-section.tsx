"use client";

import { User } from "lucide-react";
import { useMemo } from "react";
import type { StaticImageData } from "next/image";

import RadialOrbitalTimeline, {
  type TimelineItem,
} from "@/components/ui/radial-orbital-timeline";

export type WitnessMoment = {
  id: string;
  name: string;
  quote: string;
  date?: string;
  relatedMomentIds?: string[];
  image?: {
    src: StaticImageData;
    alt: string;
    aspectClass?: string;
  };
};

type BiographyWitnessSectionProps = {
  description: string;
  moments: WitnessMoment[];
  eraLabel?: string;
};

function mapMomentsToTimeline(moments: WitnessMoment[]): TimelineItem[] {
  const idToIndex = new Map(moments.map((moment, index) => [moment.id, index + 1]));

  return moments.map((moment, index) => ({
    id: index + 1,
    title: moment.name,
    date: moment.date ?? String(index + 1).padStart(2, "0"),
    content: moment.quote,
    category: "ჩანაწერი",
    icon: User,
    relatedIds: (moment.relatedMomentIds ?? [])
      .map((momentId) => idToIndex.get(momentId))
      .filter((momentIndex): momentIndex is number => momentIndex !== undefined),
    status: "completed",
    image: moment.image
      ? { src: moment.image.src, alt: moment.image.alt }
      : undefined,
  }));
}

export function BiographyWitnessSection({
  description,
  moments,
  eraLabel = "ჩანაწერი / 1988–1992",
}: BiographyWitnessSectionProps) {
  const timelineData = useMemo(
    () => mapMomentsToTimeline(moments),
    [moments],
  );

  return (
    <section
      className="bg-stone-950 px-6 pt-24 pb-16 text-stone-50 sm:px-10 lg:pt-32 lg:pb-20"
      id="witness"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
          <p className="font-mono-label text-xs uppercase tracking-[0.32em] text-stone-500">
            {eraLabel}
          </p>
          <p className="mt-6 text-lg leading-9 text-stone-300">{description}</p>
          <p className="mt-4 text-sm text-stone-500">
            აირჩიეთ წერტილი ორბიტაზე, რომ ციტატა და არქივის ფრაგმენტი გაიხსნას.
          </p>
        </header>

        <RadialOrbitalTimeline embedded timelineData={timelineData} />
      </div>
    </section>
  );
}
