"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { Reveal } from "@/components/reveal";
import { resolveSiteImage } from "@/lib/site-images";
import type { HomeContent } from "@/types/home";

import { SectionLabel, TextLink } from "./landing-ui";

type SectionFeaturedProjectProps = {
  project: HomeContent["featuredProject"];
  locale: string;
};

export function SectionFeaturedProject({
  project,
  locale,
}: SectionFeaturedProjectProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section
      className="relative min-h-[70vh] overflow-hidden"
      id="projects"
      ref={ref}
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          alt={project.title}
          className="object-cover"
          fill
          priority={false}
          sizes="100vw"
          src={resolveSiteImage(project.image)}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1440px] items-end px-6 py-20 sm:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>{project.overline}</SectionLabel>
          <h2 className="font-display-landing text-5xl uppercase tracking-wide text-landing-text sm:text-6xl">
            {project.title}
          </h2>
          <p className="mt-5 font-body-landing text-base leading-8 text-landing-text/85 sm:text-lg">
            {project.description}
          </p>
          <div className="mt-8">
            <TextLink href="#projects" locale={locale}>
              {project.cta}
            </TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
