"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { FormEvent, useState } from "react";

import { Reveal } from "@/components/reveal";
import type { HomeContent } from "@/types/home";
import type { SiteConfig } from "@/types/content";

import { CtaButton } from "./landing-ui";

type SectionContactProps = {
  contact: HomeContent["contact"];
  site: Pick<
    SiteConfig,
    "name" | "address" | "phone" | "email" | "location"
  >;
  locale: string;
};

export function SectionContact({ contact, site, locale }: SectionContactProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="bg-landing-bg px-6 py-24 sm:px-10" id="contact">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-display-landing text-5xl uppercase tracking-wide text-landing-text">
            {contact.title}
          </h2>

          {isSubmitted ? (
            <p className="mt-8 rounded-sm border border-white/30 bg-white/10 px-5 py-4 font-body-landing text-sm text-landing-text">
              {contact.form.success}
            </p>
          ) : (
            <form className="mt-8 space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono-label text-[10px] uppercase tracking-[0.16em] text-landing-muted">
                    {contact.form.firstName} *
                  </span>
                  <input
                    className="w-full border border-landing-divider bg-landing-surface px-4 py-3 font-body-landing text-sm text-landing-text outline-none transition focus:border-landing-accent"
                    name="firstName"
                    required
                    type="text"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono-label text-[10px] uppercase tracking-[0.16em] text-landing-muted">
                    {contact.form.lastName} *
                  </span>
                  <input
                    className="w-full border border-landing-divider bg-landing-surface px-4 py-3 font-body-landing text-sm text-landing-text outline-none transition focus:border-landing-accent"
                    name="lastName"
                    required
                    type="text"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block font-mono-label text-[10px] uppercase tracking-[0.16em] text-landing-muted">
                  {contact.form.email} *
                </span>
                <input
                  className="w-full border border-landing-divider bg-landing-surface px-4 py-3 font-body-landing text-sm text-landing-text outline-none transition focus:border-landing-accent"
                  name="email"
                  required
                  type="email"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono-label text-[10px] uppercase tracking-[0.16em] text-landing-muted">
                  {contact.form.phone}
                </span>
                <input
                  className="w-full border border-landing-divider bg-landing-surface px-4 py-3 font-body-landing text-sm text-landing-text outline-none transition focus:border-landing-accent"
                  name="phone"
                  type="tel"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono-label text-[10px] uppercase tracking-[0.16em] text-landing-muted">
                  {contact.form.message}
                </span>
                <textarea
                  className="min-h-32 w-full resize-y border border-landing-divider bg-landing-surface px-4 py-3 font-body-landing text-sm text-landing-text outline-none transition focus:border-landing-accent"
                  name="message"
                  rows={5}
                />
              </label>
              <button
                className="cta-slide-fill rounded-sm bg-landing-accent px-7 py-3.5 font-body-landing text-xs font-semibold uppercase tracking-[0.08em] text-landing-bg"
                type="submit"
              >
                {contact.form.submit}
              </button>
            </form>
          )}
        </Reveal>

        <Reveal className="space-y-8" delay={0.08}>
          <div className="border border-landing-divider bg-landing-surface p-6">
            <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-landing-accent">
              სათავო ოფისი
            </p>
            <h3 className="mt-3 font-body-landing text-lg font-semibold text-landing-text">
              {site.name}
            </h3>
            <div className="mt-4 space-y-3 font-body-landing text-sm text-landing-muted">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-landing-accent" />
                <span>
                  {site.address}
                  <br />
                  {site.location}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-landing-accent" />
                <a
                  className="transition hover:text-landing-text"
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                >
                  {site.phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-landing-accent" />
                <a
                  className="transition hover:text-landing-text"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </p>
            </div>
          </div>

          <div className="border border-landing-divider bg-landing-surface p-6">
            <p className="font-body-landing text-sm font-semibold text-landing-text">
              {contact.ethicsTitle}
            </p>
            <p className="mt-2 font-body-landing text-sm leading-7 text-landing-muted">
              {contact.ethicsBody}
            </p>
          </div>

          <div className="border border-landing-divider bg-landing-surface p-6">
            <p className="font-body-landing text-sm leading-7 text-landing-muted">
              {contact.subcontractorNote}
            </p>
            <div className="mt-4">
              <CtaButton href="#contact" locale={locale}>
                {contact.subcontractorCta}
              </CtaButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
