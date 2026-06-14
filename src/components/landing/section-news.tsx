import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { resolveSiteImage } from "@/lib/site-images";
import type { HomeContent } from "@/types/home";

import { SectionLabel, TextLink } from "./landing-ui";

type SectionNewsProps = {
  news: HomeContent["news"];
  locale: string;
};

export function SectionNews({ news, locale }: SectionNewsProps) {
  return (
    <section className="bg-landing-bg px-6 py-24 sm:px-10" id="news">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>{news.overline}</SectionLabel>
            <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-landing-text sm:text-4xl">
              {news.headline}
            </h2>
          </div>
          <TextLink href="#" locale={locale}>
            {news.cta}
          </TextLink>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.articles.map((article, index) => (
            <Reveal delay={index * 0.08} key={article.title}>
              <article className="group flex h-full flex-col border border-landing-divider bg-landing-surface transition hover:-translate-y-1 hover:border-landing-accent">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    alt={article.title}
                    className="object-cover transition duration-500 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    src={resolveSiteImage(article.image)}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-landing-accent">
                    {article.category}
                  </p>
                  <h3 className="mt-3 flex-1 font-body-landing text-lg font-semibold leading-7 text-landing-text">
                    {article.title}
                  </h3>
                  <a
                    className="mt-5 inline-flex items-center gap-2 font-body-landing text-sm font-medium text-landing-text transition group-hover:text-landing-accent"
                    href={article.href}
                  >
                    წაიკითხეთ მეტი
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
