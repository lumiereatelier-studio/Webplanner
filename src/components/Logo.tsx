import React from 'react';
import { Theme } from '../App';

interface LogoProps {
  theme: Theme;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ theme, size = 'md' }: LogoProps) {
  const isDark = theme === 'noir';
  
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  
  // Warmer, more visible colors for both themes
  const strokeColor = isDark ? '#d4d4d4' : '#8b7e74';
  const textColor = isDark ? 'text-[#e8e8e8]' : 'text-[#8b7e74]';
  const taglineColor = isDark ? 'text-[#b4b4b4]' : 'text-[#a89a8f]';

  return (
    <div className="flex items-center gap-3">
      <svg 
        className={sizes[size]} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Zen circle (Enso) - elegant and flowing */}
        <path
          d="M50 10 C 70 10, 90 30, 90 50 C 90 70, 70 90, 50 90 C 30 90, 10 70, 10 50 C 10 30, 28 12, 48 10"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Flow wave inside - representing movement and flow state */}
        <path
          d="M 30 50 Q 40 40, 50 50 T 70 50"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        
        {/* Subtle center dot - representing balance and center */}
        <circle
          cx="50"
          cy="50"
          r="2"
          fill={strokeColor}
          opacity="0.6"
        />
      </svg>
      
      <div className="flex flex-col leading-tight">
        <span className={`tracking-[0.3em] uppercase text-sm ${textColor}`}>
          ZenFlow
        </span>
        <span className={`text-[10px] tracking-wider ${taglineColor}`}>
          Organize Life. Find Flow.
        </span>
      </div>
    </div>
  );
}