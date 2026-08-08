"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TEAM_MEMBERS } from "@/data/teamData";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface CoverflowSlide {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  meta?: { label: string; value: string }[];
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  rotate?: number;
  depth?: number;
  perspective?: number;
  falloff?: number;
  fade?: number;
  cardWidth?: string;
  gap?: number;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  label?: string;
  onActiveChange?: (index: number) => void;
  onCardClick?: (index: number) => void;
  className?: string;
  cardClassName?: string;
}

export function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(140px, 55vw, 250px)",
  gap = 0.05,
  loop = true,
  autoPlay = false,
  autoPlayInterval = 3500,
  showCaption = false,
  showPagination = false,
  showNavigation = false,
  label = "Cover carousel",
  onActiveChange,
  onCardClick,
  className,
  cardClassName,
}: CoverflowCarouselProps) {
  const count = slides.length;

  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const posRef = React.useRef(0);
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number;
    x: number;
    pos: number;
    v: number;
    t: number;
  } | null>(null);

  const [selected, setSelected] = React.useState(0);

  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const [isHovered, setIsHovered] = React.useState(false);

  const settle = React.useCallback(
    (target: number, customDuration?: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;

      const startPos = posRef.current;
      const distance = target - startPos;
      if (Math.abs(distance) < 0.0001) {
        posRef.current = target;
        setSelected(indexAt(target));
        paint();
        return;
      }

      const duration =
        customDuration ??
        Math.min(1200, Math.max(800, Math.abs(distance) * 850));
      const startTime = performance.now();

      const easeInOutSine = (x: number): number =>
        -(Math.cos(Math.PI * x) - 1) / 2;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeInOutSine(progress);

        posRef.current = startPos + distance * eased;
        const newIndex = indexAt(posRef.current);
        setSelected(newIndex);
        paint();

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          posRef.current = target;
          setSelected(indexAt(target));
          paint();
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint],
  );

  const clamp = React.useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );

  const goTo = React.useCallback(
    (index: number) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle],
  );

  const nudge = React.useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  React.useEffect(() => {
    onActiveChange?.(selected);
  }, [selected, onActiveChange]);

  React.useEffect(() => {
    if (!autoPlay || count === 0 || isHovered) return;
    const interval = setInterval(() => {
      nudge(1);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, count, nudge, isHovered]);

  const handleCardClick = React.useCallback(
    (index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      goTo(index);
      onCardClick?.(index);
    },
    [goTo, onCardClick],
  );

  const active = slides[selected];

  return (

    
    <div
      className={cn("w-full", className)}
      style={{ ["--cf-card" as string]: cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            }
          }}
          className="cursor-grab overflow-hidden py-8 sm:py-10 outline-none ring-ring focus-visible:ring-2 active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            touchAction: "pan-y",
          }}
        >
          <div
            className="relative select-none"
            style={{
              height: "calc(var(--cf-card) * 1.35)",
              transformStyle: "preserve-3d",
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                role="button"
                tabIndex={0}
                aria-roledescription="slide"
                aria-label={`${slide.title || index + 1} of ${count}`}
                onClick={(e) => handleCardClick(index, e)}
                className={cn(
                  "absolute left-1/2 top-0 aspect-[3/4] overflow-hidden rounded-2xl bg-white/10 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/20 will-change-[transform,opacity] cursor-pointer group transition-colors duration-300 hover:ring-[#E61E4D]/60",
                  cardClassName,
                )}
                style={{ width: "var(--cf-card)" }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => nudge(-1)}
              className="absolute left-3 sm:left-6 top-1/2 z-[200] -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2.5 sm:p-3 text-white/80 backdrop-blur-md transition hover:bg-black/80 hover:text-white hover:scale-110 active:scale-95 shadow-xl"
            >
              <ChevronLeft className="size-5 sm:size-6" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => nudge(1)}
              className="absolute right-3 sm:right-6 top-1/2 z-[200] -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2.5 sm:p-3 text-white/80 backdrop-blur-md transition hover:bg-black/80 hover:text-white hover:scale-110 active:scale-95 shadow-xl"
            >
              <ChevronRight className="size-5 sm:size-6" />
            </button>
          </>
        )}
      </div>

      {showCaption && active?.title && (
        <div
          key={selected}
          className="mt-6 flex flex-col items-center px-4 duration-300 animate-in fade-in"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display italic text-white tracking-wide text-center">
            {active.title}
          </h2>
          {active.subtitle && (
            <p className="mt-1 text-xs sm:text-sm font-medium text-[#E61E4D] tracking-[0.2em] uppercase text-center">
              {active.subtitle}
            </p>
          )}
          {active.meta && active.meta.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-6 sm:gap-10 border-t border-white/10 pt-4 text-xs">
              {active.meta.map((row) => (
                <div key={row.label} className="flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">
                    {row.label}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showPagination && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => goTo(index)}
              className={cn(
                "size-2 rounded-full transition-all duration-300",
                index === selected
                  ? "bg-[#E61E4D] w-5 shadow-[0_0_30px_rgba(230,30,77,0.25)]"
                  : "bg-white/30 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TeamShowcase() {
  const [, setActiveMemberIndex] = React.useState<number>(0);

  const teamSlides: CoverflowSlide[] = React.useMemo(() => {
    return TEAM_MEMBERS.map((member) => ({
      src: member.avatar,
      alt: member.name,
      title: member.name,
      subtitle: `${member.role} • ${member.department}`,
      meta: [
        { label: "Location", value: member.location },
        { label: "Experience", value: member.experience },
      ],
    }));
  }, []);

  return (

    
    <div className="relative w-full space-y-6 sm:space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#A8A8A8] text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E61E4D] animate-pulse" />
          TEAM VERIFICATION
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          Meet the People Behind SWIPE.
        </h2>
        <p className="text-[#A8A8A8] text-base leading-relaxed">
          The team combines product thinking, engineering depth, and design precision to build premium software experiences.
        </p>
      </div>

      <div className="relative bg-gradient-to-b from-white/5 via-white/[0.02] to-transparent border border-white/10 rounded-3xl p-4 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Ambient Backlight Glow */}
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[250px] sm:h-[350px] bg-[#E61E4D]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full relative z-10 py-4 sm:py-6">
          <CoverflowCarousel
            slides={teamSlides}
            rotate={44}
            depth={0.6}
            perspective={3.0}
            cardWidth="clamp(150px, 20vw, 250px)"
            loop={true}
            autoPlay={true}
            autoPlayInterval={3000}
            showNavigation={true}
            showPagination={true}
            showCaption={true}
            onActiveChange={(newIdx) => {
              setActiveMemberIndex(newIdx);
            }}
          />
        </div>
      </div>
    </div>
  );
}
