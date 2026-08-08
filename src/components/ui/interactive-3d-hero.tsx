'use client';

import React, { useRef, useState, useCallback, useEffect, Suspense, lazy } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';
import { Eye, Sparkles } from 'lucide-react';

// Utility helper for class names merging
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

// ----------------------------------------------------------------------
// 1. SplineScene Component (Lazy loaded 3D canvas)
// ----------------------------------------------------------------------
const Spline = lazy(() => import('@splinetool/react-spline'));

export interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-zinc-900/50 rounded-2xl border border-white/5">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-zinc-300 font-mono">Loading 3D Model...</span>
          </div>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}

// ----------------------------------------------------------------------
// 2. Spotlight Component (Cursor Mouse Hover Radial Glow)
// ----------------------------------------------------------------------
export interface SpotlightProps {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
  fill?: string;
}

export function Spotlight({
  className,
  size = 240,
  springOptions = { bounce: 0, damping: 25, stiffness: 200 },
  fill = "rgba(255, 255, 255, 0.85)"
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        if (getComputedStyle(parent).position === 'static') {
          parent.style.position = 'relative';
        }
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
      setIsHovered(true);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) return;

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', () => setIsHovered(true));
    parentElement.addEventListener('mouseleave', () => setIsHovered(false));

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', () => setIsHovered(true));
      parentElement.removeEventListener('mouseleave', () => setIsHovered(false));
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full blur-2xl transition-opacity duration-300 z-10',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        background: `radial-gradient(circle at center,
${fill} 0%,
rgba(239,68,68,.18) 35%,
rgba(239,68,68,.08) 60%,
rgba(239,68,68,.03) 80%,
transparent 100%)`
      }}
    />
  );
}

// ----------------------------------------------------------------------
// 3. Card Base Component
// ----------------------------------------------------------------------
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-hidden rounded-3xl border border-zinc-800 bg-black text-white shadow-[0_10px_50px_rgba(239,68,68,0.12)]",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// ----------------------------------------------------------------------
// 4. Combined Ready-To-Use Interactive3DHero Component
// ----------------------------------------------------------------------
export interface Interactive3DHeroProps {
  sceneUrl?: string;
  spotlightSize?: number;
  spotlightFill?: string;
  title1?: string;
  desc1?: string;
  title2?: string;
  desc2?: string;
}

export function Interactive3DHero({
  sceneUrl = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
  spotlightSize = 240,
  spotlightFill = "rgba(239, 68, 68, 0.55)",
  title1 = "Vision",
  desc1 = "Pioneering spatial 3D interfaces that transform static visual experiences into fluid, human-centric digital interactions.",
  title2 = "Mission",
  desc2 = "Empowering creators to build real-time interactive 3D web environments with uncompromised performance and aesthetic clarity."
}: Interactive3DHeroProps) {
  return (

    
    <Card className="w-full min-h-[520px] md:h-[600px] lg:h-[660px] p-6 sm:p-10 lg:p-16 group flex flex-col justify-between">

      
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <Spotlight size={spotlightSize} fill={spotlightFill} />

      <div className="flex flex-col md:flex-row h-full items-center gap-6 md:gap-10 relative z-10">
        {/* Left Column: Glassmorphism Vision Cards */}
        <div className="flex-1 lg:flex-[0.9] relative z-10 flex flex-col justify-center gap-4 sm:gap-6 pr-0 md:pr-2 pb-4 md:pb-0 h-full w-full">
          {/* Glass Box 1 */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-red-500/[0.05] backdrop-blur-xl border border-red-500/10 shadowshadow-[0_10px_50px_rgba(239,68,68,0.12)]-2xl hover:bg-red-500/[0.08] hover:border-red-500/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-white">
                <Eye className="w-5 h-5 text-red-300" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {title1}
              </h2>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {desc1}
            </p>
          </div>
          {/* Glass Box 2 */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-red-500/[0.05]
 backdrop-blur-xl border border-red-500/10 shadowshadow-[0_10px_50px_rgba(239,68,68,0.12)]-2xl hover:bg-red-500/[0.08] hover:border-red-500/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-red-500/10
 border border-red-500/20 text-white">
                <Sparkles className="w-5 h-5 text-zinc-100" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {title2}
              </h2>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {desc2}
            </p>
          </div>
        </div>

        {/* Right Column: 3D Spline Canvas */}
        <div className="flex-1 lg:flex-[1.1] relative w-full h-[320px] sm:h-[400px] md:h-full">
          <SplineScene scene={sceneUrl} className="w-full h-full" />
        </div>
      </div>
    </Card>
  );
}

export default Interactive3DHero;
