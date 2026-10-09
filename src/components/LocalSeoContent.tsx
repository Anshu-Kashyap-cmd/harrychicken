import React, { useState } from 'react';
import { ChevronDown, MapPin, Sparkles, Phone, Award } from 'lucide-react';
import { FAQS, BUSINESS_INFO } from '../data/soupData';

export const LocalSeoContent: React.FC<{ onOpenOrderModal: () => void }> = ({ onOpenOrderModal }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Local SEO Editorial Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs uppercase tracking-widest text-amber-500 font-medium">
            Ludhiana Culinary & Wellness Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif italic text-stone-100 font-medium leading-tight">
            Chicken Soup Services in Ludhiana Samrala Chowk: Everything You Need to Know
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Searching for the <strong className="text-amber-300 font-normal">best chicken soup services near me</strong> in Ludhiana? Here is how Harry's chicken combines ancestral slow extraction with prompt local delivery.
          </p>
        </div>

        {/* 2-Column Split: Local Search Context & Interactive FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Natural Editorial Local SEO Paragraphs */}
          <div className="lg:col-span-6 space-y-6 text-sm text-stone-300 font-light leading-relaxed">
            <div className="p-6 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-4">
              <h3 className="text-lg font-serif italic text-stone-100 font-medium">
                Why Samrala Chowk & Sector 22 is Ludhiana’s Chicken Soup Destination
              </h3>
              <p>
                When temperatures plunge during Punjab winters or when someone in the family falls under the weather, finding wholesome, non-processed nourishment is critical. As a <strong className="text-stone-100 font-normal">Ludhiana professional</strong> chicken soup kitchen, Harry’s chicken at Samrala Chowk (LIG 156, SEC 22) bridges traditional homestyle Punjabi cooking with scientific low-temperature extraction.
              </p>
              <p>
                Whether you live across Samrala Chowk, near Green Land School, in Model Town, Civil Lines, or along Chandigarh Road, our delivery riders carry sealed thermal vessels that keep your soup above 75°C right to your doorstep.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-4">
              <h3 className="text-lg font-serif italic text-stone-100 font-medium">
                Serving Patients & Clinics Near Kdeep Hospital
              </h3>
              <p>
                Convalescence requires pure protein, gentle electrolytes, and zero gastrointestinal irritation. Our location just two minutes from <strong className="text-stone-100 font-normal">Kdeep Hospital</strong> allows us to serve patients, nursing staff, and attendant families with double-clarified, low-sodium chicken broths prepared fresh daily.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                  className="btn-matte-clay px-4 py-2 rounded-lg text-xs font-medium text-amber-200 inline-flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call 086994 36000 for Patient Delivery</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion FAQ */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs uppercase tracking-wider text-amber-400 font-medium mb-3">
              Frequently Asked Questions
            </div>

            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-stone-900/60 border border-stone-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-stone-200 hover:text-amber-300 transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-300 font-light leading-relaxed border-t border-stone-800/80 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
