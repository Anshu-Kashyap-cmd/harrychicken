import React from 'react';

interface LiquidDividerProps {
  variant?: 'amber' | 'subtle' | 'earthen';
  flip?: boolean;
}

export const LiquidDivider: React.FC<LiquidDividerProps> = ({ variant = 'subtle', flip = false }) => {
  const strokeColor =
    variant === 'amber'
      ? 'rgba(217, 119, 6, 0.45)'
      : variant === 'earthen'
      ? 'rgba(120, 113, 108, 0.25)'
      : 'rgba(217, 119, 6, 0.2)';

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none py-2 ${
        flip ? 'rotate-180' : ''
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-8 sm:h-12 text-[#1C1917]"
        preserveAspectRatio="none"
      >
        {/* Soft liquid ripple organic curve */}
        <path
          d="M0 24C180 38 360 10 540 24C720 38 900 12 1080 26C1260 40 1380 18 1440 24V48H0V24Z"
          fill="currentColor"
          opacity="0.3"
        />
        {/* Highlight wave stroke mimicking warm broth ripple */}
        <path
          d="M0 24C180 38 360 10 540 24C720 38 900 12 1080 26C1260 40 1380 18 1440 24"
          stroke={strokeColor}
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    </div>
  );
};
