import { ArrowUpRight, Languages, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Reveal } from "@/components/reveal";
import { SocialIcon } from "@/components/social-icon";
import { Link, routing, type Locale } from "@/i18n/routing";
import { getProjects, getSiteConfig, getTimeline } from "@/lib/content";

type PageProps = {
  params: { locale: Locale };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const site = getSiteConfig();

  return {
    title: `${site.name} | ${site.role}`,
    description: site.description,
    alternates: {
      canonical: `/${params.locale}`,
      languages: {
        ka: "/ka",
        en: "/en",
      },
    },
  };
}

export default async function EditorialHome({ params }: PageProps) {
  setRequestLocale(params.locale);

  const site = getSiteConfig();
  const projects = getProjects();
  const timeline = getTimeline();
  const t = await getTranslations("Site");
  const nextLocale = params.locale === "ka" ? "en" : "ka";

  return (
    <main className="min-h-screen bg-stone-950 text-stone-50">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={site.portrait.src}
            alt={site.portrait.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/75 to-stone-950" />
        </div>

        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-sm sm:px-10">
          <a
            className="font-semibold tracking-[0.28em] text-stone-200"
            href="#"
          >
            ARCI
          </a>
          <nav className="hidden items-center gap-6 text-stone-300 md:flex">
            {site.navigation.map((item) => (
              <a
                className="transition hover:text-white"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Link
            aria-label={t("switchLocaleAria")}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-stone-200 transition hover:border-white/40 hover:bg-white/10"
            href="/"
            locale={nextLocale}
          >
            <Languages className="h-4 w-4" />
            {t("switchLocale")}
          </Link>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-20 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:pb-36 lg:pt-28">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-stone-200 backdrop-blur">
              <MapPin className="h-4 w-4" />
              {site.location}
            </p>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
              {site.headline}
            </h1>
          </Reveal>

          <Reveal className="self-end" delay={0.15}>
            <p className="max-w-xl text-lg leading-8 text-stone-300">
              {site.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
                href="#projects"
              >
                პროექტების ნახვა
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-stone-200 transition hover:border-white/40 hover:bg-white/10"
                href={`mailto:${site.email}`}
              >
                <Mail className="h-4 w-4" />
                კონტაქტი
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-10 lg:grid-cols-[0.7fr_1.3fr]"
        id="bio"
      >
        <Reveal>
          <p className="text-sm uppercase tracking-[0.35em] text-stone-500">
            Biography
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">
            {site.name}
          </h2>
          <p className="mt-3 text-stone-400">{site.role}</p>
        </Reveal>
        <Reveal className="space-y-6 text-xl leading-9 text-stone-200">
          {site.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </section>

      <section className="bg-stone-100 py-24 text-stone-950" id="projects">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <Reveal className="mb-14 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-stone-500">
              Selected Projects
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
              სარედაქციო სერიები და პერსონალური არქივები
            </h2>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal delay={index * 0.08} key={project.slug}>
                <article className="group overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-stone-200">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover grayscale transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between text-sm text-stone-500">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="text-2xl font-semibold tracking-[-0.02em]">
                      {project.title}
                    </h3>
                    <p className="mt-4 leading-7 text-stone-600">
                      {project.summary}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 sm:px-10" id="timeline">
        <Reveal className="mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-stone-500">
            Timeline
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
            სამუშაო გზა
          </h2>
        </Reveal>

        <div className="space-y-6">
          {timeline.map((entry, index) => (
            <Reveal delay={index * 0.06} key={`${entry.year}-${entry.title}`}>
              <article className="grid gap-6 border-t border-white/10 py-8 md:grid-cols-[10rem_1fr]">
                <time className="text-3xl font-semibold text-stone-500">
                  {entry.year}
                </time>
                <div>
                  <h3 className="text-2xl font-semibold">{entry.title}</h3>
                  <p className="mt-3 leading-8 text-stone-300">
                    {entry.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <footer
        className="border-t border-white/10 px-6 py-12 sm:px-10"
        id="contact"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-semibold">{site.name}</p>
            <p className="mt-2 text-stone-400">{site.cms.reason}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {site.social.map((item) => (
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-stone-200 transition hover:border-white/40 hover:bg-white/10"
                href={item.href}
                key={item.label}
                rel="noreferrer"
                target="_blank"
              >
                <SocialIcon name={item.icon} />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
