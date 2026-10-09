import React from 'react';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data/soupData';
import { LegalDocType } from './LegalModal';

interface FooterProps {
  onOpenLegal: (type: LegalDocType) => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onNavigate }) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-2xl font-serif italic text-amber-200 font-medium">
              Harry's chicken
            </div>
            <p className="text-stone-300 font-light leading-relaxed max-w-sm">
              Artisanal slow-simmered chicken soup, 12-hour golden collagen broths, and convalescence extracts. Handcrafted at Samrala Chowk, Ludhiana, Punjab.
            </p>
            <div className="text-stone-400 space-y-1">
              <div>Owner: {BUSINESS_INFO.owner}</div>
              <div>Category: Chicken Soup & Slow-Simmered Broth Services</div>
            </div>
          </div>

          {/* Quick Navigation Mirror */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-stone-200 uppercase tracking-wider text-[11px] font-medium">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Home / Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Our Heritage & Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Broths & Catering Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Price & Order Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('why-us')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Why Choose Harry’s
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Quick Contact */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-stone-200 uppercase tracking-wider text-[11px] font-medium">
              Kitchen Address
            </div>
            <p className="text-stone-300 font-light leading-relaxed">
              {BUSINESS_INFO.address}
            </p>
            <div className="pt-1">
              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                className="text-amber-400 hover:text-amber-300 font-mono text-sm inline-block"
              >
                Hotline: {BUSINESS_INFO.phone}
              </a>
            </div>
            <div className="text-stone-500 text-[11px]">
              Near Green Land School Gate & Kdeep Hospital, Ludhiana, Punjab 141008
            </div>
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright & Legal Links */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Harry's chicken. All rights reserved. Ludhiana, Punjab.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-stone-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-stone-300 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => onOpenLegal('disclaimer')}
              className="hover:text-stone-300 transition-colors"
            >
              Nutritional Disclaimer
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
