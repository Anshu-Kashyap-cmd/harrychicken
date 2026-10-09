import React from 'react';
import { Flame, Clock, ShieldCheck, HeartHandshake, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/soupData';

interface WhyChooseUsProps {
  onOpenOrderModal: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenOrderModal }) => {
  const pillars = [
    {
      number: '01',
      title: '12-Hour Slow Extraction, Zero Powders',
      description: 'Unlike commercial restaurants that dissolve bouillon cubes or thicken tap water with cornstarch in 10 minutes, our stocks simmer undisturbed for 12 hours over low flame. We extract deep minerals, glycine, and gelatin directly from bone marrow.',
      highlight: 'Pure Natural Gelatin'
    },
    {
      number: '02',
      title: '100% Desi Poultry & Fresh Whole Spices',
      description: 'We source healthy, naturally raised poultry with intact joints and cartilage. Our ginger roots are thick-sliced and crushed daily; our tellicherry black pepper and wild turmeric are lightly roasted in pure chicken schmaltz.',
      highlight: 'Farm-Fresh Sourcing'
    },
    {
      number: '03',
      title: 'Fast Thermal Delivery Across Ludhiana',
      description: 'Soup is packed boiling hot in double-walled insulated flasks and food-grade sealed ceramic containers. Whether you are in Sector 22, Model Town, Civil Lines, or Chandigarh Road, your broth arrives steaming hot.',
      highlight: '35-45 Min Hot Dispatch'
    },
    {
      number: '04',
      title: 'Trusted by Doctors & Convalescent Families',
      description: 'Located 2 minutes from Kdeep Hospital and close to CMC Ludhiana, doctors and physiotherapists routinely recommend our low-sodium, clarified collagen broths for post-surgery healing and joint mobility.',
      highlight: 'Clinical-Grade Cleanliness'
    }
  ];

  return (
    <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="text-xs uppercase tracking-widest text-amber-500 font-medium">
            The Gold Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-stone-100 font-medium leading-tight">
            Why Discerning Ludhiana Residents Choose Harry’s Chicken Soup
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            We hold ourselves to an uncompromising culinary and nutritional standard. Here is why our slow-simmered broths are trusted across the city.
          </p>
        </div>

        {/* 4 Ceramic-Pottery Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p) => (
            <div
              key={p.number}
              className="p-7 rounded-2xl bg-stone-900/50 border border-stone-800 hover:border-amber-600/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif italic text-2xl text-amber-500/80 font-bold">
                    {p.number}.
                  </span>
                  <span className="text-[10px] text-amber-400 font-medium uppercase tracking-wider bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800">
                    {p.highlight}
                  </span>
                </div>

                <h3 className="text-lg font-serif text-stone-100 font-medium mb-3 group-hover:text-amber-200 transition-colors">
                  {p.title}
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center text-xs text-amber-400/80 font-medium">
                <span>Handcrafted at Samrala Chowk</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner (As requested by user) */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-stone-900 via-[#26201B] to-stone-900 border border-amber-600/30 overflow-hidden shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-medium">
              Immediate Orders & Catering Inquiries
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-stone-100 font-medium leading-tight">
              Contact us today for chicken soup services in Ludhiana, Near Samrala chowk, Kdeep Hospital
            </h3>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
              Whether you need a single steaming bowl for tonight’s dinner, a 1.5L family healing kettle, low-salt broth for a hospital patient, or live soup kettles for an event, we are at your service.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                className="btn-matte-clay inline-flex items-center gap-3 px-8 py-3.5 rounded-xl text-amber-200 font-medium text-sm tracking-wide"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Now: 086994 36000</span>
                <ArrowRight className="w-4 h-4 text-amber-400/70" />
              </a>

              <button
                onClick={onOpenOrderModal}
                className="btn-matte-clay-ghost inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-stone-200 hover:text-amber-300 font-medium text-sm tracking-wide"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Get a Free Quote / Pre-Order</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
