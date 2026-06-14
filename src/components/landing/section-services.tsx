"use client";

import { Building2, ClipboardList, Layers } from "lucide-react";
import Image from "next/image";

import DisplayCards from "@/components/ui/display-cards";
import type { DisplayCardProps } from "@/components/ui/display-cards";
import { Reveal } from "@/components/reveal";
import { siteImages } from "@/lib/site-images";
import type { HomeContent } from "@/types/home";

import { SectionLabel, TextLink } from "./landing-ui";

type SectionServicesProps = {
  services: HomeContent["services"];
  locale: string;
};

const stackClassNames = [
  "[grid-area:stack] hover:-translate-y-10 before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[100%] before:rounded-xl before:bg-landing-bg/50 before:bg-blend-overlay before:outline-1 before:outline-landing-divider before:transition-opacity before:duration-700 before:content-[''] hover:grayscale-0 hover:before:opacity-0 grayscale-[100%]",
  "[grid-area:stack] translate-x-8 translate-y-8 hover:-translate-y-1 sm:translate-x-12 sm:translate-y-10 before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[100%] before:rounded-xl before:bg-landing-bg/50 before:bg-blend-overlay before:outline-1 before:outline-landing-divider before:transition-opacity before:duration-700 before:content-[''] hover:grayscale-0 hover:before:opacity-0 grayscale-[100%]",
  "[grid-area:stack] translate-x-16 translate-y-16 hover:translate-y-8 sm:translate-x-24 sm:translate-y-20",
] as const;

const serviceIcons = [ClipboardList, Building2, Layers] as const;

export function SectionServices({ services, locale }: SectionServicesProps) {
  const cards: DisplayCardProps[] = services.approach
    .slice(0, 3)
    .map((item, index) => {
      const Icon = serviceIcons[index] ?? ClipboardList;

      return {
        icon: <Icon className="size-4 text-landing-text" />,
        title: item.label,
        description: item.description,
        date: "ARCI სერვისები",
        iconClassName: "text-landing-text",
        titleClassName: "text-landing-text",
        className: stackClassNames[index],
      };
    });

  return (
    <section className="bg-landing-surface px-6 py-24 sm:px-10" id="services">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <SectionLabel>სერვისები</SectionLabel>
          <p className="max-w-3xl font-body-landing text-base leading-8 text-landing-muted sm:text-lg">
            {services.intro}
          </p>
        </Reveal>

        <Reveal className="mt-14" delay={0.08}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex min-h-[380px] items-center justify-start overflow-x-auto py-4 sm:min-h-[420px] sm:overflow-visible sm:py-8">
              <DisplayCards
                cards={cards}
                className="place-items-start"
              />
            </div>

            <div className="relative aspect-[4/3] min-h-[280px] overflow-hidden border border-landing-divider lg:aspect-auto lg:min-h-[420px]">
              <Image
                alt="„შენი სახლი“ — უნივერსიტეტის ქუჩის საცხოვრებელი კორპუსი"
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                src={siteImages["sheni-univ-qucha"]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-landing-surface/80 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6" delay={0.12}>
          <div className="flex flex-wrap gap-3">
            {services.expertise.slice(0, 6).map((item) => (
              <span
                className="border border-landing-divider bg-landing-bg px-3 py-2 font-body-landing text-xs text-landing-muted"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <TextLink href="#projects" locale={locale}>
              {services.cta}
            </TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
