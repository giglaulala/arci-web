import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { siteImages } from "@/lib/site-images";
import type { HomeContent } from "@/types/home";

import { CtaButton } from "./landing-ui";

type SectionCareersProps = {
  careers: HomeContent["careers"];
  locale: string;
};

export function SectionCareers({ careers, locale }: SectionCareersProps) {
  return (
    <section className="relative min-h-[55vh] overflow-hidden" id="careers">
      <Image
        alt="„შენი სახლი“ — სამგორის საცხოვრებელი კორპუსი"
        className="object-cover"
        fill
        sizes="100vw"
        src={siteImages["sheni-samgor1"]}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25" />

      <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-[1440px] items-center px-6 py-20 sm:px-10">
        <Reveal className="max-w-2xl">
          <h2 className="font-display-landing text-5xl uppercase leading-none tracking-wide text-landing-text sm:text-6xl">
            {careers.headline}
          </h2>
          <p className="mt-6 font-body-landing text-base leading-8 text-landing-text/85 sm:text-lg">
            {careers.subheadline}
          </p>
          <div className="mt-8">
            <CtaButton href="#contact" locale={locale}>
              {careers.cta}
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
