import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  PhoneCall,
} from "lucide-react";

import logoImage from "../../../assets/logo/swipe-logo-bgr.png";

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
    {
    name: "Home",
    href: "#hero",
  },
  {
    name: "About",
    href: "#vision",
  },
  {
    name: "Services",
    href: "#services",
  },
  {
    name: "Team",
    href: "#TeamShowCase",
  },
  {
    name: "Testimonials",
    href: "#testimonials",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  brandName = "SWIPE",
  navLinks = DEFAULT_LINKS,
  onBookCallClick,
  onReplayLoading,
  className = "",
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isInitializing, setIsInitializing] = useState(true);
  const [loadKey, setLoadKey] = useState(0);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleOutside);
    }

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
  }, [mobileMenuOpen]);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.replace("#", "")))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -45% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    if (window.scrollY < 80) {
      setActiveSection("hero");
    }

    return () => observer.disconnect();
  }, [navLinks]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, [loadKey]);

  const handleReplay = () => {
    setIsInitializing(true);
    setLoadKey((prev) => prev + 1);

    onReplayLoading?.();
  };

  const handleBookCall = () => {
    if (onBookCallClick) {
      onBookCallClick();
      return;
    }

    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    setMobileMenuOpen(false);

    const id = href.replace("#", "");

    setActiveSection(id);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -25,
      filter: "blur(16px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
      },
    },
  };

