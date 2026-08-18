import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Bot,
  ShieldCheck,
  Palette,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Cpu,
  Database,
  Zap,
  Lock,
  Layout,
  X,
  Layers,
} from 'lucide-react';

// ==========================================
// TYPES
// ==========================================
export interface ServiceCardData {
  id: string;
  title: string;
  subtitle: string;
  category: 'engineering' | 'ai' | 'security' | 'design';
  categoryLabel: string;
  description: string;
  features: string[];
  isLarge: boolean;
  badge: string;
  icon: React.ElementType;
  accentColor: string;
  technicalSpecs: {
    architectures: string[];
    technologies: string[];
    deliverables: string[];
    averageTimeline: string;
  };
}

export type FilterCategory = 'all' | 'engineering' | 'ai' | 'security' | 'design';

// ==========================================
// SERVICES DATA
// ==========================================
export const servicesData: ServiceCardData[] = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    subtitle: 'High Performance & Scale',
    category: 'engineering',
    categoryLabel: 'ENGINEERING',
    description: 'Build scalable, secure, and high-performance software tailored specifically to your business goals.',
    features: ['Web Applications', 'Enterprise Systems', 'CRM & ERP Platforms', 'REST & GraphQL APIs'],
    isLarge: true,
    badge: 'CORE ENGINE',
    icon: Code2,
    accentColor: '#E50914',
    technicalSpecs: {
      architectures: ['Microservices & Serverless', 'Event-Driven Architecture', 'Distributed Databases'],
      technologies: ['TypeScript', 'Node.js', 'Rust', 'GraphQL', 'PostgreSQL', 'Docker'],
      deliverables: ['Production Codebase', 'API Documentation', 'CI/CD Pipelines', 'Load Testing Report'],
      averageTimeline: '4 – 8 Weeks',
    },
  },
  {
    id: 'ai-automation',
    title: 'AI Automation & Agents',
    subtitle: 'Autonomous Workflows',
    category: 'ai',
    categoryLabel: 'INTELLIGENCE',
    description: 'Automate repetitive tasks, streamline operations, and integrate intelligent conversational AI agents.',
    features: ['AI Assistants & Chatbots', 'Workflow Automation', 'Predictive Business Insights'],
    isLarge: false,
    badge: 'AI MATRIX',
    icon: Bot,
    accentColor: '#E50914',
    technicalSpecs: {
      architectures: ['Retrieval Augmented Generation (RAG)', 'Agentic Multimodal Pipelines', 'Vector Databases'],
      technologies: ['Gemini API', 'LangChain', 'Pinecone', 'Python', 'FastAPI'],
      deliverables: ['Trained AI Agents', 'Custom RAG Engine', 'Workflow Triggers', 'Analytics Dashboard'],
      averageTimeline: '2 – 4 Weeks',
    },
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Compliance',
    subtitle: 'Zero-Trust Protection',
    category: 'security',
    categoryLabel: 'SECURITY',
    description: 'Protect your enterprise infrastructure, user data, and APIs using industry-leading security practices.',
    features: ['Penetration Testing', 'Security Audits', 'Secure Architecture'],
    isLarge: false,
    badge: 'ZERO TRUST',
    icon: ShieldCheck,
    accentColor: '#E50914',
    technicalSpecs: {
      architectures: ['Zero-Trust Architecture', 'SOC 2 Type II Compliance', 'Automated Security Scans'],
      technologies: ['WAF Enforcement', 'OAuth2 / OIDC', 'KMS Encryption', 'SIEM Integration'],
      deliverables: ['Penetration Audit Report', 'Remediation Plan', 'Hardened Infrastructure', 'Compliance Certificate'],
      averageTimeline: '1 – 3 Weeks',
    },
  },
  {
    id: 'uiux-design',
    title: 'UI/UX Design & Systems',
    subtitle: 'World-Class Interfaces',
    category: 'design',
    categoryLabel: 'CREATIVE',
    description: 'Craft intuitive, engaging, and visually stunning digital product experiences that users love.',
    features: ['UI/UX Product Design', 'User Experience Research', 'Scalable Design Systems', 'Interactive Prototypes'],
    isLarge: true,
    badge: 'DESIGN SYSTEM',
    icon: Palette,
    accentColor: '#E50914',
    technicalSpecs: {
      architectures: ['Atomic Design Token Systems', 'Responsive Micro-Interactions', 'WCAG AA Accessibility'],
      technologies: ['Figma', 'Framer Motion', 'Tailwind CSS', 'Design Tokens', 'Storybook'],
      deliverables: ['Figma Component Library', 'Interactive Prototype', 'Design Tokens Schema', 'Handoff Specs'],
      averageTimeline: '3 – 5 Weeks',
    },
  },
];

