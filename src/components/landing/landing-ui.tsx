import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { getLocalizedHref } from "@/lib/href";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono-label mb-4 text-xs uppercase tracking-[0.2em] text-landing-accent">
      {children}
    </p>
  );
}

export function TextLink({
  href,
  children,
  className = "",
  locale,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  locale?: string;
}) {
  const resolvedHref = locale ? getLocalizedHref(href, locale) : href;

  return (
    <a
      className={`landing-link-underline group inline-flex items-center gap-2 font-body-landing text-sm font-medium text-landing-text transition hover:text-white ${className}`}
      href={resolvedHref}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </a>
  );
}

export function CtaButton({
  href,
  children,
  className = "",
  locale,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  locale?: string;
}) {
  const resolvedHref = locale ? getLocalizedHref(href, locale) : href;

  return (
    <a
      className={`cta-slide-fill inline-flex items-center justify-center rounded-sm bg-landing-accent px-7 py-3.5 font-body-landing text-xs font-semibold uppercase tracking-[0.08em] text-landing-bg transition ${className}`}
      href={resolvedHref}
    >
      {children}
    </a>
  );
}
