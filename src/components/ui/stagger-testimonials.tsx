"use client";

import Image, { type StaticImageData } from "next/image";
import React, { useCallback, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

export type StaggerTestimonial = {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string | StaticImageData;
};

interface TestimonialCardProps {
  position: number;
  testimonial: StaggerTestimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 border-stone-950 bg-stone-950 text-stone-50"
          : "z-0 border-stone-300 bg-white text-stone-950 hover:border-stone-500",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px rgb(214 211 209)"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-stone-300"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <div className="mb-4 flex items-center gap-3">
        <Image
          src={testimonial.imgSrc}
          alt={testimonial.by.split(",")[0]}
          width={48}
          height={56}
          className="h-14 w-12 shrink-0 bg-stone-200 object-cover object-top"
          style={{
            boxShadow: "3px 3px 0px rgb(245 245 244)",
          }}
        />
        <p
          className={cn(
            "text-sm font-medium leading-snug",
            isCenter ? "text-stone-200" : "text-stone-600",
          )}
        >
          {testimonial.by}
        </p>
      </div>
      <h3
        className={cn(
          "text-base font-medium leading-relaxed sm:text-xl",
          isCenter ? "text-stone-50" : "text-stone-950",
        )}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
    </div>
  );
};

type StaggerTestimonialsProps = {
  testimonials: StaggerTestimonial[];
  className?: string;
};

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({
  testimonials,
  className,
}) => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  useEffect(() => {
    setTestimonialsList(testimonials);
  }, [testimonials]);

  const handleMove = useCallback((steps: number) => {
    setTestimonialsList((prev) => {
      const newList = [...prev];

      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prev;
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prev;
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }

      return newList;
    });
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      handleMove(1);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [handleMove]);

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-stone-200 bg-opacity-50",
        className,
      )}
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          type="button"
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "border-2 border-stone-300 bg-white hover:border-stone-950 hover:bg-stone-950 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2",
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "border-2 border-stone-300 bg-white hover:border-stone-950 hover:bg-stone-950 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2",
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
