import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
import { LIFE_AT_SWIPE } from '../../data/testimonialsdata';
import { soundFx } from '../../lib/sound';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIFE_AT_SWIPE.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const item = LIFE_AT_SWIPE[currentIndex];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-radial-glow blur-3xl opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#A8A8A8] text-xs fw-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#E61E4D]" />
            LIFE @ SWIPE
          </div> */}
          <h2 className="text-3xl sm:text-5xl fw-semibold text-white tracking-tight">
            Life @ Swipe
          </h2>
          <p className="text-[#A8A8A8] text-base leading-relaxed">
            Hear it from the people who started it. SWIPE is a student-built startup, and this is what it feels like from the inside.
          </p>
        </div>

        {/* Life at Swipe Showcase Card */}
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
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-xs fw-regular text-[#A8A8A8]">Perspective:</span>
                  <span className="text-xs fw-semibold text-[#E61E4D] px-3 py-1 rounded-full bg-[#E61E4D]/10 border border-[#E61E4D]/30">
                    Student Startup Story
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Quote className="w-4 h-4 text-[#E61E4D]" />
                  <span className="text-xs fw-medium text-white/70 uppercase tracking-[0.2em]">
                    {item.projectRef}
                  </span>
                </div>
              </div>

              {/* Quote Content */}
              <blockquote className="text-lg sm:text-2xl fw-light text-neutral-200 leading-relaxed italic">
                "{item.content}"
              </blockquote>

              {/* Author Details */}
              <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                <img
                  src={item.avatarUrl}
                  alt={item.clientName}
                  className="w-16 h-16 rounded-2xl object-cover border border-[#E61E4D]/30"
                />
                <div>
                  <h4 className="text-base fw-bold text-white">{item.clientName}</h4>
                  <p className="text-xs fw-medium text-[#E61E4D]">
                    {item.clientRole} <span className="text-white">- {item.company}</span>
                  </p>
                  <span className="text-[10px] fw-regular text-[#A8A8A8] flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Built from the student startup floor
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
                setCurrentIndex((prev) => (prev - 1 + LIFE_AT_SWIPE.length) % LIFE_AT_SWIPE.length);
              }}
              className="p-3 rounded-full border border-white/10 text-white hover:border-[#E61E4D] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex space-x-2">
              {LIFE_AT_SWIPE.map((_, idx) => (
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
                setCurrentIndex((prev) => (prev + 1) % LIFE_AT_SWIPE.length);
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
