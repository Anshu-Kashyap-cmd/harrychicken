import React, { useState } from 'react';
import { Phone, Check, Sparkles, Flame, Clock, Heart, ArrowRight, Share2, Info } from 'lucide-react';
import { SOUP_SERVICES, SoupService, BUSINESS_INFO } from '../data/soupData';
import { SoupCardVisual } from './SoupCardVisual';

interface ServicesSectionProps {
  onSelectServiceForOrder: (service: SoupService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForOrder }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'daily' | 'healing' | 'bulk'>('all');
  const [selectedSoupModal, setSelectedSoupModal] = useState<SoupService | null>(null);

  const filteredServices = SOUP_SERVICES.filter(
    (s) => activeCategory === 'all' || s.category === activeCategory
  );

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs uppercase tracking-widest text-amber-500 font-medium">
              Authentic Extraction Menu & Services
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-stone-100 font-medium leading-tight">
              Chicken Soup Services in Ludhiana Samrala Chowk, Near Kdeep Hospital
            </h2>
            <p className="text-stone-300 text-base font-light leading-relaxed">
              Every preparation is slow-cooked for 8 to 14 hours. Free of cornstarch, synthetic bouillon powders, and artificial coloring. Served piping hot across Ludhiana.
            </p>
          </div>

          {/* Interactive Category Segmented Tabs (Functional Buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-900 border border-stone-800 rounded-xl shrink-0 self-start md:self-end">
            {[
              { id: 'all', label: 'All Broths (6)' },
              { id: 'daily', label: 'Daily Comfort' },
              { id: 'healing', label: 'Healing & Care' },
              { id: 'bulk', label: 'Family & Events' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-amber-600 text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid with Ceramic-Bowl Containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((soup) => (
            <article
              key={soup.id}
              className="group relative rounded-2xl bg-stone-900/50 border border-stone-800 hover:border-amber-600/50 transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 sm:p-7 shadow-lg"
            >
              {/* Subtle top amber glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

              <div>
                {/* Visual Header with Top-Down Circular Ceramic Bowl Illustration */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <SoupCardVisual soupId={soup.id} name={soup.name} size="md" />
                  
                  <div className="text-right space-y-1">
                    <span className="text-[11px] text-amber-400 font-mono tracking-wide block uppercase">
                      {soup.simmerTime}
                    </span>
                    <div className="text-xl font-serif text-amber-200 font-semibold">
                      {soup.sizes[0]?.price}
                    </div>
                    <span className="text-[11px] text-stone-400 block font-light">
                      {soup.sizes[0]?.volume}
                    </span>
                  </div>
                </div>

                {/* Soup Title & Punjabi Heritage Script */}
                <div className="space-y-1 mb-3">
                  <h3 className="text-xl sm:text-2xl font-serif italic text-stone-100 font-medium group-hover:text-amber-300 transition-colors">
                    {soup.name}
                  </h3>
                  <div className="text-xs text-amber-500/80 font-serif">
                    {soup.punjabiName}
                  </div>
                </div>

                <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed mb-4">
                  {soup.tagline}
                </p>

                {/* Structured Metadata - Unboxed clean layout */}
                <div className="space-y-3 pt-3 border-t border-stone-800/80 text-xs">
                  
                  {/* Who it is for */}
                  <div>
                    <span className="text-amber-400/90 font-medium uppercase tracking-wider text-[10px] block">
                      Recommended For
                    </span>
                    <p className="text-stone-300 font-light mt-0.5 line-clamp-2">
                      {soup.whoItIsFor}
                    </p>
                  </div>

                  {/* Top Key Benefits */}
                  <div>
                    <span className="text-amber-400/90 font-medium uppercase tracking-wider text-[10px] block">
                      Core Benefits & Nutrition
                    </span>
                    <ul className="mt-1 space-y-1 text-stone-300">
                      {soup.benefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2.5 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-amber-300/90 font-mono">
                      <span>~{Math.round(soup.nutrition.caloriesPer100ml * 3.5)} kcal</span>
                      <span>·</span>
                      <span>{Math.round(soup.nutrition.proteinPer100ml * 3.5)}g Protein</span>
                      <span>·</span>
                      <span className="text-amber-400 font-medium">{Math.round(soup.nutrition.collagenPer100ml * 3.5)}g Collagen</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedSoupModal(soup)}
                  className="text-xs text-stone-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1 font-light"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Full Recipe & Sizing</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                    className="btn-matte-clay px-3.5 py-2 rounded-lg text-xs font-medium text-amber-200 inline-flex items-center gap-1.5"
                    title={`Call now for ${soup.name}`}
                  >
                    <Phone className="w-3 h-3 text-amber-400" />
                    <span>Call Now</span>
                  </a>

                  <button
                    onClick={() => onSelectServiceForOrder(soup)}
                    className="btn-matte-clay-ghost px-3 py-2 rounded-lg text-xs text-amber-300 hover:text-white"
                  >
                    <span>Order</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Detailed Modal for Selected Service */}
        {selectedSoupModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
              
              <button
                onClick={() => setSelectedSoupModal(null)}
                className="absolute top-5 right-5 text-stone-400 hover:text-white p-1"
                aria-label="Close details"
              >
                ✕
              </button>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-stone-800 pb-5">
                <SoupCardVisual soupId={selectedSoupModal.id} name={selectedSoupModal.name} size="sm" />
                <div>
                  <div className="text-xs text-amber-400 tracking-wider uppercase font-medium">
                    {selectedSoupModal.simmerTime}
                  </div>
                  <h3 className="text-2xl font-serif italic text-stone-100 font-medium">
                    {selectedSoupModal.name}
                  </h3>
                  <div className="text-xs text-amber-500 font-serif">
                    {selectedSoupModal.punjabiName}
                  </div>
                </div>
              </div>

              <div className="py-5 space-y-5 text-sm text-stone-300 font-light">
                <div>
                  <h4 className="text-amber-400 font-medium text-xs tracking-wider uppercase mb-1">
                    About This Preparation
                  </h4>
                  <p className="leading-relaxed">{selectedSoupModal.description}</p>
                </div>

                <div>
                  <h4 className="text-amber-400 font-medium text-xs tracking-wider uppercase mb-2">
                    What Is Included
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedSoupModal.included.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-amber-400 font-medium text-xs tracking-wider uppercase mb-2">
                    Therapeutic & Health Benefits
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedSoupModal.benefits.map((ben, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Estimated Nutritional Breakdown */}
                <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-600/30">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-stone-800">
                    <span className="text-amber-400 font-medium text-xs tracking-wider uppercase">
                      Ancestral Nutritional Profile (Per 350ml Bowl)
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      100% Slow-Simmered
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center py-1">
                    <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                      <div className="text-[10px] text-stone-400 uppercase">Calories</div>
                      <div className="text-base font-serif text-amber-300 font-bold tabular-nums">
                        {Math.round(selectedSoupModal.nutrition.caloriesPer100ml * 3.5)} kcal
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                      <div className="text-[10px] text-stone-400 uppercase">Protein</div>
                      <div className="text-base font-serif text-amber-200 font-bold tabular-nums">
                        {Math.round(selectedSoupModal.nutrition.proteinPer100ml * 3.5 * 10) / 10}g
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-stone-900/80 border border-amber-600/30">
                      <div className="text-[10px] text-amber-400 uppercase">Type II Collagen</div>
                      <div className="text-base font-serif text-amber-400 font-bold tabular-nums">
                        {Math.round(selectedSoupModal.nutrition.collagenPer100ml * 3.5 * 10) / 10}g
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] text-stone-400">
                    <strong className="text-amber-300/90 font-medium">Bioactive Focus:</strong> {selectedSoupModal.nutrition.healthHighlight}
                  </div>
                </div>

                <div>
                  <h4 className="text-amber-400 font-medium text-xs tracking-wider uppercase mb-2">
                    Available Portions & Pricing
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedSoupModal.sizes.map((sz, i) => (
                      <div key={i} className="p-3 bg-stone-950/70 border border-stone-800 rounded-xl">
                        <div className="text-stone-200 font-medium text-xs">{sz.label}</div>
                        <div className="text-amber-400 font-serif text-lg font-bold">{sz.price}</div>
                        <div className="text-stone-500 text-[11px]">{sz.volume}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-amber-400 font-medium text-xs tracking-wider uppercase mb-1">
                    Key Ingredients
                  </h4>
                  <p className="text-xs text-stone-400">
                    {selectedSoupModal.keyIngredients.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                  className="btn-matte-clay flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-medium text-amber-200"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Now for this Service (086994 36000)</span>
                </a>

                <button
                  onClick={() => {
                    const s = selectedSoupModal;
                    setSelectedSoupModal(null);
                    onSelectServiceForOrder(s);
                  }}
                  className="btn-matte-clay-ghost flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-medium text-amber-300"
                >
                  <span>Build Custom Order</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
