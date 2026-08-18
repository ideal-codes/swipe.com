import React from 'react';
import Navbar from '@/components/ui/Navbar.tsx';
import ZoomParallaxDemo from '@/components/ui/zoom-parallax.tsx';
import Interactive3DHero from '@/components/ui/interactive-3d-hero.tsx';
import { TeamShowcase } from '@/components/ui/TeamShowcase.tsx';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';
import { TechStackSection } from '@/components/ui/TechStackSection';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Testimonials } from '@/components/ui/Testimonials';
import { Contact } from '@/components/ui/Contact';
import { Footer } from '@/components/ui/Footer';
import { ServicesSection } from '@/components/ui/ServicesSection';

export default function App() {
  return (
    <div className="fw-font bg-[#f7f5f1] text-zinc-900">
      <BackgroundEffects />

      <Navbar />

      <section id="hero" className="pt-6 sm:pt-10 lg:pt-14">
        <ZoomParallaxDemo />
      </section>

      <section id="vision" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-10 sm:pt-14 lg:pt-20">
        <section className="w-full px-8 xl:px-24">
            <Interactive3DHero />
        </section>
       </section>

    <section id="services" className="min-h-screen bg-[#030303] text-white selection:bg-[#E50914] selection:text-white">
      <section>
        <ServicesSection />
      </section>
    </section>


      <section className="w-full" id="techstacksection">
        <TechStackSection />
      </section>



      <section id="TeamShowCase" className="relative w-full min-h-screen  flex items-center justify-center overflow-hidden">
        <div className="w-full px-8 xl:px-24" >
          <TeamShowcase />
        </div>
      </section>

       <Testimonials />
       <Contact />
       <Footer />
    </div>
  );
}
