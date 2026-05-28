import { ChevronDown, Languages } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import logo from "@/components/Logo.png";
import { Reveal } from "@/components/reveal";
import { SiteMenu } from "@/components/site-menu";
import { Link, routing, type Locale } from "@/i18n/routing";
import { getSiteConfig } from "@/lib/content";

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

export default async function Home({ params }: PageProps) {
  setRequestLocale(params.locale);

  const site = getSiteConfig();
  const t = await getTranslations("Site");
  const nextLocale = params.locale === "ka" ? "en" : "ka";

  const getHomeNavHref = (href: string) => {
    if (href.startsWith("/")) {
      return `/${params.locale}${href}`;
    }

    if (href === "#hero") {
      return "#hero";
    }

    return `biography${href}`;
  };

  return (
    <main className="h-screen overflow-hidden bg-stone-950 text-stone-50">
      <header className="absolute top-0 z-50 w-full px-6 py-5 text-stone-50 sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a className="flex items-center" href="#hero">
            <Image
              alt={`${site.name} logo`}
              className="h-12 w-auto sm:h-14"
              priority
              src={logo}
            />
          </a>
          <nav className="hidden items-center gap-8 text-sm text-stone-300 lg:flex">
            {site.navigation.map((item) =>
              item.children ? (
                <div className="group relative" key={item.label}>
                  <a
                    aria-haspopup="menu"
                    className="inline-flex items-center gap-1.5 transition hover:text-white"
                    href={getHomeNavHref(item.href)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                  </a>
                  <div className="pointer-events-none absolute left-0 top-full min-w-56 pt-4 opacity-0 transition duration-150 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="rounded-2xl border border-white/10 bg-stone-900 p-2 shadow-2xl shadow-black/30">
                      {item.children.map((child) => (
                        <a
                          className="block rounded-xl px-4 py-3 text-sm text-stone-300 transition hover:bg-white/10 hover:text-white"
                          href={getHomeNavHref(child.href)}
                          key={child.label}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  className="transition hover:text-white"
                  href={getHomeNavHref(item.href)}
                  key={item.href}
                >
                  {item.label}
                </a>
              ),
            )}
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
            <SiteMenu navigation={site.navigation} page="home" />
          </div>
        </div>
      </header>

      <section
        className="relative flex h-screen items-end overflow-hidden px-6 pb-24 pt-36 sm:px-10 lg:pb-28"
        id="hero"
      >
        <video
          aria-label="ARCI development background video"
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted
          playsInline
        >
          <source src="/wmremove-transformed.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <Reveal className="max-w-4xl">
            <p className="mb-6 font-latin text-sm uppercase tracking-[0.45em] text-stone-300">
              ARCI / {site.since}
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">
              ვაშენებთ მომავალს
              <br />
              1989 წლიდან
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-8 text-stone-200 sm:text-lg">
              ქართული დეველოპერული და არქიტექტურული ჯგუფი, რომელიც ქმნის
              საცხოვრებელ სივრცეებს, ურბანულ გარემოს და გრძელვადიან ღირებულებას
              ქალაქისთვის.
            </p>
          </Reveal>
        </div>

        <Link
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-stone-950 shadow-2xl shadow-black/30 transition hover:bg-stone-200"
          href="/biography"
        >
          ბიოგრაფია
        </Link>
      </section>
    </main>
  );
}
