import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Theme, Section } from '../App';

interface LifeAreaCardProps {
  theme: Theme;
  icon: LucideIcon;
  title: string;
  stat: string | number;
  description: string;
  section: Section;
  accentColor: string;
  onNavigate: (section: Section) => void;
}

export function LifeAreaCard({
  theme,
  icon: Icon,
  title,
  stat,
  description,
  section,
  accentColor,
  onNavigate
}: LifeAreaCardProps) {
  const isDark = theme === 'noir';

  return (
    <button
      onClick={() => onNavigate(section)}
      className={`group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-500 w-full backdrop-blur-[6px] border border-transparent hover:shadow-2xl hover:-translate-y-2 active:scale-95`}
      style={{
        background: 'rgba(0, 0, 0, 0.00)',
        borderRadius: '16px',
        boxShadow: isDark 
          ? `0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 40px ${accentColor}08` 
          : `0 8px 32px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.4), 0 4px 60px rgba(0, 0, 0, 0.03)`
      }}
    >
      {/* Ambient gradient background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${accentColor}40 0%, transparent 70%)`
        }}
      />

      {/* Top edge glow */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          boxShadow: `0 0 20px ${accentColor}80`
        }}
      />

      {/* Icon with enhanced styling */}
      <div className="relative mb-6">
        <div
          className={`inline-flex p-4 rounded-2xl transition-all duration-500 ${
            isDark ? 'bg-[#0f0f0f]/40' : 'bg-white/40'
          } backdrop-blur-sm group-hover:scale-110 group-hover:shadow-xl`}
          style={{
            border: `1px solid ${accentColor}20`,
            boxShadow: `0 4px 20px ${accentColor}15, 0 0 0 1px ${accentColor}10 inset`
          }}
        >
          <Icon 
            className="w-7 h-7 transition-all duration-500 group-hover:scale-110" 
            style={{ 
              color: accentColor,
              filter: `drop-shadow(0 0 8px ${accentColor}40)`
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative space-y-3">
        <h3 
          className={`text-xl tracking-wide transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-[#5a4f45]'
          }`}
        >
          {title}
        </h3>
        
        <div 
          className={`text-sm transition-colors duration-300 ${
            isDark ? 'text-[#8a8a8a]' : 'text-[#a89a8f]'
          }`}
        >
          {description}
        </div>

        <div 
          className="text-4xl transition-all duration-500 group-hover:scale-105"
          style={{ 
            color: accentColor,
            textShadow: `0 0 20px ${accentColor}30`
          }}
        >
          {stat}
        </div>
      </div>

      {/* Bottom corner accent */}
      <div 
        className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${accentColor} 0%, transparent 70%)`
        }}
      />

      {/* Hover arrow indicator */}
      <div 
        className={`absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 text-xl ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
        }`}
        style={{
          textShadow: `0 0 10px ${accentColor}40`
        }}
      >
        →
      </div>

      {/* Glass reflection effect */}
      <div 
        className="absolute top-0 left-0 right-0 h-1/2 opacity-10 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, white 0%, transparent 100%)'
        }}
      />
    </button>
  );
}