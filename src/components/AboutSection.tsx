import React from 'react';
import { Award, Clock, HeartHandshake, ShieldCheck, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/soupData';

export const AboutSection: React.FC<{ onNavigateToContact: () => void }> = ({ onNavigateToContact }) => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="text-xs uppercase tracking-widest text-amber-500 font-medium">
            Heritage & Craft
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-stone-100 font-medium leading-tight">
            The Philosophy of Liquid Gold & Ancestral Healing in Ludhiana
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            We do not sell commercial fast-food soup. We practice slow-fire extraction—drawing deep gelatin, bone marrow minerals, and natural schmaltz over twelve unbroken hours of gentle simmer.
          </p>
        </div>

        {/* 2-Column Split: Story & Founder Profile alongside Ceramic Craftsmanship Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6 text-stone-300 font-light leading-relaxed">
            <p className="text-base sm:text-lg text-stone-200">
              Harry’s chicken was founded right here at Samrala Chowk by <strong className="font-medium text-amber-300">Harpreet “Harry” Singh</strong>. Growing up in Punjab, Harpreet watched his elders simmer desi chicken shorba on winter chulhas with stone-ground black pepper, ginger, and turmeric whenever someone in the family caught a chill or felt depleted.
            </p>

            <p>
              Over the past 15 years, Harry refined this ancestral Punjabi wisdom into a precise slow-extraction technique. Instead of boiling chickens aggressively for 20 minutes with cornstarch and synthetic flavor enhancers, every batch at Harry’s begins before dawn. Clean chicken marrow bones and meat are gently simmered at sub-boiling temperatures so collagen converts slowly into rich, gut-healing gelatin without denaturing fragile nutrients.
            </p>

            <p>
              Today, our small kitchen near the Green Land School Gate serves a very special cross-section of Ludhiana:
            </p>

            <ul className="space-y-3.5 pt-2 text-stone-300">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span>
                  <strong className="text-stone-100 font-medium">Convalescing Patients & Families:</strong> Being just two minutes from Kdeep Hospital and minutes from CMC, families rely on our ultra-clean, clarified recovery broths for patients recovering from surgery or weakness.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span>
                  <strong className="text-stone-100 font-medium">Ludhiana Athletes & Gym Goers:</strong> Powerlifters and fitness enthusiasts seeking clean, bio-available collagen for knee and shoulder joints without whey bloat.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span>
                  <strong className="text-stone-100 font-medium">Winter Households & Families:</strong> Multi-generational households who order our 1.5L thermal takeaway kettles for evening warmth across Model Town, Sector 22, and Civil Lines.
                </span>
              </li>
            </ul>

            <div className="pt-6 flex flex-wrap items-center gap-4">
              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                className="btn-matte-clay inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-medium text-amber-200"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Talk with Harpreet (086994 36000)</span>
              </a>
              <button
                onClick={onNavigateToContact}
                className="btn-matte-clay-ghost inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-medium text-stone-300 hover:text-amber-300"
              >
                <span>Visit Samrala Chowk Kitchen</span>
              </button>
            </div>
          </div>

          {/* Right Showcase: Visual Ceramics & Craft Metrics */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Artisanal Heritage Ceramic Container */}
            <div className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800/80 backdrop-blur-sm relative overflow-hidden shadow-2xl">
              {/* Subtle amber gradient corner */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                <div className="border-b border-stone-800 pb-5">
                  <div className="text-amber-400 font-serif text-2xl font-medium italic">
                    The 4 Golden Extraction Rules
                  </div>
                  <div className="text-xs text-stone-400 tracking-wider uppercase mt-1">
                    Harry’s Kitchen Standard
                  </div>
                </div>

                <div className="space-y-4 text-sm text-stone-300">
                  <div className="flex gap-4 items-start">
                    <span className="font-serif italic text-amber-400 text-lg leading-none shrink-0">01.</span>
                    <div>
                      <div className="text-stone-100 font-medium">100% Free-Range Poultry</div>
                      <div className="text-xs text-stone-400 font-light mt-0.5">Sourced fresh daily from local Punjab farms with healthy bone density.</div>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="font-serif italic text-amber-400 text-lg leading-none shrink-0">02.</span>
                    <div>
                      <div className="text-stone-100 font-medium">Zero Artificial Thickeners</div>
                      <div className="text-xs text-stone-400 font-light mt-0.5">No cornstarch, potato flour, or synthetic soup glazes. Body comes purely from marrow.</div>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="font-serif italic text-amber-400 text-lg leading-none shrink-0">03.</span>
                    <div>
                      <div className="text-stone-100 font-medium">Whole Roots & Peppercorns</div>
                      <div className="text-xs text-stone-400 font-light mt-0.5">Fresh ginger root sliced thick, wild turmeric, and tellicherry black pepper crushed on mortar.</div>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="font-serif italic text-amber-400 text-lg leading-none shrink-0">04.</span>
                    <div>
                      <div className="text-stone-100 font-medium">Piping Hot Thermal Dispatch</div>
                      <div className="text-xs text-stone-400 font-light mt-0.5">Sealed in heat-retaining food-grade vessels that arrive steaming at your doorstep.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Landmark Notice */}
            <div className="p-5 rounded-xl bg-stone-950/80 border border-amber-900/40 flex items-center justify-between text-xs text-stone-400">
              <div>
                <span className="text-amber-400 font-medium">Location Advantage:</span>
                <span className="ml-1.5">Samrala Chowk, LIG 156, SEC 22 (Near Green Land School Gate)</span>
              </div>
              <span className="text-stone-500 shrink-0 ml-4 font-mono">141008</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
