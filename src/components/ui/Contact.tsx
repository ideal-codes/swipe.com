import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../../lib/sound';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    soundFx.playSuccess();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E61E4D', '#FF2D55', '#FFFFFF'],
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden border-t border-white/5">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-radial-bottom-glow blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl fw-semibold text-white tracking-tight">
            Contact Us
          </h2>
          <p className="text-[#A8A8A8] text-base leading-relaxed">
            Share your name, email, optional phone number, and a short description.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl glass-card p-6 sm:p-10 rounded-3xl border border-white/10 bg-[#111111] relative overflow-hidden shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-xl fw-bold text-white">Quick Note</h3>
                  <p className="text-xs fw-regular text-[#A8A8A8]">We will get back to you as soon as we can.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs fw-regular text-[#A8A8A8] mb-1.5 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Arjun Kumar"
                      className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white text-xs fw-regular focus:border-[#E61E4D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs fw-regular text-[#A8A8A8] mb-1.5 block">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white text-xs fw-regular focus:border-[#E61E4D] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs fw-regular text-[#A8A8A8] mb-1.5 block">
                    Phone Number <span className="text-white/40">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white text-xs fw-regular focus:border-[#E61E4D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs fw-regular text-[#A8A8A8] mb-1.5 block">Description *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you need..."
                    className="w-full px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white text-xs fw-regular focus:border-[#E61E4D] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#E61E4D] hover:bg-[#FF2D55] text-white text-xs fw-semibold uppercase tracking-[0.16em] transition-all shadow-xl shadow-[#E61E4D]/30 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl fw-bold text-white">Message Sent!</h3>
                  <p className="text-xs fw-regular text-[#A8A8A8] max-w-md mx-auto">
                    Thanks for reaching out. We will review your message and get back to <span className="text-[#E61E4D]">{formData.email}</span> soon.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs fw-semibold text-white"
                >
                  Send Another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
