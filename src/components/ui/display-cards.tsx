"use client";

import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface DisplayCardProps {
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-landing-text" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-landing-text",
  titleClassName = "text-landing-text",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-landing-divider bg-landing-surface/70 px-4 py-3 backdrop-blur-sm transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-landing-bg after:to-transparent after:content-[''] hover:border-white/20 hover:bg-landing-surface [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className,
      )}
    >
      <div>
        <span
          className={cn(
            "relative inline-block rounded-full bg-landing-divider p-1",
            iconClassName,
          )}
        >
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="line-clamp-2 text-sm leading-5 text-landing-text/90">
        {description}
      </p>
      <p className="font-mono-label text-xs uppercase tracking-[0.14em] text-landing-muted">
        {date}
      </p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
  className?: string;
}

export default function DisplayCards({ cards, className }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[100%] before:rounded-xl before:bg-landing-bg/50 before:bg-blend-overlay before:outline-1 before:outline-landing-divider before:transition-opacity before:duration-700 before:content-[''] hover:grayscale-0 hover:before:opacity-0 grayscale-[100%]",
    },
    {
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[100%] before:rounded-xl before:bg-landing-bg/50 before:bg-blend-overlay before:outline-1 before:outline-landing-divider before:transition-opacity before:duration-700 before:content-[''] hover:grayscale-0 hover:before:opacity-0 grayscale-[100%]",
    },
    {
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards ?? defaultCards;

  return (
    <div
      className={cn(
        "grid animate-fade-in place-items-center opacity-0 [grid-template-areas:'stack']",
        className,
      )}
    >
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
