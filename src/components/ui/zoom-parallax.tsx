'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { cn } from '@/lib/utils';

export interface Image {
  src: string;
  alt?: string;
}

export interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images?: Image[];
}

const localZoomParallaxImages = import.meta.glob(
  '../../../assets/zoom-parallax/*.{png,jpg,jpeg,webp,avif,svg}',
  {
    eager: true,
    import: 'default',
  },
);

export const DEFAULT_IMAGES: Image[] = Object.entries(localZoomParallaxImages)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src], index) => ({
    src: src as string,
    alt: `Zoom parallax image ${index + 1} (${path.split('/').pop()})`,
  }));

export function ZoomParallax({ images = DEFAULT_IMAGES }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
            >
              <div className="relative h-[25vh] w-[25vw] shadow-2xl overflow-hidden rounded-md border border-white/10">
                <img
                  src={src || '/placeholder.svg'}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function DefaultDemo({ images = DEFAULT_IMAGES }: { images?: Image[] }) {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    } catch (err) {
      console.warn('Lenis initialization skipped', err);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#050505] text-slate-200 selection:bg-red-600 selection:text-white antialiased">
      <div className="relative flex h-[50vh] flex-col items-center justify-center px-4 text-center">
        {/* Immersive Glow Spotlight */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.22),transparent_65%)]',
            'blur-[50px]',
          )}
        />
        <div id="scroll-target" className="relative z-10 space-y-4 max-w-2xl mx-auto">
          {/* <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3.5 py-1 text-xs fw-medium tracking-[0.2em] text-red-400 border border-red-500/20 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            SOFTWARE ● AI ● SECURITY
          </div> */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl fw-light tracking-tight text-white">
						         We Build Software <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-red-100 to-slate-400">That Businesses Trust.</span>
					</h1>
          <p className="max-w-lg mx-auto text-sm fw-regular text-slate-400 leading-relaxed">
						  Enterprise software, websites and apps
  built with performance and security first.
					</p>
        </div>
      </div>

      <ZoomParallax images={images} />
    </main>
  );
}
