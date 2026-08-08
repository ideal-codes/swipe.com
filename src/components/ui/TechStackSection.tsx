import React from 'react';

export interface TechItem {
  name: string;
  color: string;
  tag: string;
}

export interface TechStackSectionProps {
  /** Array of tech items for the top row (moving right). Uses defaults if omitted. */
  row1?: TechItem[];
  /** Array of tech items for the bottom row (moving left). Uses defaults if omitted. */
  row2?: TechItem[];
  /** Speed of marquee in seconds (default: 35) */
  speed?: number;
  /** Pause marquee animation on hover (default: true) */
  pauseOnHover?: boolean;
  /** Custom wrapper class name */
  className?: string;
}

// Built-in default tech stack items so the component works standalone
const DEFAULT_ROW_1: TechItem[] = [
  { name: 'Next.js', color: '#ffffff', tag: 'Framework' },
  { name: 'React', color: '#61dafb', tag: 'UI Library' },
  { name: 'TypeScript', color: '#3178c6', tag: 'Type Safety' },
  { name: 'TailwindCSS', color: '#38bdf8', tag: 'Styling' },
  { name: 'Framer Motion', color: '#e100ff', tag: 'Animations' },
  { name: 'Node.js', color: '#539e43', tag: 'Runtime' },
  { name: 'Supabase', color: '#3ecf8e', tag: 'Database & Auth' },
  { name: 'PostgreSQL', color: '#4169e1', tag: 'Relational DB' },
  { name: 'Docker', color: '#2496ed', tag: 'Containerization' },
  { name: 'AWS', color: '#ff9900', tag: 'Cloud Infrastructure' },
  { name: 'Azure', color: '#0078d4', tag: 'Cloud Platform' },
  { name: 'Vercel', color: '#ffffff', tag: 'Edge Deployment' },
];

const DEFAULT_ROW_2: TechItem[] = [
  { name: 'Python', color: '#3776ab', tag: 'AI & Data' },
  { name: 'Django', color: '#092e20', tag: 'Backend Framework' },
  { name: 'FastAPI', color: '#009688', tag: 'High-Speed APIs' },
  { name: 'Flutter', color: '#02569b', tag: 'Mobile Engine' },
  { name: 'React Native', color: '#61dafb', tag: 'Cross-Platform' },
  { name: 'Three.js', color: '#ffffff', tag: '3D WebGL' },
  { name: 'GSAP', color: '#88ce02', tag: 'Timeline Motion' },
  { name: 'Lenis', color: '#ff0050', tag: 'Smooth Scroll' },
  { name: 'GraphQL', color: '#e10098', tag: 'Query API' },
  { name: 'Redis', color: '#dc382d', tag: 'In-Memory Cache' },
  { name: 'Firebase', color: '#ffca28', tag: 'Realtime Backend' },
  { name: 'GitHub', color: '#ffffff', tag: 'DevOps & CI/CD' },
];

export function TechStackSection({
  row1 = DEFAULT_ROW_1,
  row2 = DEFAULT_ROW_2,
  speed = 35,
  pauseOnHover = true,
  className = '',
}: TechStackSectionProps) {
  // Duplicate arrays 4x to ensure seamless loop on wide screens
  const marquee1 = [...row1, ...row1, ...row1, ...row1];
  const marquee2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <div className={`relative w-full py-12 overflow-hidden ${className}`}>
      {/* Embedded self-contained marquee CSS animation styles */}
      <style>{`
        @keyframes tech-marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes tech-marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .tech-animate-right {
          animation: tech-marquee-right ${speed}s linear infinite;
        }
        .tech-animate-left {
          animation: tech-marquee-left ${speed}s linear infinite;
        }
        ${pauseOnHover ? `.tech-animate-right:hover, .tech-animate-left:hover { animation-play-state: paused; }` : ''}
      `}</style>


      <div className="w-full relative z-10 space-y-8">
        {/* Marquee Row 1 (Moving Right →) */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Edge Gradient Fade Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#050508] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#050508] to-transparent z-20 pointer-events-none" />

          <div className="flex w-max tech-animate-right space-x-5">
            {marquee1.map((item, idx) => (
              <div
                key={`m1-${idx}`}
                className="group relative flex items-center gap-3.5 px-7 py-4 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#ff0050]/60 transition-all duration-300 cursor-pointer shadow-xl hover:scale-105"
              >
                <div
                  className="w-3.5 h-3.5 rounded-full shadow-[0_0_12px_currentColor]"
                  style={{ backgroundColor: item.color, color: item.color }}
                />
                <span className="font-bold text-base sm:text-lg text-white group-hover:text-[#ff0050] transition-colors">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 font-semibold">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 (Moving Left ←) */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Edge Gradient Fade Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#050508] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#050508] to-transparent z-20 pointer-events-none" />

          <div className="flex w-max tech-animate-left space-x-5">
            {marquee2.map((item, idx) => (
              <div
                key={`m2-${idx}`}
                className="group relative flex items-center gap-3.5 px-7 py-4 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#b100ff]/60 transition-all duration-300 cursor-pointer shadow-xl hover:scale-105"
              >
                <div
                  className="w-3.5 h-3.5 rounded-full shadow-[0_0_12px_currentColor]"
                  style={{ backgroundColor: item.color, color: item.color }}
                />
                <span className="font-bold text-base sm:text-lg text-white group-hover:text-[#b100ff] transition-colors">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 font-semibold">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechStackSection;
