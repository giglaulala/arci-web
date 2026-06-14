"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useState } from "react";

type GalleryImage = {
  src: StaticImageData;
  alt: string;
  label: string;
  place: string;
};

type YourHomeGalleryProps = {
  images: GalleryImage[];
};

const pad = (value: number) => value.toString().padStart(2, "0");

export function YourHomeGallery({ images }: YourHomeGalleryProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (next: number) => {
      const total = images.length;
      const wrapped = (next + total) % total;
      setDirection(next > active ? 1 : -1);
      setActive(wrapped);
    },
    [active, images.length],
  );

  const current = images[active];

  return (
    <div
      className="select-none"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          goTo(active + 1);
        }
        if (event.key === "ArrowLeft") {
          goTo(active - 1);
        }
      }}
      role="group"
      aria-roledescription="carousel"
      aria-label="ფოტო გალერეა"
      tabIndex={0}
    >
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono-label text-[0.7rem] uppercase tracking-[0.42em] text-stone-500">
            Gallery / 0{images.length}
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em]">
            ფოტო გალერეა
          </h2>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-mono-label text-sm tracking-[0.2em] text-stone-400">
            {pad(active + 1)}
            <span className="mx-1 text-stone-600">—</span>
            {pad(images.length)}
          </span>
          <div className="flex gap-2">
            <button
              aria-label="წინა ფოტო"
              className="grid h-11 w-11 place-items-center border border-white/15 text-white transition hover:border-white hover:bg-white hover:text-stone-950"
              onClick={() => goTo(active - 1)}
              type="button"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="შემდეგი ფოტო"
              className="grid h-11 w-11 place-items-center border border-white/15 text-white transition hover:border-white hover:bg-white hover:text-stone-950"
              onClick={() => goTo(active + 1)}
              type="button"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-stone-800 md:aspect-[16/8]">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="absolute inset-0"
            custom={direction}
            exit={{ opacity: 0, x: direction * -40 }}
            initial={{ opacity: 0, x: direction * 40 }}
            key={current.label}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              alt={current.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              src={current.src}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 flex items-end gap-4 p-6 sm:p-8">
              <span className="font-mono-label text-5xl font-light leading-none text-white/40 sm:text-6xl">
                {pad(active + 1)}
              </span>
              <div className="pb-1">
                <p className="font-mono-label text-[0.65rem] uppercase tracking-[0.35em] text-stone-300">
                  {current.place}
                </p>
                <p className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                  {current.label}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {images.map((image, index) => (
          <button
            aria-current={index === active}
            aria-label={image.label}
            className="group relative h-1 overflow-hidden bg-white/15"
            key={image.label}
            onClick={() => goTo(index)}
            type="button"
          >
            <span
              className={`absolute inset-0 origin-left bg-white transition-transform duration-500 ${
                index === active
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100 group-hover:bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
