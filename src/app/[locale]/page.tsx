import { ChevronDown, Languages } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import logo from "@/components/Logo.png";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHero } from "@/components/landing/landing-hero";
import { SiteMenu } from "@/components/site-menu";
import { SectionAbout } from "@/components/landing/section-about";
import { SectionCareers } from "@/components/landing/section-careers";
import { SectionCommitments } from "@/components/landing/section-commitments";
import { SectionCommunity } from "@/components/landing/section-community";
import { SectionContact } from "@/components/landing/section-contact";
import { SectionFeaturedProject } from "@/components/landing/section-featured-project";
import { SectionNews } from "@/components/landing/section-news";
import { SectionServices } from "@/components/landing/section-services";
import { StatsMarquee } from "@/components/landing/stats-marquee";
import { Link, routing, type Locale } from "@/i18n/routing";
import { getHomeContent, getSiteConfig } from "@/lib/content";

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
  const home = getHomeContent();
  const t = await getTranslations("Site");
  const nextLocale = params.locale === "ka" ? "en" : "ka";

  const getHomeNavHref = (href: string) => {
    if (href.startsWith("/")) {
      return `/${params.locale}${href}`;
    }

    if (href === "#hero") {
      return "#hero";
    }

    return `/${params.locale}/biography${href}`;
  };

  return (
    <main className="bg-landing-bg font-body-landing text-landing-text">
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

      <LandingHero hero={home.hero} since={site.since} />
      <StatsMarquee stats={home.stats} />
      <SectionAbout about={home.about} locale={params.locale} />
      <SectionServices locale={params.locale} services={home.services} />
      <SectionFeaturedProject
        locale={params.locale}
        project={home.featuredProject}
      />
      <SectionNews locale={params.locale} news={home.news} />
      <SectionCommunity community={home.community} locale={params.locale} />
      <SectionCommitments commitments={home.commitments} />
      <SectionCareers careers={home.careers} locale={params.locale} />
      <SectionContact
        contact={home.contact}
        locale={params.locale}
        site={site}
      />
      <LandingFooter footer={home.footer} site={site} />
    </main>
  );
}
