"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import type { Project } from "@/types/content";

const eras: Array<{ label: string; value: "all" | Project["era"] }> = [
  { label: "ყველა", value: "all" },
  { label: "1980s", value: "1980s" },
  { label: "1994-2001", value: "1994-2001" },
  { label: "2008-2018", value: "2008-2018" },
  { label: "2018-present", value: "2018-present" },
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
    <div>
      <div
        aria-label="Project era filters"
        className="mb-12 flex flex-wrap gap-2 border-y border-stone-300 py-4"
        role="tablist"
      >
        {eras.map((era) => {
          const isActive = era.value === activeEra;

          return (
            <button
              aria-selected={isActive}
              className={`rounded-full px-4 py-2 text-sm transition ${
                isActive
                  ? "bg-stone-950 text-white"
                  : "bg-white text-stone-600 hover:bg-stone-200"
              }`}
              key={era.value}
              onClick={() => setActiveEra(era.value)}
              role="tab"
              type="button"
            >
              {era.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <article className="group" key={project.slug}>
            <div className="relative aspect-[5/4] overflow-hidden bg-stone-200">
              <Image
                alt={project.image.alt}
                className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                src={project.image.src}
              />
            </div>
            <div className="mt-5 border-t border-stone-300 pt-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-stone-500">
                <span>{project.era}</span>
                <span>{project.year}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                {project.title}
              </h3>
              <p className="mt-3 leading-7 text-stone-600">{project.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
