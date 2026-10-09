import React, { useState } from 'react';
import { X, Phone, MessageSquare, Sparkles, Check, Flame, Activity, ShieldCheck, HeartPulse } from 'lucide-react';
import { SOUP_SERVICES, SoupService, BUSINESS_INFO } from '../data/soupData';

interface OrderCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: SoupService | null;
}

// Helper to parse volume string into milliliters
function parseVolumeMl(volumeStr: string): number {
  if (volumeStr.includes('Liter') || volumeStr.includes('Liters')) {
    const liters = parseFloat(volumeStr.match(/[\d.]+/)?.[0] || '1');
    return liters * 1000;
  }
  const mlMatch = volumeStr.match(/\d+/);
  return mlMatch ? parseInt(mlMatch[0], 10) : 350;
}

export const OrderCalculatorModal: React.FC<OrderCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialService
}) => {
  const [selectedSoupId, setSelectedSoupId] = useState<string>(
    initialService ? initialService.id : SOUP_SERVICES[0].id
  );
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [spiceLevel, setSpiceLevel] = useState<'mild' | 'classic' | 'extra-kali-mirch'>('classic');
  const [addExtraChicken, setAddExtraChicken] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('');

  if (!isOpen) return null;

  const currentSoup = SOUP_SERVICES.find((s) => s.id === selectedSoupId) || SOUP_SERVICES[0];
  const currentSize = currentSoup.sizes[selectedSizeIndex] || currentSoup.sizes[0];

  // Base price extraction
  const priceNumber = parseInt(currentSize.price.replace(/[^\d]/g, ''), 10) || 140;
  const extraChickenCost = addExtraChicken ? 50 : 0;
  const estimatedTotal = (priceNumber + extraChickenCost) * quantity;

  // Nutritional calculation based on selected volume
  const portionMl = parseVolumeMl(currentSize.volume);
  const isLargeKettle = portionMl >= 1500;
  // If large kettle, provide both per-serving (350ml standard bowl) and total kettle values
  const servingSizeMl = isLargeKettle ? 350 : portionMl;

  const nutrition = currentSoup.nutrition;

  // Single serving values
  const servingCalories = Math.round((nutrition.caloriesPer100ml * (servingSizeMl / 100)) + (addExtraChicken ? 115 : 0));
  const servingProtein = Math.round(((nutrition.proteinPer100ml * (servingSizeMl / 100)) + (addExtraChicken ? 22 : 0)) * 10) / 10;
  const servingCollagen = Math.round((nutrition.collagenPer100ml * (servingSizeMl / 100)) * 10) / 10;

  // Total container/order values
  const totalVolumePortion = (portionMl / 100);
  const totalCalories = Math.round(((nutrition.caloriesPer100ml * totalVolumePortion) + (addExtraChicken ? 115 : 0)) * quantity);
  const totalProtein = Math.round((((nutrition.proteinPer100ml * totalVolumePortion) + (addExtraChicken ? 22 : 0)) * quantity) * 10) / 10;
  const totalCollagen = Math.round((nutrition.collagenPer100ml * totalVolumePortion * quantity) * 10) / 10;

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `*New Order Inquiry - Harry's Chicken (Ludhiana)*\n` +
      `• *Soup:* ${currentSoup.name}\n` +
      `• *Portion:* ${currentSize.label} (${currentSize.volume})\n` +
      `• *Quantity:* ${quantity}\n` +
      `• *Spice Preference:* ${spiceLevel}\n` +
      `• *Extra Pulled Chicken:* ${addExtraChicken ? 'Yes (+₹50)' : 'No'}\n` +
      `• *Estimated Total:* ₹${estimatedTotal}\n` +
      `• *Est. Nutrition (Total):* ~${totalCalories} kcal | ~${totalProtein}g protein | ~${totalCollagen}g collagen\n` +
      `• *Customer:* ${customerName || 'Guest'}\n` +
      `• *Phone:* ${customerPhone || 'Not specified'}\n` +
      `• *Locality in Ludhiana:* ${deliveryArea || 'Samrala Chowk / Nearby'}\n\n` +
      `Please confirm availability and dispatch time. Thank you!`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800 transition-colors"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 mb-6 border-b border-stone-800 pb-4">
          <div className="text-xs uppercase tracking-widest text-amber-500 font-medium">
            Direct Kitchen Order & Quote Calculator
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif italic text-stone-100 font-medium">
            Customize Your Broth
          </h3>
          <p className="text-xs text-stone-400 font-light">
            Fast dispatch from Samrala Chowk, Ludhiana · Hot thermal packaging
          </p>
        </div>

        {/* Form Options */}
        <div className="space-y-5 text-xs text-stone-300">
          
          {/* Soup Selection */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
              Select Soup Variety
            </label>
            <select
              value={selectedSoupId}
              onChange={(e) => {
                setSelectedSoupId(e.target.value);
                setSelectedSizeIndex(0);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm outline-none focus:border-amber-500"
            >
              {SOUP_SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.sizes[0]?.price})
                </option>
              ))}
            </select>
          </div>

          {/* Sizing / Portions */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
              Portion / Packaging
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {currentSoup.sizes.map((sz, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    selectedSizeIndex === idx
                      ? 'bg-amber-600/20 border-amber-500 text-stone-100'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="font-medium text-xs truncate">{sz.label}</div>
                  <div className="text-amber-400 font-serif text-sm font-bold mt-0.5">{sz.price}</div>
                  <div className="text-[10px] text-stone-400">{sz.volume}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ESTIMATED NUTRITIONAL BREAKDOWN CARD */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/90 border border-amber-600/35 relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between mb-3 border-b border-stone-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-amber-400" />
                <span className="text-stone-100 font-serif text-sm font-medium tracking-wide">
                  Estimated Nutritional Breakdown
                </span>
              </div>
              <span className="text-[10px] text-amber-400/90 font-mono">
                {isLargeKettle ? `Per 350ml Bowl (${currentSize.volume} total)` : `Per ${currentSize.volume}`}
              </span>
            </div>

            {/* 3 Prominent Nutritional Metric KPIs */}
            <div className="grid grid-cols-3 gap-2.5 text-center mb-3">
              {/* Calories */}
              <div className="p-2.5 rounded-xl bg-stone-900/90 border border-stone-800/80">
                <div className="text-[10px] text-stone-400 uppercase tracking-wider">
                  Calories
                </div>
                <div className="text-lg sm:text-xl font-serif text-amber-300 font-bold tabular-nums mt-0.5">
                  {servingCalories} <span className="text-xs font-sans font-normal text-stone-400">kcal</span>
                </div>
                <div className="text-[9px] text-stone-500 mt-0.5">
                  Clean low-glycemic
                </div>
              </div>

              {/* Protein */}
              <div className="p-2.5 rounded-xl bg-stone-900/90 border border-stone-800/80">
                <div className="text-[10px] text-stone-400 uppercase tracking-wider">
                  Protein
                </div>
                <div className="text-lg sm:text-xl font-serif text-amber-200 font-bold tabular-nums mt-0.5">
                  {servingProtein} <span className="text-xs font-sans font-normal text-stone-400">g</span>
                </div>
                <div className="text-[9px] text-emerald-400/90 mt-0.5">
                  {addExtraChicken ? '+22g Pulled Chicken' : 'Natural Bio-available'}
                </div>
              </div>

              {/* Bioactive Collagen Content */}
              <div className="p-2.5 rounded-xl bg-stone-900/90 border border-amber-600/30">
                <div className="text-[10px] text-amber-400/90 uppercase tracking-wider font-medium">
                  Pure Collagen
                </div>
                <div className="text-lg sm:text-xl font-serif text-amber-400 font-bold tabular-nums mt-0.5">
                  {servingCollagen} <span className="text-xs font-sans font-normal text-amber-300">g</span>
                </div>
                <div className="text-[9px] text-stone-400 mt-0.5">
                  Type II Gelatin
                </div>
              </div>
            </div>

            {/* Health Highlights & Bioactive Benefits */}
            <div className="pt-2 border-t border-stone-800/60 flex flex-col gap-1 text-[11px] text-stone-300 font-light">
              <div className="flex items-center gap-1.5 text-amber-300/90 font-medium text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Bioactive Focus: {nutrition.primaryBioactive}</span>
              </div>
              <p className="text-stone-400 text-[10.5px] leading-relaxed">
                {nutrition.healthHighlight}
              </p>
              {quantity > 1 && (
                <div className="text-[10px] text-stone-500 pt-1 font-mono">
                  Order Total ({quantity} items): ~{totalCalories} kcal · ~{totalProtein}g protein · ~{totalCollagen}g collagen
                </div>
              )}
            </div>
          </div>

          {/* Quantity & Spice Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 hover:text-white flex items-center justify-center text-lg"
                >
                  -
                </button>
                <span className="font-mono text-base text-stone-100 font-semibold px-2">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 hover:text-white flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                Black Pepper & Herb Level
              </label>
              <div className="flex items-center gap-1.5 p-1 bg-stone-950 rounded-lg border border-stone-800">
                {(['mild', 'classic', 'extra-kali-mirch'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSpiceLevel(lvl)}
                    className={`flex-1 py-1.5 rounded text-[11px] font-medium capitalize transition-colors ${
                      spiceLevel === lvl
                        ? 'bg-amber-600 text-stone-950'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {lvl === 'extra-kali-mirch' ? 'Extra' : lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add-ons checkbox */}
          <label className="flex items-center gap-3 p-3 rounded-xl bg-stone-950/60 border border-stone-800 cursor-pointer hover:border-stone-700">
            <input
              type="checkbox"
              checked={addExtraChicken}
              onChange={(e) => setAddExtraChicken(e.target.checked)}
              className="w-4 h-4 rounded border-stone-700 text-amber-600 focus:ring-amber-500 bg-stone-900"
            />
            <div className="text-xs text-stone-200 flex-1 flex items-center justify-between">
              <span>Add Extra Shredded Pulled Chicken Breast (+₹50)</span>
              <span className="text-[10px] text-amber-400/90 font-mono">+22g protein</span>
            </div>
          </label>

          {/* Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <input
              type="text"
              placeholder="Your Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder:text-stone-600 outline-none focus:border-amber-500"
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder:text-stone-600 outline-none focus:border-amber-500"
            />
          </div>

          <input
            type="text"
            placeholder="Delivery Address / Landmark (e.g. Near Samrala Chowk / Model Town / Kdeep Hospital)"
            value={deliveryArea}
            onChange={(e) => setDeliveryArea(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder:text-stone-600 outline-none focus:border-amber-500"
          />

          {/* Estimated Total Bar */}
          <div className="p-4 rounded-xl bg-stone-950 border border-amber-900/50 flex items-center justify-between">
            <div>
              <span className="text-stone-400 block text-[11px]">Estimated Price</span>
              <span className="text-stone-100 text-xs">Piping Hot Delivery in Ludhiana</span>
            </div>
            <div className="text-2xl font-serif text-amber-300 font-bold">
              ₹{estimatedTotal}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleWhatsAppOrder}
              className="btn-matte-clay flex-1 py-3.5 rounded-xl text-xs font-medium text-amber-200 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Send Order via WhatsApp</span>
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
              className="btn-matte-clay-ghost flex-1 py-3.5 rounded-xl text-xs font-medium text-amber-300 flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call to Confirm (086994 36000)</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

