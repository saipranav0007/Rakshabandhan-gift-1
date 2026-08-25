import React from 'react';

interface DiyaFlameProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isInteractive?: boolean;
}

export const DiyaFlame: React.FC<DiyaFlameProps> = ({ size = 'md', className = '', isInteractive = false }) => {
  const sizeMap = {
    sm: { w: 'w-10', h: 'h-8', flameW: 'w-2.5', flameH: 'h-4', glow: 'w-16 h-16' },
    md: { w: 'w-16', h: 'h-12', flameW: 'w-3.5', flameH: 'h-6', glow: 'w-24 h-24' },
    lg: { w: 'w-24', h: 'h-16', flameW: 'w-5', flameH: 'h-9', glow: 'w-36 h-36' },
    xl: { w: 'w-32', h: 'h-20', flameW: 'w-7', flameH: 'h-12', glow: 'w-48 h-48' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`relative flex flex-col items-center justify-center ${className} ${isInteractive ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}>
      {/* Radial Golden Light Glow */}
      <div 
        className={`absolute rounded-full bg-festive-amber/20 blur-xl animate-pulse-glow pointer-events-none -top-6 ${currentSize.glow}`}
      />
      
      {/* Flame */}
      <div className="relative z-10 flex flex-col items-center mb-0.5">
        <div 
          className={`${currentSize.flameW} ${currentSize.flameH} rounded-full diya-flame-core animate-flicker origin-bottom`}
        />
        {/* Wick */}
        <div className="w-0.5 h-1.5 bg-slate-900 -mt-0.5 z-10" />
      </div>

      {/* Clay Diya Body (Traditional Terracotta Vessel) */}
      <div className="relative">
        <svg 
          viewBox="0 0 100 50" 
          className={`${currentSize.w} ${currentSize.h} drop-shadow-lg`}
        >
          <defs>
            <linearGradient id="terracottaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#b45309" />
              <stop offset="40%" stop-color="#78350f" />
              <stop offset="100%" stop-color="#451a03" />
            </linearGradient>
            <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#d97706" />
              <stop offset="50%" stop-color="#fef3c7" />
              <stop offset="100%" stop-color="#b45309" />
            </linearGradient>
          </defs>
          
          {/* Diya Base */}
          <path 
            d="M 5,20 Q 50,55 95,20 Q 80,12 50,15 Q 20,12 5,20 Z" 
            fill="url(#terracottaGrad)" 
            stroke="#92400e" 
            strokeWidth="1.5"
          />
          {/* Diya Rim */}
          <ellipse 
            cx="50" 
            cy="16" 
            rx="45" 
            ry="6" 
            fill="#78350f" 
            stroke="url(#goldRim)" 
            strokeWidth="1"
          />
          {/* Oil surface */}
          <ellipse 
            cx="50" 
            cy="17" 
            rx="38" 
            ry="4" 
            fill="#b45309" 
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
};
