import React from 'react';
import {
  SiDjango,
  SiDocker,
  SiFirebase,
  SiFramer,
  SiFastapi,
  SiGithub,
  SiGraphql,
  SiGsap,
  SiFlutter,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiScrollreveal,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiNextdotjs,
} from 'react-icons/si';

const CloudMark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7.5 18.5h8.5a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 6.5 8.5a4.5 4.5 0 0 0 1 10Z" />
  </svg>
);

export interface TechItem {
  name: string;
  color: string;
  tag: string;
  icon: React.ElementType;
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
  { name: 'Next.js', color: '#ffffff', tag: 'Framework', icon: SiNextdotjs },
  { name: 'React', color: '#61dafb', tag: 'UI Library', icon: SiReact },
  { name: 'TypeScript', color: '#3178c6', tag: 'Type Safety', icon: SiTypescript },
  { name: 'TailwindCSS', color: '#38bdf8', tag: 'Styling', icon: SiTailwindcss },
  { name: 'Framer Motion', color: '#e100ff', tag: 'Animations', icon: SiFramer },
  { name: 'Node.js', color: '#539e43', tag: 'Runtime', icon: SiNodedotjs },
  { name: 'Supabase', color: '#3ecf8e', tag: 'Database & Auth', icon: SiSupabase },
  { name: 'PostgreSQL', color: '#4169e1', tag: 'Relational DB', icon: SiPostgresql },
  { name: 'Docker', color: '#2496ed', tag: 'Containerization', icon: SiDocker },
  { name: 'AWS', color: '#ff9900', tag: 'Cloud Infrastructure', icon: CloudMark },
  { name: 'Azure', color: '#0078d4', tag: 'Cloud Platform', icon: CloudMark },
  { name: 'Vercel', color: '#ffffff', tag: 'Edge Deployment', icon: SiVercel },
];

const DEFAULT_ROW_2: TechItem[] = [
  { name: 'Python', color: '#3776ab', tag: 'AI & Data', icon: SiPython },
  { name: 'Django', color: '#092e20', tag: 'Backend Framework', icon: SiDjango },
  { name: 'FastAPI', color: '#009688', tag: 'High-Speed APIs', icon: SiFastapi },
  { name: 'Flutter', color: '#02569b', tag: 'Mobile Engine', icon: SiFlutter },
  { name: 'React Native', color: '#61dafb', tag: 'Cross-Platform', icon: SiReact },
  { name: 'Three.js', color: '#ffffff', tag: '3D WebGL', icon: SiThreedotjs },
  { name: 'GSAP', color: '#88ce02', tag: 'Timeline Motion', icon: SiGsap },
  { name: 'Lenis', color: '#ff0050', tag: 'Smooth Scroll', icon: SiScrollreveal },
  { name: 'GraphQL', color: '#e10098', tag: 'Query API', icon: SiGraphql },
  { name: 'Redis', color: '#dc382d', tag: 'In-Memory Cache', icon: SiRedis },
  { name: 'Firebase', color: '#ffca28', tag: 'Realtime Backend', icon: SiFirebase },
  { name: 'GitHub', color: '#ffffff', tag: 'DevOps & CI/CD', icon: SiGithub },
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
                className="group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#ff0050]/60 transition-all duration-300 cursor-pointer shadow-xl hover:scale-105"
                title={item.name}
                aria-label={item.name}
              >
                <item.icon
                  className="w-6 h-6 sm:w-7 sm:h-7 transition-colors"
                  style={{ color: item.color }}
                />
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
                className="group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#b100ff]/60 transition-all duration-300 cursor-pointer shadow-xl hover:scale-105"
                title={item.name}
                aria-label={item.name}
              >
                <item.icon
                  className="w-6 h-6 sm:w-7 sm:h-7 transition-colors"
                  style={{ color: item.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechStackSection;
