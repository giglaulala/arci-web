"use client";

type StatsMarqueeProps = {
  stats: string[];
};

export function StatsMarquee({ stats }: StatsMarqueeProps) {
  const items = [...stats, ...stats];

  return (
    <section
      className="group border-y border-landing-accent/30 bg-landing-surface py-4"
      id="stats"
    >
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap px-6 group-hover:[animation-play-state:paused]">
          {items.map((stat, index) => (
            <span
              className="inline-flex items-center gap-10 font-mono-label text-xs uppercase tracking-[0.18em] text-landing-text/90"
              key={`${stat}-${index}`}
            >
              <span>{stat}</span>
              <span className="text-landing-accent">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
