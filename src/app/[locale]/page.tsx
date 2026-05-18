import { ArrowUpRight, Languages, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ProjectArchive } from "@/components/project-archive";
import { Reveal } from "@/components/reveal";
import { SocialIcon } from "@/components/social-icon";
import { FloatingPaths } from "@/components/ui/background-paths";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
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
  const [origin, method, foundation] = timeline;
  const t = await getTranslations("Site");
  const nextLocale = params.locale === "ka" ? "en" : "ka";

  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <header className="sticky top-0 z-50 bg-stone-950 px-6 py-4 text-stone-50 shadow-2xl shadow-black/10 sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a
            className="flex items-baseline gap-3 font-latin font-semibold tracking-[0.28em]"
            href="#hero"
          >
            <span className="text-xl">ARCI</span>
            <span className="hidden text-xs font-normal tracking-[0.22em] text-stone-400 sm:inline">
              {site.since}
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-stone-300 lg:flex">
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
          <div className="flex items-center gap-3">
            <Link
              aria-label={t("switchLocaleAria")}
              className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-stone-200 transition hover:border-white/40 hover:bg-white/10 md:inline-flex"
              href="/"
              locale={nextLocale}
            >
              <Languages className="h-4 w-4" />
              {t("switchLocale")}
            </Link>
            <a
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
              href="#contact"
            >
              კონსულტაცია
            </a>
          </div>
        </div>
      </header>

      <section
        className="relative overflow-hidden border-b border-white/10 bg-stone-950 px-6 py-24 text-stone-50 sm:px-10 lg:py-32"
        id="hero"
      >
        <div className="absolute inset-0 scale-125 opacity-90">
          <FloatingPaths className="text-white" position={1} />
          <FloatingPaths className="text-white" position={-1} />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal className="max-w-5xl">
            <p className="mb-8 font-latin text-sm uppercase tracking-[0.45em] text-stone-400">
              ARCI / {site.since}
            </p>
            <h1 className="font-display text-6xl font-semibold leading-[1.04] tracking-[-0.06em] text-white sm:text-8xl lg:text-9xl">
              {site.headline}
            </h1>
          </Reveal>

          <Reveal className="self-end" delay={0.15}>
            <p className="text-xl leading-9 text-stone-200">{site.subtitle}</p>
            <p className="mt-8 border-l-2 border-white pl-6 text-base leading-8 text-stone-300">
              {site.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
                href="#timeline"
              >
                ბიოგრაფიის კითხვა
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm text-stone-100 transition hover:border-white hover:bg-white/10"
                href="#projects"
              >
                პროექტები
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <ScrollExpandMedia
        bgImageSrc="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80&sat=-100"
        date={origin.year}
        id="timeline"
        mediaSrc={origin.images[0].src}
        mediaType="image"
        scrollToExpand="Scroll to expand"
        textBlend
        title={origin.title}
      >
        <div className="mx-auto grid max-w-7xl gap-14 text-stone-50 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
                <Image
                  alt={origin.images[0].alt}
                  className="object-cover grayscale"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  src={origin.images[0].src}
                />
              </div>
              <figcaption className="mt-4 font-latin text-xs uppercase tracking-[0.22em] text-stone-400">
                {origin.images[0].caption}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="self-center" delay={0.12}>
            <p className="font-latin text-sm uppercase tracking-[0.45em] text-stone-500">
              {origin.year}
            </p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-tight tracking-[-0.05em] sm:text-7xl">
              {origin.title}
            </h2>
            <p className="mt-8 text-lg leading-9 text-stone-300">
              {origin.description}
            </p>
            {origin.quote ? (
              <blockquote className="mt-10 border-l-4 border-stone-50 bg-white p-8 font-display text-2xl leading-10 text-stone-950 shadow-sm">
                “{origin.quote}”
              </blockquote>
            ) : null}
          </Reveal>
        </div>
      </ScrollExpandMedia>

      <section className="bg-stone-950 px-6 py-24 text-stone-50 sm:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.15fr]">
          <Reveal className="self-center">
            <p className="font-latin text-sm uppercase tracking-[0.45em] text-stone-500">
              {method.year}
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-tight tracking-[-0.05em] sm:text-7xl">
              {method.title}
            </h2>
            <p className="mt-8 text-xl leading-10 text-stone-300">
              {method.description}
            </p>
          </Reveal>

          <Reveal
            className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]"
            delay={0.1}
          >
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
                <Image
                  alt={method.images[0].alt}
                  className="object-cover grayscale"
                  fill
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  src={method.images[0].src}
                />
              </div>
              <figcaption className="mt-3 text-sm text-stone-400">
                {method.images[0].caption}
              </figcaption>
            </figure>
            <div className="grid gap-4">
              {method.images.slice(1).map((image) => (
                <figure key={image.src}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
                    <Image
                      alt={image.alt}
                      className="object-cover grayscale"
                      fill
                      sizes="(min-width: 1024px) 22vw, 100vw"
                      src={image.src}
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-stone-400">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-stone-100 px-6 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-300">
                <Image
                  alt={foundation.images[0].alt}
                  className="object-cover grayscale"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  src={foundation.images[0].src}
                />
              </div>
              <figcaption className="mt-4 font-latin text-xs uppercase tracking-[0.22em] text-stone-500">
                {foundation.images[0].caption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="self-center" delay={0.12}>
            <p className="font-latin text-sm uppercase tracking-[0.45em] text-stone-500">
              {foundation.year}
            </p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-tight tracking-[-0.05em] sm:text-7xl">
              {foundation.title}
            </h2>
            <p className="mt-8 text-lg leading-9 text-stone-700">
              {foundation.description}
            </p>
            <figure className="ml-auto mt-12 max-w-sm">
              <div className="relative aspect-[5/3] overflow-hidden bg-stone-300">
                <Image
                  alt={foundation.images[1].alt}
                  className="object-cover grayscale"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  src={foundation.images[1].src}
                />
              </div>
              <figcaption className="mt-3 text-sm text-stone-500">
                {foundation.images[1].caption}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section
        className="bg-stone-100 px-6 py-24 sm:px-10 lg:py-32"
        id="projects"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-latin text-sm uppercase tracking-[0.45em] text-stone-500">
                Project Archive
              </p>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-tight tracking-[-0.05em] sm:text-7xl">
                პროექტები, რომლებიც ბიოგრაფიას აგრძელებს
              </h2>
            </div>
            <p className="self-end text-lg leading-9 text-stone-600">
              ფილტრი აჩვენებს ARCI-ის მუშაობის სხვადასხვა პერიოდს: პირველი
              სახელოსნოებიდან თანამედროვე საზოგადოებრივ და საცხოვრებელ
              პროექტებამდე.
            </p>
          </Reveal>
          <ProjectArchive projects={projects} />
        </div>
      </section>

      <section className="bg-stone-950 px-6 py-24 text-stone-50 sm:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-latin text-sm uppercase tracking-[0.45em] text-stone-500">
            Newsletter
          </p>
          <h2 className="mt-5 font-display text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
            მიიღეთ ახალი პროექტები და არქივის ჩანაწერები
          </h2>
          <form className="mt-10 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              ელფოსტა
            </label>
            <input
              className="min-h-14 flex-1 rounded-full border border-white/15 bg-white px-6 text-stone-950 outline-none ring-white/20 transition placeholder:text-stone-500 focus:ring-4"
              id="newsletter-email"
              placeholder="თქვენი ელფოსტა"
              type="email"
            />
            <button
              className="min-h-14 rounded-full bg-white px-8 font-semibold text-stone-950 transition hover:bg-stone-200"
              type="button"
            >
              გამოწერა
            </button>
          </form>
        </Reveal>
      </section>

      <footer
        className="bg-stone-950 px-6 pb-12 pt-20 text-stone-50 sm:px-10"
        id="contact"
      >
        <div className="mx-auto grid max-w-7xl gap-14 border-t border-white/10 pt-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-md">
            <p className="font-latin text-4xl font-semibold tracking-[0.22em]">
              {site.name}
            </p>
            <p className="mt-4 text-stone-400">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {site.social.map((item) => (
                <a
                  aria-label={item.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-stone-200 transition hover:border-white/40 hover:bg-white/10"
                  href={item.href}
                  key={item.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <SocialIcon name={item.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {site.footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3 text-stone-300">
                  {column.links.map((item) => (
                    <li key={item.href + item.label}>
                      <a
                        className="transition hover:text-white"
                        href={item.href}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                კონტაქტი
              </h3>
              <ul className="mt-5 space-y-4 text-stone-300">
                <li className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0" />
                  {site.address}
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0" />
                  <a href={`tel:${site.phone}`}>{site.phone}</a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0" />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>{site.hours}</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