return (
  <motion.header
    key={loadKey}
    initial="hidden"
    animate="visible"
    variants={headerVariants}
    className={`fixed inset-x-0 top-0 z-50 pointer-events-none px-4 sm:px-6 lg:px-8 pt-[max(env(safe-area-inset-top),1rem)] ${className}`}
  >
    <div className="mx-auto flex max-w-7xl items-center justify-between">

      {/* ===================== LOGO ===================== */}

      <motion.div
        variants={itemVariants}
        className="pointer-events-auto shrink-0"
      >
        <a
          href={navLinks[0]?.href}
          onClick={(e) =>
            handleNavClick(
              e,
              navLinks[0]?.href ?? "#hero"
            )
          }
          className="
          group
          relative
          flex
          items-center
          gap-3
          rounded-full
          border
          border-white/10
          bg-black/45
          backdrop-blur-3xl
          px-3
          sm:px-4
          py-2.5
          shadow-[0_15px_40px_rgba(0,0,0,.45)]
          overflow-hidden
        "
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-[#E61E4D]/20 via-transparent to-transparent" />

          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/5 overflow-hidden">
            <img
              src={logoImage}
              draggable={false}
              alt={brandName}
              className="w-full h-full object-contain"
            />
          </div>

          <span className="fw-black tracking-[0.18em] text-white text-sm sm:text-base">
            {brandName.slice(0,2)}
            <span className="text-[#E61E4D]">
              {brandName.slice(2,3)}
            </span>
            {brandName.slice(3)}
          </span>
        </a>
      </motion.div>

      {/* ===================== DESKTOP NAV ===================== */}

      <motion.nav
        variants={itemVariants}
        className={`
        hidden
        xl:flex
        items-center
        gap-1
        rounded-full
        px-3
        py-2
        pointer-events-auto
        border
        transition-all
        duration-500
        relative
        overflow-hidden
        backdrop-blur-3xl
        bg-black/55
        shadow-[0_15px_40px_rgba(0,0,0,.45)]
        ${
          scrolled
            ? "border-white/15"
            : "border-white/8"
        }
      `}
      >
        <AnimatePresence>
          {isInitializing && (
            <motion.div
              initial={{
                x: "-120%",
                opacity: 0,
              }}
              animate={{
                x: "220%",
                opacity: [0,.7,0],
              }}
              exit={{
                opacity:0,
              }}
              transition={{
                duration:1.6,
              }}
              className="absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-[#E61E4D]/30 to-transparent blur-lg"
            />
          )}
        </AnimatePresence>

        {navLinks.map((link)=>{

          const active =
            activeSection ===
            link.href.replace("#","");

          return(

            <a
              key={link.name}
              href={link.href}
              onClick={(e)=>
                handleNavClick(e,link.href)
              }
              className={`
              relative
              px-5
              py-2
              rounded-full
              text-sm
              fw-medium
              transition-all
              duration-300
              ${
                active
                ? "text-white"
                : "text-neutral-400 hover:text-white"
              }
            `}
            >

              {active && (

                <motion.div
                  layoutId="activeNav"
                  transition={{
                    type:"spring",
                    stiffness:350,
                    damping:30,
                  }}
                  className="
                  absolute
                  inset-0
                  rounded-full
                  bg-white/8
                  border
                  border-white/10
                  shadow-[0_0_25px_rgba(230,30,77,.25)]
                  -z-10
                "
                />

              )}

              {link.name}

            </a>

          )

        })}

      </motion.nav>

      {/* ===================== RIGHT SIDE ===================== */}

      <motion.div
        variants={itemVariants}
        className="hidden lg:flex items-center gap-3 pointer-events-auto"
      >


        <button
          onClick={handleBookCall}
          className="
          group
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-gradient-to-r
          from-[#E61E4D]
          to-[#B11436]
          px-6
          py-3
          text-xs
          uppercase
          tracking-[0.16em]
          fw-semibold
          text-white
          shadow-[0_0_35px_rgba(230,30,77,.35)]
          hover:scale-[1.03]
          transition
        "
        >
          <PhoneCall className="w-4 h-4"/>

          Book Call

          <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"/>
        </button>
      </motion.div>

      {/* ===================== MOBILE ACTIONS ===================== */}

      <motion.div
        variants={itemVariants}
        className="xl:hidden pointer-events-auto"
      >
        <button
          onClick={() =>
            setMobileMenuOpen(
              !mobileMenuOpen
            )
          }
          className="
          h-11
          w-11
          rounded-full
          border
          border-white/10
          bg-black/45
          backdrop-blur-3xl
          flex
          items-center
          justify-center
        "
        >
          {mobileMenuOpen
            ? <X className="w-5 h-5 text-[#E61E4D]" />
            : <Menu className="w-5 h-5 text-white" />}
        </button>
      </motion.div>

    </div>

      {/* ===================== MOBILE MENU ===================== */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Background Overlay */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: .25 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
            />

            {/* Menu */}

            <motion.div
              ref={menuRef}
              initial={{
                opacity: 0,
                y: -30,
                scale: .96
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              exit={{
                opacity: 0,
                y: -30,
                scale: .96
              }}
              transition={{
                duration: .35,
                ease: [0.16,1,0.3,1]
              }}
              className="
              fixed
              left-4
              right-4
              top-24
              z-50
              rounded-3xl
              border
              border-white/10
              bg-black/60
              backdrop-blur-3xl
              shadow-[0_20px_80px_rgba(0,0,0,.55)]
              overflow-hidden
            "
            >
              {/* Top */}

              <div className="px-7 pt-7 pb-4">

                <div className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                  Navigation
                </div>

              </div>

              {/* Links */}

              <div className="px-4 pb-4">

                {navLinks.map((link,index)=>{

                  const active =
                    activeSection ===
                    link.href.replace("#","");

                  return(

                    <motion.a

                      key={link.name}

                      href={link.href}

                      initial={{
                        opacity:0,
                        x:-20
                      }}

                      animate={{
                        opacity:1,
                        x:0
                      }}

                      transition={{
                        delay:index*.06
                      }}

                      onClick={(e)=>
                        handleNavClick(e,link.href)
                      }

                      className={`
                      group
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      px-5
                      py-4
                      mb-2
                      transition-all
                      duration-300

                      ${
                        active
                        ? "bg-white/10 text-white"
                        : "hover:bg-white/5 text-neutral-300"
                      }
                    `}
                    >

                      <span className="text-base fw-medium">
                        {link.name}
                      </span>

                      <ArrowUpRight
                        className="
                        w-5
                        h-5
                        text-neutral-500
                        group-hover:text-[#E61E4D]
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        transition
                      "
                      />

                    </motion.a>

                  )

                })}

              </div>

              {/* Divider */}

              <div className="mx-6 h-px bg-white/10"/>

              {/* Bottom */}

              <div className="p-6 space-y-3">

                <button

                  onClick={()=>{
                    setMobileMenuOpen(false)
                    handleBookCall()
                  }}

                  className="
                  w-full
                  rounded-2xl
                  py-4
                  bg-gradient-to-r
                  from-[#E61E4D]
                  to-[#B11436]
                  text-white
                  fw-semibold
                  uppercase
                  tracking-[0.15em]
                  flex
                  items-center
                  justify-center
                  gap-3
                  shadow-[0_0_35px_rgba(230,30,77,.35)]
                  hover:scale-[1.02]
                  transition
                "
                >

                  <PhoneCall className="w-5 h-5"/>

                  Book Discovery Call

                </button>

                
              </div>

            </motion.div>

          </>
        )}
      </AnimatePresence>

    </motion.header>
  );
};

export default Navbar;
