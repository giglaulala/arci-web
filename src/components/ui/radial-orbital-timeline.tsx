"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowRight, Link2, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type TimelineItemImage = {
  src: string | StaticImageData;
  alt: string;
};

export type TimelineItem = {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: LucideIcon;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  image?: TimelineItemImage;
};

type RadialOrbitalTimelineProps = {
  timelineData: TimelineItem[];
  className?: string;
  embedded?: boolean;
};

export default function RadialOrbitalTimeline({
  timelineData,
  className,
  embedded = false,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {},
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key, 10) !== id) {
          newState[parseInt(key, 10)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = Math.min(320, 190 + total * 11);
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)),
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  const getStatusLabel = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return "COMPLETE";
      case "in-progress":
        return "IN PROGRESS";
      default:
        return "PENDING";
    }
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center",
        embedded
          ? "min-h-[1040px] overflow-visible bg-transparent sm:min-h-[1120px]"
          : "h-screen overflow-hidden bg-black",
        className,
      )}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative flex min-h-[inherit] w-full max-w-4xl items-center justify-center overflow-visible py-16 sm:py-20">
        <div
          className="absolute flex min-h-[880px] w-full items-center justify-center overflow-visible sm:min-h-[960px]"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute z-10 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.25)]">
            <div className="absolute h-20 w-20 animate-ping rounded-full border border-white/30 opacity-70" />
            <div
              className="absolute h-24 w-24 animate-ping rounded-full border border-white/15 opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="h-8 w-8 rounded-full bg-black" />
          </div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;
            const cardOpensUpward = position.y > 32;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer transition-all duration-700"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={cn(
                    "absolute -inset-1 rounded-full",
                    isPulsing && "animate-pulse duration-1000",
                  )}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                    width: "112px",
                    height: "112px",
                    left: "-16px",
                    top: "-16px",
                  }}
                />

                <div
                  className={cn(
                    "flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isExpanded
                      ? "scale-110 border-white bg-white text-black shadow-lg shadow-white/30"
                      : isRelated
                        ? "animate-pulse border-white bg-white/50 text-black"
                        : "border-white/40 bg-black text-white",
                  )}
                >
                  <Icon size={28} />
                </div>

                <div
                  className={cn(
                    "absolute whitespace-nowrap text-sm font-semibold tracking-wider transition-all duration-300",
                    cardOpensUpward ? "bottom-20" : "top-20",
                    isExpanded
                      ? "scale-125 text-white"
                      : "text-white/70",
                  )}
                >
                  {item.title}
                </div>

                {isExpanded ? (
                  <Card
                    className={cn(
                      "absolute left-1/2 z-[300] w-72 -translate-x-1/2 overflow-visible border-white/30 bg-black/90 shadow-xl shadow-white/10 backdrop-blur-lg sm:w-80",
                      cardOpensUpward ? "bottom-full mb-5" : "top-24",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute left-1/2 h-3 w-px -translate-x-1/2 bg-white/50",
                        cardOpensUpward ? "-bottom-3" : "-top-3",
                      )}
                    />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge
                          className={cn(
                            "px-2 text-xs",
                            getStatusStyles(item.status),
                          )}
                        >
                          {getStatusLabel(item.status)}
                        </Badge>
                        <span className="font-mono-label text-xs text-white/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="mt-2 text-sm text-white">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p className="leading-6">{item.content}</p>

                      {item.image ? (
                        <div className="mt-4 border-t border-white/10 pt-3">
                          <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
                            <Image
                              alt={item.image.alt}
                              className="object-cover grayscale"
                              fill
                              sizes="320px"
                              src={item.image.src}
                            />
                          </div>
                          <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/50">
                            {item.image.alt}
                          </p>
                        </div>
                      ) : null}

                      {item.relatedIds.length > 0 ? (
                        <div className="mt-4 border-t border-white/10 pt-3">
                          <div className="mb-2 flex items-center">
                            <Link2 size={10} className="mr-1 text-white/70" />
                            <h4 className="text-xs font-medium uppercase tracking-wider text-white/70">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (entry) => entry.id === relatedId,
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  className="flex h-6 items-center rounded-none border-white/20 bg-transparent px-2 py-0 text-xs text-white/80 transition-all hover:bg-white/10 hover:text-white"
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-white/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
