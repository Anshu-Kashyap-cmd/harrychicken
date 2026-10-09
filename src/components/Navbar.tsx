import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/soupData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenOrderModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Story', id: 'about' },
    { label: 'Broths', id: 'services' },
    { label: 'Calculator', id: 'calculator' },
    { label: 'Reviews', id: 'testimonials' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#1C1917]/90 backdrop-blur-md border-b border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Exact Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary Action) */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="text-2xl sm:text-3xl font-medium tracking-tight text-amber-100 hover:text-amber-400 font-serif italic whitespace-nowrap shrink-0 transition-colors"
          >
            Harry's chicken
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-light tracking-wide text-stone-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 ${
                  activeSection === link.id ? 'text-amber-400 font-normal' : 'text-stone-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
              className="hidden sm:inline-flex btn-matte-clay items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium text-amber-200 tracking-wide whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: 086994 36000</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-400 hover:text-amber-300 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Clean, non-intrusive) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#171412] border-b border-stone-800 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left text-base text-stone-300 hover:text-amber-400 py-1 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-800/80 flex flex-col gap-2.5">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
              className="btn-matte-clay flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-medium text-amber-200 text-center"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Now (086994 36000)</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="btn-matte-clay-ghost flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-medium text-amber-300 text-center"
            >
              <span>Get Free Quote / Order Broth</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
