import React, { useState } from 'react';
import { Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, ExternalLink, Calendar } from 'lucide-react';
import { BUSINESS_INFO, WORKING_HOURS } from '../data/soupData';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    message: '',
    soupInterest: '12-Hour Golden Collagen Bone Broth'
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine current day for hours highlight
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysOfWeek[new Date().getDay()];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello Harry's Chicken, I would like to inquire about: ${formState.soupInterest || 'Chicken Soup Delivery'}. My name is ${formState.name || 'Patron'}.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="text-xs uppercase tracking-widest text-amber-500 font-medium">
            Direct Kitchen Contact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-stone-100 font-medium leading-tight">
            Order or Inquire with Harry’s Chicken in Ludhiana
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Need hot soup delivered right away? Preparing a care package for someone at Kdeep Hospital? Or planning live catering? Reach out directly.
          </p>
        </div>

        {/* 2-Column Split: Contact Details & Working Hours alongside Clean Lead Capture Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Affordances & Schedule */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Phone & Direct Contact Box */}
            <div className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-600/10 text-amber-400 border border-amber-600/20 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 uppercase tracking-wider font-medium">
                    Direct Kitchen Hotline & WhatsApp
                  </div>
                  <a
                    href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                    className="text-2xl sm:text-3xl font-serif text-amber-300 hover:text-amber-200 font-bold transition-colors inline-block mt-1"
                  >
                    086994 36000
                  </a>
                  <p className="text-stone-400 text-xs mt-1">
                    Tap to call directly or message for instant delivery status.
                  </p>
                </div>
              </div>

              {/* Action Buttons for Phone & WhatsApp */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                  className="btn-matte-clay flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-medium text-amber-200 text-center"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call 086994 36000</span>
                </a>

                <button
                  onClick={handleWhatsAppRedirect}
                  className="btn-matte-clay-ghost flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-medium text-emerald-400 hover:text-emerald-300 text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Message</span>
                </button>
              </div>
            </div>

            {/* Physical Location & Directions Box */}
            <div className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-5 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-600/10 text-amber-400 border border-amber-600/20 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-stone-400 uppercase tracking-wider font-medium">
                    Kitchen Address & Landmarks
                  </div>
                  <div className="text-base sm:text-lg text-stone-100 font-medium font-serif">
                    {BUSINESS_INFO.address}
                  </div>
                  <p className="text-xs text-amber-400/90 font-light">
                    Landmark: Directly near Green Land School Gate · 2 mins from Kdeep Hospital · Samrala Chowk
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    BUSINESS_INFO.googleMapsQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-300 hover:text-amber-200 inline-flex items-center gap-1.5 underline decoration-amber-500/40 underline-offset-4"
                >
                  <span>Open in Google Maps for Navigation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-[11px] text-stone-500 font-mono">Pin 141008</span>
              </div>
            </div>

            {/* Working Hours Schedule Table */}
            <div className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2 text-stone-200 font-serif text-lg">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Working Hours</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium">
                  Fresh Batches Simmering Daily
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {WORKING_HOURS.map((h) => {
                  const isToday = h.day.toLowerCase() === todayName.toLowerCase();
                  return (
                    <div
                      key={h.day}
                      className={`flex items-center justify-between py-1.5 px-3 rounded-lg transition-colors ${
                        isToday
                          ? 'bg-amber-600/15 border border-amber-500/40 text-amber-200 font-medium'
                          : 'text-stone-400 hover:text-stone-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isToday && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                        <span>{h.day}</span>
                      </span>
                      <span className="font-mono text-stone-300">{h.hours}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Clean Lead Capture / Contact Form */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-2xl bg-stone-900/70 border border-stone-800 relative shadow-2xl">
              
              <div className="space-y-2 mb-8">
                <h3 className="text-2xl sm:text-3xl font-serif italic text-stone-100 font-medium">
                  Send an Inquiry or Pre-Order
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  We usually respond within a few hours. For immediate delivery in the next 30 minutes, please call directly at 086994 36000.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 px-6 text-center space-y-4 rounded-xl bg-stone-950/80 border border-amber-600/40">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-xl font-serif text-amber-200 font-medium">
                    Inquiry Received, Harpreet Will Call You Shortly!
                  </h4>
                  <p className="text-xs text-stone-300 max-w-md mx-auto font-light leading-relaxed">
                    Thank you, {formState.name}. We have noted your request for {formState.soupInterest}. Our kitchen team at Samrala Chowk is reviewing it right now.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-matte-clay-ghost px-5 py-2 rounded-lg text-xs text-stone-300"
                    >
                      Send Another Note
                    </button>
                    <a
                      href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                      className="btn-matte-clay px-5 py-2 rounded-lg text-xs text-amber-200"
                    >
                      Call Now: 086994 36000
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jasleen Kaur"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950/80 border border-stone-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-stone-100 text-sm placeholder:text-stone-600 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                      Phone Number (for Delivery / Confirmation) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 098765 43210"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950/80 border border-stone-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-stone-100 text-sm placeholder:text-stone-600 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                      Select Soup or Service Requirement
                    </label>
                    <select
                      value={formState.soupInterest}
                      onChange={(e) => setFormState({ ...formState, soupInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950/80 border border-stone-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-stone-200 text-sm outline-none transition-all"
                    >
                      <option value="12-Hour Golden Collagen Bone Broth">12-Hour Golden Collagen Bone Broth (Single / Jar)</option>
                      <option value="Desi Kali Mirch & Herb Immunity Shorba">Desi Kali Mirch & Herb Immunity Shorba</option>
                      <option value="Royal Pulled Chicken & Corn Marrow Soup">Royal Pulled Chicken & Corn Marrow Soup</option>
                      <option value="Patient Convalescence & Hospital Care Pack (Near Kdeep Hospital)">Patient Convalescence & Hospital Care Pack (Near Kdeep Hospital)</option>
                      <option value="Heritage Family Care Kettle (1.5 Liters)">Heritage Family Care Kettle (1.5 Liters)</option>
                      <option value="Winter Wedding & Gathering Live Soup Kettles">Winter Wedding & Gathering Live Soup Kettles (Bulk)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                      Delivery Address or Special Notes
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Mention your locality (e.g., Near Samrala Chowk / Model Town / Kdeep Hospital Room No.) and any spice or sodium preferences..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950/80 border border-stone-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-stone-100 text-sm placeholder:text-stone-600 outline-none transition-all"
                    />
                  </div>

                  <p className="text-[11px] text-stone-400 font-light">
                    * We usually respond within a few hours.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-matte-clay w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-sm font-medium text-amber-200 tracking-wide"
                  >
                    {isSubmitting ? (
                      <span>Sending note to kitchen...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-400" />
                        <span>Submit Inquiry to Harry’s Chicken</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
