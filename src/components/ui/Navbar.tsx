import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles, PhoneCall, RefreshCw } from 'lucide-react';
import logoImage from '../../../assets/logo/swipe-logo-bgr.png';

export interface NavLink {
  name: string;
  href: string;
}

export interface NavbarProps {
  brandName?: string;
  navLinks?: NavLink[];
  onBookCallClick?: () => void;
  onReplayLoading?: () => void;
  className?: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { name: "About", href: "#vision" },
  { name: "Services", href: "#services" },
  { name: "Team", href: "#TeamShowCase" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export const Navbar: React.FC<NavbarProps> = ({
  brandName = 'SWIPE',
  navLinks = DEFAULT_LINKS,
  onBookCallClick,
  onReplayLoading,
  className = '',
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(navLinks[0]?.href.replace('#', '') || 'about');
  const [isInitializing, setIsInitializing] = useState(true);
  const [loadKey, setLoadKey] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detect active section dynamically
      for (const link of navLinks) {
        const sectionId = link.href.replace('#', '');
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [loadKey]);

  const handleReplay = () => {
    setIsInitializing(true);
    setLoadKey((prev) => prev + 1);
    if (onReplayLoading) {
      onReplayLoading();
    }
  };

  const handleBookCall = () => {
    if (onBookCallClick) {
      onBookCallClick();
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Motion Variants
  const headerVariants = {
    hidden: { opacity: 0, y: -30, filter: 'blur(16px)', scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -15, scale: 0.92, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.header
      key={loadKey}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 pointer-events-none ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* LOGO (LEFT) */}
        <motion.div variants={itemVariants} className="pointer-events-auto">
          <a
            href={navLinks[0]?.href || '#'}
            onClick={(e) => handleNavClick(e, navLinks[0]?.href || '#')}
            className="group relative flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-[#E61E4D]/50 transition-colors duration-300 shadow-lg overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E61E4D]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Logo Emblem */}
            <div className="relative w-8 h-8 flex items-center justify-center shrink-0 overflow-hidden rounded-full bg-white/5">
              <img
                src={logoImage}
                alt={`${brandName} logo`}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>

            {/* Brand Text */}
            <span className="font-extrabold tracking-[0.16em] sm:tracking-[0.2em] text-white text-sm sm:text-base">
              {brandName.length > 2 ? (
                <>
                  {brandName.slice(0, 2)}
                  <span className="text-[#E61E4D]">{brandName.slice(2, 3)}</span>
                  {brandName.slice(3)}
                </>
              ) : (
                brandName
              )}
            </span>
          </a>
        </motion.div>

        {/* CENTER LINKS (DESKTOP) */}
        <motion.nav
          variants={itemVariants}
          className={`hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full pointer-events-auto relative overflow-hidden transition-all duration-500 border border-white/10 bg-[#080808]/80 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] ${
            scrolled ? 'bg-[#080808]/90 border-white/15' : ''
          }`}
        >
          {/* System Initialization Shimmer Beam */}
          <AnimatePresence>
            {isInitializing && (
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '200%', opacity: [0, 0.8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-[#E61E4D]/40 to-transparent pointer-events-none blur-sm"
              />
            )}
          </AnimatePresence>

          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-1.5 text-xs font-medium tracking-wide transition-colors duration-300 rounded-full ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#A8A8A8] hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full -z-10 shadow-[0_0_15px_rgba(230,30,77,0.25)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 28, mass: 0.8 }}
                  />
                )}
                <span>{link.name}</span>
              </a>
            );
          })}
        </motion.nav>

        {/* RIGHT ACTION BUTTON (DESKTOP) */}
        <motion.div variants={itemVariants} className="hidden md:flex items-center gap-3 pointer-events-auto">


          <button
            onClick={handleBookCall}
            className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#E61E4D] to-[#B01436] hover:from-[#FF2D55] hover:to-[#C4163D] shadow-[0_0_20px_rgba(230,30,77,0.3)] hover:shadow-[0_0_30px_rgba(230,30,77,0.5)] transition-all duration-300 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform duration-300" />
            <span>Book a Call</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* MOBILE MENU TOGGLE */}
        <motion.div variants={itemVariants} className="lg:hidden pointer-events-auto flex items-center gap-2">
          <button
            onClick={handleBookCall}
            className="md:hidden px-3 py-1.5 rounded-full text-[11px] font-semibold text-white uppercase tracking-wider bg-gradient-to-r from-[#E61E4D] to-[#B01436]"
          >
            Call
          </button>

          <button
            onClick={handleReplay}
            title="Replay Loading"
            className="p-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl text-[#A8A8A8]"
          >
            <Sparkles className="w-4 h-4 text-[#E61E4D]" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#E61E4D]" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden pointer-events-auto mt-3 mx-4 sm:mx-auto max-w-lg rounded-2xl bg-[#080808]/95 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between py-2.5 px-4 rounded-xl hover:bg-white/5 text-sm font-medium text-[#F5F5F5] hover:text-[#E61E4D] transition-colors"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/40" />
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleBookCall();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E61E4D] to-[#B01436] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 text-white shadow-lg"
                >
                  <PhoneCall className="w-4 h-4 text-white" />
                  <span>Book a Call</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;