// ==========================================
// VISUAL PREVIEW MOCKUPS
// ==========================================
const CardPreview: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'custom-software':
      return (
        <div className="p-3 bg-black/60 rounded-xl border border-white/10 fw-regular text-[11px] leading-relaxed text-white/80 space-y-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-white/10 text-[10px] text-white/40">
            <span className="flex items-center gap-1.5"><Terminal className="w-3 h-3 text-[#E50914]" /> deploy.ts</span>
            <span className="text-emerald-400 fw-semibold">11.4ms SLA</span>
          </div>
          <div className="text-rose-400">export async function <span className="text-white fw-semibold">deployCluster</span>() &#123;</div>
          <div className="pl-3 text-amber-300/90">await SwipeCloud.provision(&#123; region: <span className="text-emerald-300">'us-east-1'</span>, autoScale: true &#125;);</div>
          <div className="text-rose-400">&#125;</div>
        </div>
      );
    case 'ai-automation':
      return (
        <div className="p-3 bg-black/60 rounded-xl border border-white/10 fw-regular text-[11px] space-y-2">
          <div className="flex items-center justify-between text-[10px] text-white/50">
            <span className="flex items-center gap-1 text-[#E50914] fw-semibold"><Zap className="w-3 h-3 fill-current" /> AI Pipeline</span>
            <span className="text-emerald-400 fw-semibold">98.4% Accuracy</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center text-[9px]">
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80">Inbound Webhook</div>
            <div className="p-1.5 rounded-lg bg-[#E50914]/20 border border-[#E50914]/40 text-white fw-semibold">Gemini 2.5 RAG</div>
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80">Auto-Dispatch</div>
          </div>
        </div>
      );
    case 'cybersecurity':
      return (
        <div className="p-3 bg-black/60 rounded-xl border border-white/10 flex items-center justify-between fw-regular text-[11px]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E50914]/15 border border-[#E50914]/40 flex items-center justify-center text-[#E50914]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white fw-bold text-[12px]">Zero-Trust Engine</div>
              <div className="text-[10px] text-white/50">14,820 Threats Defended</div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] fw-bold">
            PROTECTED
          </span>
        </div>
      );
    case 'uiux-design':
      return (
        <div className="p-3 bg-black/60 rounded-xl border border-white/10 flex items-center justify-between fw-regular text-[11px]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white fw-bold text-[12px]">Design Tokens v3.0</div>
              <div className="text-[10px] text-white/50">Figma • React • Tailwind</div>
            </div>
          </div>
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E50914]" />
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
        </div>
      );
    default:
      return null;
  }
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export const ServicesSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedCard, setSelectedCard] = useState<ServiceCardData | null>(null);

  const filteredCards = servicesData.filter((card) => {
    if (activeFilter === 'all') return true;
    return card.category === activeFilter;
  });

  return (
    <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-white fw-font">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E50914] opacity-10 blur-[150px] pointer-events-none rounded-full" />

      {/* Header & Filter Controls */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-4 relative z-10">
        {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E50914]/40 bg-[#E50914]/10 text-[11px] fw-bold tracking-[0.18em] text-[#E50914] uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OUR CAPABILITIES</span>
        </div> */}

        <h2 className="text-3xl sm:text-5xl fw-semibold text-white tracking-tight">
          Strategic Engineering for Modern Software Teams.
        </h2>

        <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
          From custom cloud software to automated AI pipelines, we deliver scalable engineering tailored to your growth.
        </p>

        {/* Filter Tabs */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Services', icon: Layers },
            { id: 'engineering', label: 'Custom Software', icon: Cpu },
            { id: 'ai', label: 'AI Automation', icon: Zap },
            { id: 'security', label: 'Cybersecurity', icon: ShieldCheck },
            { id: 'design', label: 'UI/UX Design', icon: Palette },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeFilter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveFilter(item.id as FilterCategory)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs fw-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#E50914] text-white shadow-lg shadow-[#E50914]/30 border border-[#E50914]'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
        {filteredCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setSelectedCard(card)}
              className={`group relative cursor-pointer rounded-3xl p-6 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#E50914]/50 transition-all duration-300 flex flex-col justify-between ${
                card.isLarge ? 'lg:col-span-2' : 'lg:col-span-1'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:border-[#E50914] group-hover:text-[#E50914] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] fw-semibold tracking-wider text-white/70 uppercase">
                    {card.categoryLabel}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl fw-bold text-white group-hover:text-rose-100 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/70 mt-1 line-clamp-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  {card.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5 text-xs text-white/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <CardPreview id={card.id} />

                <div className="pt-2 flex items-center justify-between text-xs fw-semibold text-white/80 border-t border-white/10 group-hover:text-white">
                  <span className="flex items-center gap-1">
                    <span>Architecture Specs</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#E50914] group-hover:border-[#E50914] group-hover:translate-x-1 transition-all">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tech Specs Modal */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#0c0c0c] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white"
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914] text-[10px] fw-bold uppercase">
                  {selectedCard.categoryLabel} SPECIFICATIONS
                </span>
                <h3 className="text-2xl fw-extrabold">{selectedCard.title}</h3>
                <p className="text-xs text-white/70">{selectedCard.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                <div className="space-y-2">
                  <h4 className="fw-bold text-white/50 uppercase text-[10px]">Architecture Patterns</h4>
                  <ul className="space-y-1">
                    {selectedCard.technicalSpecs.architectures.map((arch, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                        <span>{arch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="fw-bold text-white/50 uppercase text-[10px]">Deliverables</h4>
                  <ul className="space-y-1">
                    {selectedCard.technicalSpecs.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs fw-regular text-white/60 bg-white/5 p-3 rounded-xl border border-white/10">
                <span>Avg. Timeline: <strong className="text-white">{selectedCard.technicalSpecs.averageTimeline}</strong></span>
                <span>Stack: <strong className="text-white">{selectedCard.technicalSpecs.technologies.slice(0, 3).join(', ')}</strong></span>
              </div>

              <button
                onClick={() => setSelectedCard(null)}
                className="w-full py-3 rounded-xl bg-[#E50914] hover:bg-rose-600 fw-bold text-xs uppercase tracking-wider transition-colors"
              >
                Close Architecture Overview
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
