import React from 'react';
import { TESTIMONIALS } from '../data/soupData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="text-xs uppercase tracking-widest text-amber-500 font-medium">
            Local Reputation & Trust
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-stone-100 font-medium leading-tight">
            Voices from Ludhiana’s Doctors, Athletes & Winter Families
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Real feedback from regular patrons who depend on Harry’s slow-simmered chicken broths for health, recovery, and wholesome family comfort.
          </p>
        </div>

        {/* 4 Attributable Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-2xl bg-stone-900/40 border border-stone-800/90 relative flex flex-col justify-between group hover:border-amber-600/40 transition-colors shadow-lg"
            >
              <div className="space-y-4">
                {/* 5 Golden Stars & Review Date */}
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <div className="flex text-amber-400 gap-1 text-sm tracking-widest">
                    {'★★★★★'}
                  </div>
                  <span className="font-mono text-[11px] text-stone-500">{t.date}</span>
                </div>

                {/* Believable Concrete Quote */}
                <p className="text-stone-200 text-sm sm:text-base font-light italic leading-relaxed">
                  “{t.quote}”
                </p>
              </div>

              {/* Attributable Author Lockup */}
              <div className="pt-6 mt-6 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <div className="text-stone-100 font-medium text-sm font-serif">
                    {t.name}
                  </div>
                  <div className="text-xs text-amber-400/90 font-light">
                    {t.role}
                  </div>
                </div>

                <div className="text-right text-[11px] text-stone-400">
                  <div>{t.location}</div>
                  <span className="text-emerald-500 font-medium">✓ {t.verified}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Proof Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-stone-950/60 border border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-serif text-lg font-bold">4.9 / 5.0</span>
            <span>Over 1,200+ Slow-Simmered Jars Delivered Across Ludhiana</span>
          </div>
          <div className="text-stone-500">
            Average preparation & delivery time: 35 minutes within 5 km of Samrala Chowk
          </div>
        </div>

      </div>
    </section>
  );
};
