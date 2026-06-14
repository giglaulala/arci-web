"use client";

import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string | StaticImageData;
  posterSrc?: string;
  bgImageSrc: string | StaticImageData;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  id?: string;
  entryFromSectionId?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  id,
  entryFromSectionId,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef(0);
  const mediaFullyExpandedRef = useRef(false);
  const isSnappingRef = useRef(false);

  scrollProgressRef.current = scrollProgress;
  mediaFullyExpandedRef.current = mediaFullyExpanded;

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType, mediaSrc]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const snapSectionToTop = useCallback((behavior: ScrollBehavior = "smooth") => {
    const sectionElement = sectionRef.current;

    if (!sectionElement || isSnappingRef.current) {
      return false;
    }

    const sectionTop = sectionElement.getBoundingClientRect().top;

    if (Math.abs(sectionTop) < 24) {
      return false;
    }

    isSnappingRef.current = true;
    window.scrollBy({ top: sectionTop, behavior });

    window.setTimeout(() => {
      isSnappingRef.current = false;
    }, behavior === "smooth" ? 700 : 0);

    return true;
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }

    const hash = window.location.hash.replace("#", "");

    if (hash !== id) {
      return;
    }

    requestAnimationFrame(() => {
      snapSectionToTop("instant");
    });
  }, [id, snapSectionToTop]);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | undefined;

    const handleScrollEnd = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        if (
          mediaFullyExpandedRef.current ||
          scrollProgressRef.current > 0 ||
          isSnappingRef.current
        ) {
          return;
        }

        const sectionElement = sectionRef.current;

        if (!sectionElement) {
          return;
        }

        const sectionTop = sectionElement.getBoundingClientRect().top;

        if (sectionTop > 24 && sectionTop < window.innerHeight * 0.55) {
          snapSectionToTop();
        }
      }, 120);
    };

    window.addEventListener("scroll", handleScrollEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollEnd);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [snapSectionToTop]);

  useEffect(() => {
    if (!entryFromSectionId) {
      return;
    }

    const fromSection = document.getElementById(entryFromSectionId);
    const sectionElement = sectionRef.current;

    if (!fromSection || !sectionElement) {
      return;
    }

    const shouldHandoff = () => {
      if (
        mediaFullyExpandedRef.current ||
        scrollProgressRef.current > 0 ||
        isSnappingRef.current
      ) {
        return false;
      }

      const fromRect = fromSection.getBoundingClientRect();
      const sectionTop = sectionElement.getBoundingClientRect().top;

      return fromRect.bottom > 80 && sectionTop > 24;
    };

    const handleWheel = (event: globalThis.WheelEvent) => {
      if (event.deltaY <= 0 || !shouldHandoff()) {
        return;
      }

      event.preventDefault();
      snapSectionToTop();
    };

    let touchStart = 0;

    const handleTouchStart = (event: globalThis.TouchEvent) => {
      touchStart = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: globalThis.TouchEvent) => {
      const touchY = event.touches[0]?.clientY ?? touchStart;
      const deltaY = touchStart - touchY;

      if (deltaY <= 12 || !shouldHandoff()) {
        return;
      }

      event.preventDefault();
      snapSectionToTop();
      touchStart = touchY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [entryFromSectionId, snapSectionToTop]);

  const updateProgress = useCallback(
    (deltaY: number) => {
      const scrollDelta = deltaY * (isMobileState ? 0.0045 : 0.0009);
      const newProgress = Math.min(
        Math.max(scrollProgress + scrollDelta, 0),
        1,
      );

      setScrollProgress(newProgress);

      if (newProgress >= 1) {
        setMediaFullyExpanded(true);
        setShowContent(true);
      } else if (newProgress < 0.75) {
        setShowContent(false);
      }
    },
    [isMobileState, scrollProgress],
  );

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const handleWheel = (event: globalThis.WheelEvent) => {
      const sectionTop = sectionElement.getBoundingClientRect().top;
      const isAtSectionTop = Math.abs(sectionTop) < 24;
      const isScrollingBackPastStart = event.deltaY < 0 && scrollProgress <= 0;

      if (mediaFullyExpanded && event.deltaY < 0 && isAtSectionTop) {
        event.preventDefault();
        setMediaFullyExpanded(false);
        updateProgress(event.deltaY);
        return;
      }

      if (!mediaFullyExpanded && !isScrollingBackPastStart) {
        event.preventDefault();
        updateProgress(event.deltaY);
      }
    };

    const handleTouchStart = (event: globalThis.TouchEvent) => {
      setTouchStartY(event.touches[0].clientY);
    };

    const handleTouchMove = (event: globalThis.TouchEvent) => {
      if (!touchStartY) {
        return;
      }

      const touchY = event.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const sectionTop = sectionElement.getBoundingClientRect().top;
      const isAtSectionTop = Math.abs(sectionTop) < 24;
      const isSwipingBackPastStart = deltaY < 0 && scrollProgress <= 0;

      if (mediaFullyExpanded && deltaY < -20 && isAtSectionTop) {
        event.preventDefault();
        setMediaFullyExpanded(false);
        updateProgress(deltaY);
      } else if (!mediaFullyExpanded && !isSwipingBackPastStart) {
        event.preventDefault();
        updateProgress(deltaY);
      }

      setTouchStartY(touchY);
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    sectionElement.addEventListener("wheel", handleWheel, { passive: false });
    sectionElement.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    sectionElement.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    sectionElement.addEventListener("touchend", handleTouchEnd);

    return () => {
      sectionElement.removeEventListener("wheel", handleWheel);
      sectionElement.removeEventListener("touchstart", handleTouchStart);
      sectionElement.removeEventListener("touchmove", handleTouchMove);
      sectionElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, [mediaFullyExpanded, scrollProgress, touchStartY, updateProgress]);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const labelTranslateX = scrollProgress * (isMobileState ? 0 : 150);
  const titleTranslateX = scrollProgress * (isMobileState ? 36 : 150);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";
  const videoSrc = typeof mediaSrc === "string" ? mediaSrc : mediaSrc.src;

  return (
    <div
      className="overflow-x-clip bg-stone-950 text-stone-50 transition-colors duration-700 ease-in-out"
      id={id}
      ref={sectionRef}
    >
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <motion.div
            animate={{ opacity: 1 - scrollProgress }}
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Image
              alt=""
              className="h-full w-full"
              height={1080}
              priority
              sizes="100vw"
              src={bgImageSrc}
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              width={1920}
            />
            <div className="absolute inset-0 bg-stone-950/40" />
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-52 bg-gradient-to-b from-stone-950 via-stone-950/80 to-transparent sm:h-64" />

          <div className="container relative z-10 mx-auto flex flex-col items-center justify-start px-6 sm:px-10">
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center">
              <div
                className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-none"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.35)",
                }}
              >
                {mediaType === "video" ? (
                  <div className="pointer-events-none relative h-full w-full">
                    <video
                      className="h-full w-full rounded-xl object-cover grayscale"
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                      loop
                      muted
                      playsInline
                      poster={posterSrc}
                      preload="auto"
                      src={videoSrc}
                    />
                    <motion.div
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      className="absolute inset-0 rounded-xl bg-black/30"
                      initial={{ opacity: 0.7 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      alt={title || "Media content"}
                      className="h-full w-full rounded-xl object-cover grayscale"
                      height={720}
                      sizes="(min-width: 1024px) 80vw, 95vw"
                      src={mediaSrc}
                      width={1280}
                    />
                    <motion.div
                      animate={{ opacity: 0.65 - scrollProgress * 0.3 }}
                      className="absolute inset-0 rounded-xl bg-black/50"
                      initial={{ opacity: 0.7 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="relative z-10 mt-4 flex flex-col items-center text-center transition-none">
                  {date ? (
                    <p
                      className="max-w-full font-latin text-2xl text-stone-200"
                      style={{ transform: `translateX(-${labelTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  ) : null}
                  {scrollToExpand ? (
                    <p
                      className="max-w-full text-center text-sm font-medium uppercase tracking-[0.28em] text-stone-300"
                      style={{ transform: `translateX(${labelTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  ) : null}
                </div>
              </div>

              <div
                className={`relative z-10 flex w-full flex-col items-center justify-center gap-4 text-center transition-none ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <motion.h2
                  className="max-w-full break-words font-display text-4xl font-bold text-stone-100 transition-none md:text-5xl lg:text-7xl"
                  style={{ transform: `translateX(-${titleTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="max-w-full break-words text-center font-display text-4xl font-bold text-stone-100 transition-none md:text-5xl lg:text-7xl"
                  style={{ transform: `translateX(${titleTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              animate={{ opacity: showContent ? 1 : 0 }}
              className="flex w-full flex-col px-0 py-10 md:px-6 lg:py-20"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
