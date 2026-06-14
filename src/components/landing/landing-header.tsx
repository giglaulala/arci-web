"use client";

import { ChevronDown, Languages, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import logo from "@/components/Logo.png";
import { Link } from "@/i18n/routing";
import { getLocalizedHref } from "@/lib/href";
import type { HomeNavigationItem } from "@/types/home";

import { LandingMobileMenu } from "./landing-mobile-menu";

type LandingHeaderProps = {
  navigation: HomeNavigationItem[];
  siteName: string;
  locale: string;
  nextLocale: string;
  switchLocaleLabel: string;
  switchLocaleAria: string;
  contactLabel: string;
};

export function LandingHeader({
  navigation,
  siteName,
  locale,
  nextLocale,
  switchLocaleLabel,
  switchLocaleAria,
  contactLabel,
}: LandingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? "border-b border-landing-divider bg-landing-bg/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-4 sm:px-10">
        <a className="relative z-10 flex shrink-0 items-center" href="#hero">
          <Image
            alt={`${siteName} logo`}
            className="h-10 w-auto sm:h-12"
            priority
            src={logo}
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) =>
            item.megaMenu ? (
              <div className="group relative" key={item.label}>
                <a
                  className="landing-link-underline inline-flex items-center gap-1.5 font-body-landing text-sm text-landing-text/90 transition hover:text-landing-text"
                  href={getLocalizedHref(item.href, locale)}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                </a>
                <div className="pointer-events-none absolute left-1/2 top-full w-[min(720px,calc(100vw-3rem))] -translate-x-1/2 pt-5 opacity-0 transition duration-200 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="grid gap-6 border border-landing-divider bg-landing-surface p-6 shadow-2xl shadow-black/40 md:grid-cols-[1fr_1fr_220px]">
                    {item.megaMenu.columns.map((column) => (
                      <div key={column.title}>
                        <p className="font-mono-label mb-3 text-[10px] uppercase tracking-[0.18em] text-landing-muted">
                          {column.title}
                        </p>
                        <ul className="space-y-2">
                          {column.links.map((link) => (
                            <li key={link.label}>
                              <a
                                className="block py-1.5 font-body-landing text-sm text-landing-text/80 transition hover:text-landing-accent"
                                href={getLocalizedHref(link.href, locale)}
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="border-t border-landing-divider pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                      <p className="font-body-landing text-sm font-semibold text-landing-text">
                        {item.megaMenu.cta.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-landing-muted">
                        {item.megaMenu.cta.description}
                      </p>
                      <a
                        className="mt-4 inline-flex items-center gap-1 font-body-landing text-sm font-medium text-landing-accent transition hover:text-landing-highlight"
                        href={getLocalizedHref(item.megaMenu.cta.href, locale)}
                      >
                        გაიგეთ მეტი
                        <ChevronDown className="-rotate-90 h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <a
                className="landing-link-underline font-body-landing text-sm text-landing-text/90 transition hover:text-landing-text"
                href={getLocalizedHref(item.href, locale)}
                key={item.label}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            aria-label="Search"
            className="hidden rounded-full p-2 text-landing-text/80 transition hover:bg-white/5 hover:text-landing-text lg:inline-flex"
            type="button"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            aria-label={switchLocaleAria}
            className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-body-landing text-sm text-landing-text/90 transition hover:border-white/40 hover:text-landing-text md:inline-flex"
            href="/"
            locale={nextLocale}
          >
            <Languages className="h-4 w-4" />
            {switchLocaleLabel}
          </Link>
          <a
            className="cta-slide-fill hidden items-center justify-center rounded-sm bg-landing-accent px-7 py-3.5 font-body-landing text-xs font-semibold uppercase tracking-[0.08em] text-landing-bg transition sm:inline-flex"
            href="#contact"
          >
            {contactLabel}
          </a>
          <LandingMobileMenu locale={locale} navigation={navigation} />
        </div>
      </div>
    </header>
  );
}
