import React, { useState } from 'react';
import { Github, Twitter, Linkedin, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../../lib/sound';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundFx.playSuccess();
    setSubscribed(true);
  };

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080808] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E61E4D] to-[#FF2D55] flex items-center justify-center p-0.5 shadow-lg shadow-[#E61E4D]/20">
                <div className="w-full h-full bg-[#080808] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-xs text-[#E61E4D]">S</span>
                </div>
              </div>
              <span className="text-xl font-extrabold font-display tracking-tight text-white">
                SWIPE<span className="text-[#E61E4D]">.</span>
              </span>
            </div>

            <p className="text-xs font-sans text-[#A8A8A8] max-w-sm leading-relaxed">
              SWIPE is an award-winning software engineering and digital solutions company crafting future-grade platforms, neural AI workflows, and zero-trust cloud architectures.
            </p>

            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Global Systems Operational • 99.999%</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs font-mono text-[#A8A8A8]">
              {['Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => soundFx.playClick()}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider">Engineering Dispatch</h4>
            <p className="text-xs text-[#A8A8A8] leading-relaxed">
              Subscribe to our monthly architectural research & deep-tech dispatch.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="px-3.5 py-2.5 rounded-xl bg-[#171717] border border-white/10 text-xs font-mono text-white focus:border-[#E61E4D] focus:outline-none w-full"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#E61E4D] hover:bg-[#FF2D55] text-white text-xs font-mono font-bold transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            ) : (
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed to Engineering Dispatch</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Legal & Social Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A8A8A8]">
          <div>
            © {new Date().getFullYear()} SWIPE Digital Solutions Inc. All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center gap-1 ml-4"
              title="Back to top"
            >
              <span>TOP</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
