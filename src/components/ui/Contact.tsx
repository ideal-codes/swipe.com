import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Calendar, Clock, Send, CheckCircle2, Globe, Building, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LOCATIONS } from '../../data/testimonialsdata';
import { LocationItem } from '@/types';
import { soundFx } from '../../lib/sound';

export const Contact: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<LocationItem>(LOCATIONS[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Custom Web Engineering',
    budget: '$50k - $100k',
    message: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [localTimes, setLocalTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const times: Record<string, string> = {};
      LOCATIONS.forEach((loc) => {
        try {
          times[loc.id] = new Intl.DateTimeFormat('en-US', {
            timeZone: loc.timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }).format(new Date());
        } catch {
          times[loc.id] = '12:00 PM';
        }
      });
      setLocalTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    soundFx.playSuccess();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E61E4D', '#FF2D55', '#FFFFFF']
    });

    setSubmitted(true);
  };

  const timeSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  return (
    <section id="contact" className="py-24  relative overflow-hidden border-t border-white/5">
      {/* Radial ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-radial-bottom-glow blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E61E4D]/30 bg-[#E61E4D]/10 text-[#FF2D55] text-xs fw-medium">
            <Mail className="w-3.5 h-3.5" />
            CONTACT / DISCOVERY
          </div> */}
          <h2 className="text-3xl sm:text-5xl fw-semibold text-white tracking-tight">
            Let's Build Something Incredible.
          </h2>
          <p className="text-[#A8A8A8] text-base leading-relaxed">
            Have a project in mind or need senior architectural advisory? Connect directly with our engineering leadership team.
          </p>
        </div>

        <div className="flex justify-center">
  <div className="w-full max-w-4xl glass-card p-6 sm:p-10 rounded-3xl border border-white/10 bg-[#111111] relative overflow-hidden shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl fw-bold text-white">Project Inquiry Form</h3>
                  <p className="text-xs fw-regular text-[#A8A8A8]">Direct response guaranteed within 4 hours</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs fw-regular text-[#A8A8A8] mb-1.5 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marcus Chen"
                      className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white text-xs fw-regular focus:border-[#E61E4D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs fw-regular text-[#A8A8A8] mb-1.5 block">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. marcus@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white text-xs fw-regular focus:border-[#E61E4D] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs fw-regular text-[#A8A8A8] mb-1.5 block">Company Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Enterprise Cyber Inc."
                      className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white text-xs fw-regular focus:border-[#E61E4D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs fw-regular text-[#A8A8A8] mb-1.5 block">Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white text-xs fw-regular focus:border-[#E61E4D] focus:outline-none"
                    >
                      <option value="$25k - $50k">$25,000 - $50,000 USD</option>
                      <option value="$50k - $100k">$50,000 - $100,000 USD</option>
                      <option value="$100k - $250k">$100,000 - $250,000 USD</option>
                      <option value="$250k+">$250,000+ USD Enterprise</option>
                    </select>
                  </div>
                </div>

                {/* 30-Min Consultation Time Slot Picker */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <label className="text-xs fw-semibold text-[#A8A8A8] uppercase tracking-[0.18em] block flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#E61E4D]" />
                    Book 30-Min Tech Consultation Time Slot
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedSlot(slot);
                        }}
                        className={`py-2 rounded-lg text-[11px] fw-medium transition-all ${
                          selectedSlot === slot
                            ? 'bg-[#E61E4D] text-white fw-semibold shadow-md shadow-[#E61E4D]/30'
                            : 'bg-[#171717] text-[#A8A8A8] hover:text-white border border-white/5'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs fw-regular text-[#A8A8A8] mb-1.5 block">Project Summary / Requirements *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide a high-level overview of your project requirements, tech stack preferences, or system scale..."
                    className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white text-xs fw-regular focus:border-[#E61E4D] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#E61E4D] hover:bg-[#FF2D55] text-white text-xs fw-semibold uppercase tracking-[0.16em] transition-all shadow-xl shadow-[#E61E4D]/30 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry & Schedule Consultation</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl fw-bold text-white">Consultation Confirmed!</h3>
                  <p className="text-xs fw-regular text-[#A8A8A8] max-w-md mx-auto">
                    We have reserved your 30-min slot for <span className="text-white fw-semibold">{selectedSlot}</span>. A meeting invitation has been sent to <span className="text-[#E61E4D]">{formData.email}</span>.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs fw-semibold text-white"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          
        </div>
      </div>
    </section>
  );
};
