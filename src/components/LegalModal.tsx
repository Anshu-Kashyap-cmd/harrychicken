import React from 'react';
import { X, ShieldCheck, FileText, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/soupData';

export type LegalDocType = 'privacy' | 'terms' | 'disclaimer';

interface LegalModalProps {
  type: LegalDocType | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-serif text-2xl font-medium">
              <ShieldCheck className="w-6 h-6" />
              <span>Privacy Policy</span>
            </div>
            <p className="text-stone-400 text-xs">
              Last updated: October 2026 · Harry’s chicken, Ludhiana
            </p>

            <h4 className="text-stone-100 font-medium pt-2">1. Information We Collect</h4>
            <p>
              When you place a takeaway order, request a catering quote, or contact us through this website, we collect your name, phone number, and delivery address. This information is used strictly to fulfill your order and communicate delivery times.
            </p>

            <h4 className="text-stone-100 font-medium pt-2">2. How We Protect Your Data</h4>
            <p>
              We do not sell, rent, or trade your personal contact details to third-party marketing companies. Your phone number is used exclusively by our delivery riders and kitchen team at Samrala Chowk.
            </p>

            <h4 className="text-stone-100 font-medium pt-2">3. Third-Party Services</h4>
            <p>
              Our website may provide direct links to Google Maps for navigation and WhatsApp for direct messaging. These services operate under their respective privacy policies.
            </p>

            <h4 className="text-stone-100 font-medium pt-2">4. Contacting Us</h4>
            <p>
              If you have any questions regarding your data, please contact Harpreet Singh directly at {BUSINESS_INFO.phone} or visit our kitchen at {BUSINESS_INFO.address}.
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-serif text-2xl font-medium">
              <FileText className="w-6 h-6" />
              <span>Terms & Conditions</span>
            </div>
            <p className="text-stone-400 text-xs">
              Last updated: October 2026 · Harry’s chicken, Ludhiana
            </p>

            <h4 className="text-stone-100 font-medium pt-2">1. Fresh Food Preparation</h4>
            <p>
              All chicken broths, shorbas, and soup pots prepared by Harry’s chicken are slow-cooked fresh daily. For optimal flavor and safety, please consume hot soup immediately upon receipt or refrigerate properly.
            </p>

            <h4 className="text-stone-100 font-medium pt-2">2. Delivery & Dispatch Times</h4>
            <p>
              While we strive to deliver within 30 to 45 minutes across Ludhiana, dispatch times may vary depending on weather, traffic around Samrala Chowk, and seasonal order volumes.
            </p>

            <h4 className="text-stone-100 font-medium pt-2">3. Pricing & Modifications</h4>
            <p>
              Prices listed on this website are in Indian Rupees (INR) and are subject to change based on poultry market rates and seasonal availability. Catering quotes are valid for 14 days from issuance.
            </p>

            <h4 className="text-stone-100 font-medium pt-2">4. Cancellations</h4>
            <p>
              Because our broths are prepared and packaged immediately upon order confirmation, order cancellations must be made by phone within 5 minutes of placing your order.
            </p>
          </div>
        )}

        {type === 'disclaimer' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-serif text-2xl font-medium">
              <AlertCircle className="w-6 h-6" />
              <span>Nutritional & Medical Disclaimer</span>
            </div>
            <p className="text-stone-400 text-xs">
              Last updated: October 2026 · Harry’s chicken, Ludhiana
            </p>

            <h4 className="text-stone-100 font-medium pt-2">1. General Wellness Statement</h4>
            <p>
              The nutritional information and health benefits described on this website regarding collagen, bone broth, glycine, and immunity spices are based on traditional Punjabi culinary practices and general nutritional science.
            </p>

            <h4 className="text-stone-100 font-medium pt-2">2. Not a Substitute for Medical Advice</h4>
            <p>
              Our soups and convalescence broths are wholesome food items and are not intended to diagnose, treat, cure, or prevent any medical condition or disease. Patients recovering at Kdeep Hospital or under medical supervision should consult their physician regarding specific dietary restrictions (such as sodium or protein intake).
            </p>

            <h4 className="text-stone-100 font-medium pt-2">3. Allergens</h4>
            <p>
              Our kitchen processes whole chicken, fresh ginger, garlic, celery, black pepper, and whole spices. If you have severe food allergies, please notify our team prior to ordering.
            </p>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="btn-matte-clay px-6 py-2 rounded-xl text-xs font-medium text-amber-200"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
