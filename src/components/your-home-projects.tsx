"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

type ProjectCard = {
  title: string;
  subtitle: string;
  image: StaticImageData;
  tag: string;
};

type YourHomeProjectsProps = {
  projects: ProjectCard[];
};

const pad = (value: number) => value.toString().padStart(2, "0");

export function YourHomeProjects({ projects }: YourHomeProjectsProps) {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <ul className="border-t border-stone-300">
        {projects.map((project, index) => {
          const isActive = index === active;

          return (
            <li key={project.title}>
              <a
                className="group flex items-center gap-5 border-b border-stone-300 py-7 transition-colors sm:gap-8 sm:py-9"
                href="#contact"
                onFocus={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
              >
                <span
                  className={`font-mono-label text-sm tracking-[0.2em] transition-colors ${
                    isActive ? "text-stone-950" : "text-stone-400"
                  }`}
                >
                  {pad(index + 1)}
                </span>

                <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-stone-300 sm:hidden">
                  <Image
                    alt={project.title}
                    className="object-cover"
                    fill
                    sizes="80px"
                    src={project.image}
                  />
                </div>

                <div className="flex-1">
                  <h3
                    className={`font-display text-2xl font-semibold tracking-[-0.03em] transition-[transform,color] duration-300 sm:text-3xl lg:text-4xl ${
                      isActive
                        ? "text-stone-950 sm:translate-x-2"
                        : "text-stone-400"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-7 text-stone-500 transition-opacity ${
                      isActive ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {project.subtitle}
                  </p>
                </div>

                <span className="font-mono-label hidden text-[0.65rem] uppercase tracking-[0.3em] text-stone-400 sm:block">
                  {project.tag}
                </span>

                <ArrowUpRight
                  className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                    isActive
                      ? "translate-x-0 text-stone-950 opacity-100"
                      : "-translate-x-2 text-stone-400 opacity-0"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-300">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0"
                exit={{ opacity: 0, scale: 1.02 }}
                initial={{ opacity: 0, scale: 1.04 }}
                key={current.title}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  alt={current.title}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  src={current.image}
                />
              </motion.div>
            </AnimatePresence>
            <span className="absolute right-5 top-5 bg-white px-3 py-1.5 font-mono-label text-[0.6rem] uppercase tracking-[0.25em] text-stone-950">
              {current.tag}
            </span>
          </div>
          <div className="mt-5 flex items-baseline justify-between gap-4">
            <p className="font-mono-label text-sm tracking-[0.2em] text-stone-400">
              {pad(active + 1)} / {pad(projects.length)}
            </p>
            <p className="font-display text-lg font-semibold tracking-[-0.02em]">
              {current.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
