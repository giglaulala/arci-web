"use client";

import { useEffect, useState } from "react";

import { Reveal } from "@/components/reveal";
import type { HomeContent } from "@/types/home";

import { SectionLabel } from "./landing-ui";

type SectionCommitmentsProps = {
  commitments: HomeContent["commitments"];
};

export function SectionCommitments({
  commitments,
}: SectionCommitmentsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = commitments.pillars[activeIndex];
  const pillarCount = commitments.pillars.length;

  useEffect(() => {
    if (pillarCount <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % pillarCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [pillarCount]);

  return (
    <section className="bg-landing-surface px-6 py-24 sm:px-10" id="commitments">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <SectionLabel>ჩვენი ვალდებულებები</SectionLabel>
          <p className="max-w-4xl font-body-landing text-base leading-8 text-landing-muted sm:text-lg">
            {commitments.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[320px_1fr]">
          <Reveal className="space-y-1" delay={0.05}>
            {commitments.pillars.map((pillar, index) => (
              <button
                className={`flex w-full items-start gap-4 border-l-[3px] px-4 py-4 text-left transition ${
                  index === activeIndex
                    ? "border-landing-accent bg-landing-bg"
                    : "border-transparent hover:border-landing-divider hover:bg-landing-bg/50"
                }`}
                key={pillar.number}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span className="font-mono-label text-sm text-landing-accent">
                  {pillar.number}
                </span>
                <span>
                  <span className="block font-mono-label text-[10px] uppercase tracking-[0.16em] text-landing-muted">
                    {pillar.label}
                  </span>
                  <span className="mt-1 block font-body-landing text-sm font-semibold text-landing-text">
                    {pillar.headline}
                  </span>
                </span>
              </button>
            ))}
          </Reveal>

          {active ? (
            <Reveal
              className="border border-landing-divider bg-landing-bg p-8"
              delay={0.1}
              key={active.number}
            >
              <p className="font-mono-label text-xs uppercase tracking-[0.2em] text-landing-accent">
                {active.label}
              </p>
              <h3 className="mt-4 font-display text-3xl font-semibold text-landing-text">
                {active.headline}
              </h3>
              <p className="mt-5 max-w-2xl font-body-landing text-base leading-8 text-landing-muted">
                {active.body}
              </p>
              <a
                className="mt-8 inline-flex items-center gap-2 font-body-landing text-sm font-semibold text-landing-accent transition hover:text-landing-highlight"
                href={active.href}
              >
                გაიგეთ მეტი →
              </a>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
