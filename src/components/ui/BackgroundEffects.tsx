import React, { useEffect, useRef } from 'react';

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create 60 ambient particles
    const particleCount = 60;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1, // Float upward slowly
      size: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.4 ? '#E61E4D' : '#FFFFFF',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        if (p.color === '#E61E4D') {
          ctx.shadowColor = '#E61E4D';
          ctx.shadowBlur = 8;
        }

        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Black Base */}
      <div className="absolute inset-0 bg-[#080808]" />

      {/* 2. SVG Noise Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-30" />

      {/* 3. Red Radial Glows */}
      {/* Center Primary Red Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(230,30,77,0.14)_0%,rgba(0,0,0,0)_70%)] rounded-full blur-3xl" />
      
      {/* Top Right Crimson Accent Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,45,85,0.08)_0%,rgba(0,0,0,0)_70%)] rounded-full blur-3xl" />

      {/* Bottom Left Subtle Glow */}
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(230,30,77,0.06)_0%,rgba(0,0,0,0)_70%)] rounded-full blur-3xl" />

      {/* 4. Perspective Grid Texture */}
      <div className="absolute inset-0 bg-grid-perspective opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      {/* 5. Soft Moving Light Beams */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[1200px] bg-gradient-to-br from-[#E61E4D]/10 via-transparent to-transparent rotate-45 transform blur-3xl animate-pulse-glow" />

      {/* 6. Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
