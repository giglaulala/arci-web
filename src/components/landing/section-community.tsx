import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { siteImages } from "@/lib/site-images";
import type { HomeContent } from "@/types/home";

import { TextLink } from "./landing-ui";

type SectionCommunityProps = {
  community: HomeContent["community"];
  locale: string;
};

export function SectionCommunity({ community, locale }: SectionCommunityProps) {
  return (
    <section className="relative min-h-[420px] overflow-hidden" id="community">
      <Image
        alt="„შენი სახლი“ — ლისის საცხოვრებელი კორპუსი"
        className="object-cover"
        fill
        sizes="100vw"
        src={siteImages["sheni-lisi1"]}
      />
      <div className="absolute inset-0 bg-landing-bg/75" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-24 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="font-display-landing text-6xl uppercase tracking-wide text-landing-accent sm:text-7xl">
            {community.city}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-landing-text sm:text-4xl">
            {community.headline}
          </h2>
          <p className="mt-5 font-body-landing text-base leading-8 text-landing-text/85 sm:text-lg">
            {community.body}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <TextLink href="#contact" locale={locale}>
              {community.ctaTeam}
            </TextLink>
            <TextLink href="#community" locale={locale}>
              {community.ctaLocations}
            </TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
