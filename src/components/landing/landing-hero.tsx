"use client";

import { ArrowDown, ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import type { HomeContent } from "@/types/home";

type LandingHeroProps = {
  hero: HomeContent["hero"];
  since: string;
};

export function LandingHero({ hero, since }: LandingHeroProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <section
      className="relative flex min-h-screen items-end overflow-hidden px-6 pb-20 pt-32 sm:px-10 lg:pb-28"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono-label mb-6 text-xs uppercase tracking-[0.2em] text-landing-muted">
            ARCI / {since}
          </p>
          <h1 className="max-w-4xl font-display-landing text-[clamp(3.5rem,12vw,7.5rem)] uppercase leading-[0.92] tracking-wide text-landing-text">
            {hero.taglineLine1}
            <br />
            <span className="italic text-landing-accent">{hero.taglineAccent}</span>
          </h1>

          <button
            className="group mt-10 inline-flex max-w-4xl items-center gap-4 text-left transition hover:opacity-90"
            onClick={() => setIsPanelOpen(true)}
            type="button"
          >
            <span className="font-display text-2xl font-semibold leading-tight text-landing-text sm:text-3xl lg:text-4xl">
              {hero.ctaPrompt}
            </span>
            <ArrowRight className="mt-1 h-6 w-6 shrink-0 text-landing-text transition group-hover:translate-x-1 sm:h-7 sm:w-7" />
          </button>
        </motion.div>
      </div>

      <a
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 font-mono-label text-[10px] uppercase tracking-[0.25em] text-landing-muted transition hover:text-landing-text"
        href="#stats"
      >
        <span>{hero.scrollLabel}</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>

      <AnimatePresence>
        {isPanelOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-4 sm:items-center sm:p-8"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setIsPanelOpen(false)}
          >
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full max-w-5xl border border-landing-divider bg-landing-surface p-6 sm:p-8"
              exit={{ opacity: 0, y: 24 }}
              initial={{ opacity: 0, y: 24 }}
              onClick={(event) => event.stopPropagation()}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                aria-label="დახურვა"
                className="absolute right-4 top-4 rounded-full p-2 text-landing-muted transition hover:bg-white/5 hover:text-landing-text"
                onClick={() => setIsPanelOpen(false)}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid gap-5 md:grid-cols-3">
                {hero.choices.map((choice, index) => (
                  <motion.article
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col border border-landing-divider bg-landing-bg p-5 transition hover:border-landing-accent"
                    initial={{ opacity: 0, y: 20 }}
                    key={choice.id}
                    transition={{ delay: index * 0.08 }}
                  >
                    <h3 className="font-display-landing text-3xl uppercase tracking-wide text-landing-text">
                      {choice.title}
                    </h3>
                    <p className="mt-4 flex-1 font-body-landing text-sm leading-7 text-landing-muted">
                      {choice.description}
                    </p>
                    <a
                      className="mt-6 inline-flex items-center gap-2 font-body-landing text-sm font-semibold text-landing-accent transition hover:text-landing-highlight"
                      href={choice.href}
                      onClick={() => setIsPanelOpen(false)}
                    >
                      {choice.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
