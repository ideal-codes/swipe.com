import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonialsdata';
import { soundFx } from '../../lib/sound';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const item = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-radial-glow blur-3xl opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#A8A8A8] text-xs font-mono">
            <Quote className="w-3.5 h-3.5 text-[#E61E4D]" />
            CLIENT VERIFICATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Trusted by Visionary Leaders.
          </h2>
          <p className="text-[#A8A8A8] text-base leading-relaxed">
            Read how global engineering leaders partner with SWIPE to transform mission-critical software systems.
          </p>
        </div>

        {/* Testimonial Showcase Card */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8 relative overflow-hidden"
            >
              {/* Star Rating & Company Logo Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#E61E4D] text-[#E61E4D]" />
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-[#A8A8A8]">Case Reference:</span>
                  <span className="text-xs font-mono font-bold text-[#E61E4D] px-3 py-1 rounded-full bg-[#E61E4D]/10 border border-[#E61E4D]/30">
                    {item.projectRef}
                  </span>
                </div>
              </div>

              {/* Quote Content */}
              <blockquote className="text-lg sm:text-2xl font-sans text-neutral-200 leading-relaxed italic">
                "{item.content}"
              </blockquote>

              {/* Author Details */}
              <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                <img
                  src={item.avatarUrl}
                  alt={item.clientName}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover border border-[#E61E4D]/30"
                />
                <div>
                  <h4 className="text-base font-bold font-display text-white">{item.clientName}</h4>
                  <p className="text-xs font-mono text-[#E61E4D]">
                    {item.clientRole}, <span className="text-white">{item.company}</span>
                  </p>
                  <span className="text-[10px] font-mono text-[#A8A8A8] flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified Engineering Client
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={() => {
                soundFx.playClick();
                setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
              }}
              className="p-3 rounded-full border border-white/10 text-white hover:border-[#E61E4D] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playClick();
                    setCurrentIndex(idx);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === idx ? 'bg-[#E61E4D] w-8' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
              }}
              className="p-3 rounded-full border border-white/10 text-white hover:border-[#E61E4D] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
