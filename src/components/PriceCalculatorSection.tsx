import React, { useState } from 'react';
import { Calculator, Phone, MessageSquare, Plus, Minus, Check, Flame, HeartPulse, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import { SOUP_SERVICES, BUSINESS_INFO } from '../data/soupData';

interface AddOn {
  id: string;
  name: string;
  price: number;
  protein: number;
  calories: number;
  desc: string;
}

const AVAILABLE_ADDONS: AddOn[] = [
  {
    id: 'extra-chicken',
    name: 'Extra Shredded Pulled Chicken Breast',
    price: 50,
    protein: 22,
    calories: 110,
    desc: 'Dense lean meat added directly into the broth'
  },
  {
    id: 'croutons',
    name: 'Toasted Garlic Herb Croutons & Lemon Halves',
    price: 30,
    protein: 2,
    calories: 70,
    desc: 'Artisanal crispy accompaniment pack'
  },
  {
    id: 'ginger-shot',
    name: 'Cold-Pressed Raw Ginger & Turmeric Tonic Shot',
    price: 40,
    protein: 1,
    calories: 25,
    desc: 'Intense thermogenic immunity booster'
  },
  {
    id: 'clay-matka',
    name: 'Traditional Reusable Earthen Clay Matka (Sealed)',
    price: 45,
    protein: 0,
    calories: 0,
    desc: 'Authentic rustic pottery vessel that retains heat'
  }
];

const LUDHIANA_ZONES = [
  { id: 'samrala', label: 'Samrala Chowk / SEC 22 (Local)', fee: 0, minFree: 0 },
  { id: 'kdeep', label: 'Near Kdeep Hospital / Green Land School', fee: 0, minFree: 0 },
  { id: 'cheema', label: 'Cheema Chowk & Transport Nagar', fee: 30, minFree: 250 },
  { id: 'modeltown', label: 'Model Town & Dugri', fee: 40, minFree: 350 },
  { id: 'civillines', label: 'Civil Lines & Mall Road', fee: 40, minFree: 350 },
  { id: 'chdroad', label: 'Chandigarh Road & Focal Point', fee: 40, minFree: 350 },
  { id: 'pickup', label: 'Self Pickup at Samrala Chowk Kitchen', fee: 0, minFree: 0 }
];

export const PriceCalculatorSection: React.FC = () => {
  const [selectedSoupId, setSelectedSoupId] = useState<string>(SOUP_SERVICES[0].id);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedZoneId, setSelectedZoneId] = useState<string>('samrala');
  const [spicePreference, setSpicePreference] = useState<'mild' | 'classic' | 'extra'>('classic');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');

  const currentSoup = SOUP_SERVICES.find((s) => s.id === selectedSoupId) || SOUP_SERVICES[0];
  const currentSize = currentSoup.sizes[selectedSizeIndex] || currentSoup.sizes[0];
  const selectedZone = LUDHIANA_ZONES.find((z) => z.id === selectedZoneId) || LUDHIANA_ZONES[0];

  // Price calculations
  const basePricePerUnit = parseInt(currentSize.price.replace(/[^\d]/g, ''), 10) || 140;
  const addonsTotalPerUnit = selectedAddOns.reduce((acc, addonId) => {
    const item = AVAILABLE_ADDONS.find((a) => a.id === addonId);
    return acc + (item ? item.price : 0);
  }, 0);

  const subtotal = (basePricePerUnit + addonsTotalPerUnit) * quantity;
  const isFreeDelivery = subtotal >= selectedZone.minFree || selectedZone.fee === 0;
  const deliveryFee = isFreeDelivery ? 0 : selectedZone.fee;
  const grandTotal = subtotal + deliveryFee;

  // Nutrition calculations
  const volumeMatch = currentSize.volume.match(/\d+/);
  const volumeMl = volumeMatch ? parseInt(volumeMatch[0], 10) : 350;
  const volumeMultiplier = volumeMl / 100;

  const addonsProtein = selectedAddOns.reduce((acc, id) => {
    const item = AVAILABLE_ADDONS.find((a) => a.id === id);
    return acc + (item ? item.protein : 0);
  }, 0);

  const addonsCalories = selectedAddOns.reduce((acc, id) => {
    const item = AVAILABLE_ADDONS.find((a) => a.id === id);
    return acc + (item ? item.calories : 0);
  }, 0);

  const totalCalories = Math.round(
    (currentSoup.nutrition.caloriesPer100ml * volumeMultiplier + addonsCalories) * quantity
  );
  const totalProtein = Math.round(
    (currentSoup.nutrition.proteinPer100ml * volumeMultiplier + addonsProtein) * quantity * 10
  ) / 10;
  const totalCollagen = Math.round(
    currentSoup.nutrition.collagenPer100ml * volumeMultiplier * quantity * 10
  ) / 10;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWhatsAppDispatch = () => {
    const addonNames = selectedAddOns
      .map((id) => AVAILABLE_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = encodeURIComponent(
      `*🍲 Price Calculator Order - Harry's Chicken (Ludhiana)*\n` +
      `--------------------------------------\n` +
      `• *Selected Broth:* ${currentSoup.name}\n` +
      `• *Portion Size:* ${currentSize.label} (${currentSize.volume})\n` +
      `• *Quantity:* ${quantity}x (₹${basePricePerUnit} each)\n` +
      `• *Pepper Level:* ${spicePreference}\n` +
      `• *Add-Ons:* ${addonNames || 'None'}\n` +
      `• *Delivery Area:* ${selectedZone.label}\n` +
      `--------------------------------------\n` +
      `• *Subtotal:* ₹${subtotal}\n` +
      `• *Delivery:* ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}\n` +
      `• *Grand Total:* ₹${grandTotal}\n` +
      `• *Est. Nutrition:* ~${totalCalories} kcal | ~${totalProtein}g protein | ~${totalCollagen}g collagen\n` +
      `--------------------------------------\n` +
      `• *Customer:* ${customerName || 'Patron'}\n` +
      `• *Phone:* ${customerPhone || 'Will share on call'}\n\n` +
      `Please confirm order preparation at Samrala Chowk!`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="calculator" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="text-xs uppercase tracking-widest text-amber-500 font-medium flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Interactive Price & Portion Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-stone-100 font-medium leading-tight">
            Calculate Your Custom Soup Order & Live Bill
          </h2>
          <p className="text-stone-300 text-base font-light leading-relaxed">
            Select your broth variety, portions, customized herbs, and delivery locality in Ludhiana. See instant real-time pricing and estimated nutritional values before ordering.
          </p>
        </div>

        {/* 2-Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Controls, Customization & Options (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Choose Soup Type */}
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-medium">
                  1. Choose Soup Variety
                </span>
                <span className="text-[11px] text-stone-400 font-mono">
                  {SOUP_SERVICES.length} Handcrafted Broths
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SOUP_SERVICES.map((soup) => (
                  <button
                    key={soup.id}
                    type="button"
                    onClick={() => {
                      setSelectedSoupId(soup.id);
                      setSelectedSizeIndex(0);
                    }}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      selectedSoupId === soup.id
                        ? 'bg-amber-600/15 border-amber-500 text-stone-100 shadow-md ring-1 ring-amber-500/50'
                        : 'bg-stone-950/60 border-stone-800/80 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                    }`}
                  >
                    <div className="font-serif italic text-sm text-stone-100 font-medium">
                      {soup.name}
                    </div>
                    <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">
                      Starting {soup.sizes[0]?.price}
                    </div>
                    <div className="text-[10px] text-stone-500 line-clamp-1 mt-1">
                      {soup.simmerTime} · {soup.nutrition.primaryBioactive}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Portion & Quantity */}
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-medium">
                  2. Select Portion Size & Quantity
                </span>
                <span className="text-[11px] text-stone-400 font-mono">
                  Thermal Packaging
                </span>
              </div>

              {/* Portion Sizes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {currentSoup.sizes.map((sz, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedSizeIndex === idx
                        ? 'bg-amber-600/20 border-amber-500 text-stone-100'
                        : 'bg-stone-950/60 border-stone-800/80 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="text-xs font-medium text-stone-200 truncate">{sz.label}</div>
                    <div className="text-base font-serif text-amber-300 font-bold mt-0.5">{sz.price}</div>
                    <div className="text-[10px] text-stone-400">{sz.volume}</div>
                  </button>
                ))}
              </div>

              {/* Quantity Counter & Pepper Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                    Number of Servings / Bowls
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 hover:text-white flex items-center justify-center text-lg active:scale-95 transition-transform"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-lg text-stone-100 font-semibold px-3">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 hover:text-white flex items-center justify-center text-lg active:scale-95 transition-transform"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                    Black Pepper & Heat Level
                  </label>
                  <div className="flex items-center gap-1.5 p-1 bg-stone-950 rounded-xl border border-stone-800">
                    {(['mild', 'classic', 'extra'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSpicePreference(lvl)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                          spicePreference === lvl
                            ? 'bg-amber-600 text-stone-950 font-semibold'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {lvl === 'extra' ? 'Extra Pepper' : lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Add-Ons & Extras */}
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-medium">
                  3. Customize with Add-Ons & Sides
                </span>
                <span className="text-[11px] text-stone-400">Optional</span>
              </div>

              <div className="space-y-2">
                {AVAILABLE_ADDONS.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-amber-600/15 border-amber-500/80 text-stone-100'
                          : 'bg-stone-950/60 border-stone-800/80 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-amber-600 border-amber-500 text-stone-950'
                              : 'border-stone-700 bg-stone-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-stone-200">
                            {addon.name}
                          </div>
                          <div className="text-[10px] text-stone-500">
                            {addon.desc} {addon.protein > 0 && `(adds +${addon.protein}g protein)`}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm font-serif text-amber-400 font-semibold shrink-0">
                        +₹{addon.price}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Locality / Delivery Distance */}
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-medium flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>4. Choose Ludhiana Locality</span>
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">
                  Free Delivery on ₹350+
                </span>
              </div>

              <select
                value={selectedZoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs sm:text-sm outline-none focus:border-amber-500"
              >
                {LUDHIANA_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.label} {zone.fee === 0 ? '(Free Delivery)' : `(₹${zone.fee} Delivery)`}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* RIGHT COLUMN: Live Bill Slip & Instant Order Dispatch (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            {/* Live Bill Receipt Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-stone-900 border border-amber-600/35 relative overflow-hidden shadow-2xl">
              {/* Subtle radial amber sheen */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-5 relative z-10">
                {/* Receipt Header */}
                <div className="border-b border-stone-800 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
                      Estimated Bill Summary
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      Harry’s Chicken
                    </span>
                  </div>
                  <h3 className="text-xl font-serif italic text-stone-100 font-medium mt-1">
                    {currentSoup.name}
                  </h3>
                  <div className="text-xs text-stone-400 font-light">
                    {currentSize.label} ({currentSize.volume}) × {quantity}
                  </div>
                </div>

                {/* Itemized Line Items */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-stone-300">
                    <span>Base Broth ({quantity} × ₹{basePricePerUnit})</span>
                    <span className="font-mono text-stone-100">₹{basePricePerUnit * quantity}</span>
                  </div>

                  {selectedAddOns.map((id) => {
                    const item = AVAILABLE_ADDONS.find((a) => a.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center justify-between text-stone-400">
                        <span className="truncate pr-2">+ {item.name} ({quantity}x)</span>
                        <span className="font-mono text-amber-300/90 shrink-0">₹{item.price * quantity}</span>
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-between text-stone-400 pt-1">
                    <span>Delivery ({selectedZone.label})</span>
                    <span className="font-mono">
                      {isFreeDelivery ? (
                        <span className="text-emerald-400 font-medium">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                </div>

                {/* Total Line */}
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/90 flex items-center justify-between">
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase tracking-wider">
                      Grand Total
                    </span>
                    <span className="text-emerald-400 text-[11px]">
                      Piping Hot Thermal Dispatch
                    </span>
                  </div>
                  <div className="text-3xl font-serif text-amber-300 font-bold tabular-nums">
                    ₹{grandTotal}
                  </div>
                </div>

                {/* Nutritional Analysis Bar */}
                <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-900/40 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-400/90 font-medium flex items-center gap-1.5">
                      <HeartPulse className="w-3.5 h-3.5" />
                      <span>Nutritional Analysis for Order</span>
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">100% Clean</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-stone-900/90 border border-stone-800">
                      <div className="text-[10px] text-stone-400">Calories</div>
                      <div className="font-serif text-amber-200 font-bold text-sm tabular-nums mt-0.5">
                        ~{totalCalories} <span className="text-[10px] font-sans font-normal text-stone-400">kcal</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-stone-900/90 border border-stone-800">
                      <div className="text-[10px] text-stone-400">Protein</div>
                      <div className="font-serif text-amber-200 font-bold text-sm tabular-nums mt-0.5">
                        ~{totalProtein} <span className="text-[10px] font-sans font-normal text-stone-400">g</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-stone-900/90 border border-amber-600/30">
                      <div className="text-[10px] text-amber-400">Collagen</div>
                      <div className="font-serif text-amber-400 font-bold text-sm tabular-nums mt-0.5">
                        ~{totalCollagen} <span className="text-[10px] font-sans font-normal text-amber-300">g</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10.5px] text-stone-400 font-light leading-relaxed">
                    Extracted from slow-simmered chicken marrow & joints. Zero cornstarch or MSG powders.
                  </p>
                </div>

                {/* Quick Optional Name & Phone */}
                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs placeholder:text-stone-600 outline-none focus:border-amber-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number for Confirmation"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs placeholder:text-stone-600 outline-none focus:border-amber-500"
                  />
                </div>

                {/* Order Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={handleWhatsAppDispatch}
                    className="btn-matte-clay w-full py-3.5 rounded-xl text-xs font-medium text-amber-200 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Send Calculated Order via WhatsApp (₹{grandTotal})</span>
                  </button>

                  <a
                    href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                    className="btn-matte-clay-ghost w-full py-3 rounded-xl text-xs font-medium text-amber-300 flex items-center justify-center gap-2 text-center"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Call Hotline: 086994 36000</span>
                  </a>
                </div>

              </div>
            </div>

            {/* Quick Landmark / Kitchen Note */}
            <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/80 text-xs text-stone-400 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                Simmered fresh at Samrala Chowk, SEC 22 (Near Green Land School Gate & Kdeep Hospital).
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
