import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { siteImages } from "@/lib/site-images";
import type { HomeContent } from "@/types/home";

import { TextLink } from "./landing-ui";

type SectionAboutProps = {
  about: HomeContent["about"];
  locale: string;
};

export function SectionAbout({ about, locale }: SectionAboutProps) {
  return (
    <section className="bg-landing-bg px-6 py-24 sm:px-10" id="about">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-landing-text sm:text-4xl lg:text-5xl">
            {about.headline}
          </h2>
          <p className="mt-6 max-w-xl font-body-landing text-base leading-8 text-landing-muted sm:text-lg">
            {about.body}
          </p>
          <div className="mt-8">
            <TextLink href="#contact" locale={locale}>
              {about.cta}
            </TextLink>
          </div>
        </Reveal>

        <Reveal className="relative aspect-[4/3] overflow-hidden border border-landing-divider" delay={0.1}>
          <Image
            alt="„შენი სახლი“ — ლისის საცხოვრებელი კორპუსი"
            className="object-cover transition duration-700 hover:scale-105"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            src={siteImages["sheni-lisi"]}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-landing-bg/50 to-transparent" />
        </Reveal>
      </div>
    </section>
  );
}
