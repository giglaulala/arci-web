"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import type { Project } from "@/types/content";
import { resolveSiteImage } from "@/lib/site-images";

const eras: Array<{ label: string; value: "all" | Project["era"] }> = [
  { label: "ყველა პერიოდი", value: "all" },
  { label: "198x წელი", value: "1980s" },
  { label: "1994-2001 წლები", value: "1994-2001" },
  { label: "2008-2018 წლები", value: "2008-2018" },
  { label: "2018 წლიდან დღემდე", value: "2018-present" },
];

export function ProjectArchive({ projects }: { projects: Project[] }) {
  const [activeEra, setActiveEra] =
    useState<(typeof eras)[number]["value"]>("all");

  const visibleProjects = useMemo(() => {
    if (activeEra === "all") {
      return projects;
    }

    return projects.filter((project) => project.era === activeEra);
  }, [activeEra, projects]);

  return (
    <div className="mt-12">
      <div
        aria-label="Project era filters"
        className="flex gap-8 overflow-x-auto border-b border-white/15 pb-px"
        role="tablist"
      >
        {eras.map((era) => {
          const isActive = era.value === activeEra;

          return (
            <button
              aria-selected={isActive}
              className={`relative shrink-0 pb-5 font-display text-xl font-semibold tracking-[-0.04em] transition sm:text-2xl ${
                isActive
                  ? "text-white"
                  : "text-stone-500 hover:text-stone-200"
              }`}
              key={era.value}
              onClick={() => setActiveEra(era.value)}
              role="tab"
              type="button"
            >
              {era.label}
              <span
                className={`absolute -bottom-px left-0 h-px bg-white transition-all duration-300 ${
                  isActive ? "w-full" : "w-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 bg-stone-100 py-10 text-stone-950 sm:py-12">
        <div className="mx-auto max-w-7xl overflow-x-auto px-6 pb-3 sm:px-10">
          <div className="flex min-w-max gap-5">
            {visibleProjects.map((project, index) => {
              const isLead = index === 0;

              return (
                <article
                  className={`group grid min-h-[21rem] w-[min(86vw,34rem)] shrink-0 content-between p-6 shadow-sm transition duration-500 sm:p-7 ${
                    isLead
                      ? "bg-stone-50"
                      : "bg-stone-200/80 opacity-45 hover:opacity-80"
                  }`}
                  key={project.slug}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-latin text-xs uppercase tracking-[0.22em] text-stone-500">
                        {project.era} / {project.year}
                      </p>
                      <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-3xl">
                        {project.title}
                      </h3>
                    </div>
                    <span className="font-latin text-xs uppercase tracking-[0.22em] text-stone-400">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mt-8 grid gap-5 sm:grid-cols-[1fr_0.82fr] sm:items-end">
                    <p className="text-sm leading-7 text-stone-600 sm:text-base">
                      {project.summary}
                    </p>
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-300">
                      <Image
                        alt={project.image.alt}
                        className={`object-cover grayscale transition duration-700 group-hover:scale-105 ${
                          isLead ? "group-hover:grayscale-0" : ""
                        }`}
                        fill
                        sizes="(min-width: 1024px) 18rem, 45vw"
                        src={resolveSiteImage(project.image.src)}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
