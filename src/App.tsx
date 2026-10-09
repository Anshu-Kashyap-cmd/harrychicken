import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SteamPartingHero } from './components/SteamPartingHero';
import { LiquidDivider } from './components/LiquidDivider';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PriceCalculatorSection } from './components/PriceCalculatorSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { LocalSeoContent } from './components/LocalSeoContent';
import { Footer } from './components/Footer';
import { AromaCursor } from './components/AromaCursor';
import { OrderCalculatorModal } from './components/OrderCalculatorModal';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { SoupService, SOUP_SERVICES } from './data/soupData';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedServiceForOrder, setSelectedServiceForOrder] = useState<SoupService | null>(null);
  const [activeLegalModal, setActiveLegalModal] = useState<LegalDocType | null>(null);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSelectServiceForOrder = (service: SoupService) => {
    setSelectedServiceForOrder(service);
    setIsOrderModalOpen(true);
  };

  const handleOpenGeneralOrderModal = () => {
    setSelectedServiceForOrder(SOUP_SERVICES[0]);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#1C1917] text-[#F5F5F4] relative selection:bg-amber-600 selection:text-white pb-14 md:pb-0">
      {/* 3% Canvas Grain rustic handcrafted overlay across entire application */}
      <div
        className="canvas-grain-overlay fixed inset-0 pointer-events-none z-30 opacity-40 mix-blend-overlay"
        aria-hidden="true"
      />

      {/* Interactive Golden Droplet Cursor & Aroma Trail */}
      <AromaCursor />

      {/* Fixed Top Bar Navigation (Strict 3-zone contract) */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenOrderModal={handleOpenGeneralOrderModal}
      />

      <main className="relative z-10">
        {/* Section 1: Hero with Interactive Steam Parting Bowl */}
        <div id="hero">
          <SteamPartingHero
            onOpenOrderModal={handleOpenGeneralOrderModal}
            onNavigateToSection={handleNavigate}
          />
        </div>

        {/* Liquid-Ripple SVG Divider */}
        <LiquidDivider variant="amber" />

        {/* Section 2: About Story & Founder Heritage */}
        <AboutSection onNavigateToContact={() => handleNavigate('contact')} />

        {/* Liquid-Ripple SVG Divider */}
        <LiquidDivider variant="subtle" flip />

        {/* Section 3: Services & Broths (Detailed Recipe & Health Benefits) */}
        <ServicesSection onSelectServiceForOrder={handleSelectServiceForOrder} />

        {/* Liquid-Ripple SVG Divider */}
        <LiquidDivider variant="amber" />

        {/* Section 4: Dedicated Interactive Price & Order Calculator */}
        <PriceCalculatorSection />

        {/* Liquid-Ripple SVG Divider */}
        <LiquidDivider variant="subtle" flip />

        {/* Section 5: Why Choose Us & Call to Action Banner */}
        <WhyChooseUs onOpenOrderModal={handleOpenGeneralOrderModal} />

        {/* Liquid-Ripple SVG Divider */}
        <LiquidDivider variant="subtle" />

        {/* Section 5: Real Attributable Local Testimonials */}
        <TestimonialsSection />

        {/* Liquid-Ripple SVG Divider */}
        <LiquidDivider variant="earthen" flip />

        {/* Section 6: Contact Information, Schedule & Direct Lead Form */}
        <ContactSection />

        {/* Section 7: Local SEO Semantic Hub & FAQs */}
        <LocalSeoContent onOpenOrderModal={handleOpenGeneralOrderModal} />
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenLegal={(type) => setActiveLegalModal(type)}
        onNavigate={handleNavigate}
      />

      {/* Mobile Sticky Quick-Call & Order Bar (<15% mobile viewport height) */}
      <MobileStickyBar onOpenOrderModal={handleOpenGeneralOrderModal} />

      {/* Interactive Custom Order & Quote Calculator Modal */}
      <OrderCalculatorModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialService={selectedServiceForOrder}
      />

      {/* Legal Information Modals (Privacy, Terms, Disclaimer) */}
      <LegalModal
        type={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />
    </div>
  );
}
