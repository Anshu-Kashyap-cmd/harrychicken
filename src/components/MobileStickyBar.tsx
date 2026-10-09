import React from 'react';
import { Phone, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/soupData';

interface MobileStickyBarProps {
  onOpenOrderModal: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenOrderModal }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#171412]/95 border-t border-amber-900/40 p-2.5 backdrop-blur-md shadow-2xl">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
          className="btn-matte-clay flex-1 py-2.5 px-3 rounded-xl text-xs font-medium text-amber-200 flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span className="truncate">Call: 086994 36000</span>
        </a>

        <button
          onClick={onOpenOrderModal}
          className="btn-matte-clay-ghost flex-1 py-2.5 px-3 rounded-xl text-xs font-medium text-amber-300 flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="truncate">Order Broth</span>
        </button>
      </div>
    </div>
  );
};
