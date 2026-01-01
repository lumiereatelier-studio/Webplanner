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
      className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 ${
        isDark
          ? 'bg-[#1a1a1a]/60 border border-[#2a2a2a] hover:bg-[#1a1a1a]/80 hover:border-[#3a3a3a]'
          : 'bg-white/60 border border-[#e8e3dd] hover:bg-white/90 hover:border-[#d8d3cd]'
      } backdrop-blur-sm hover:shadow-xl hover:-translate-y-1 active:scale-95 w-full`}
    >
      {/* Accent gradient overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${accentColor}20 0%, transparent 100%)`
        }}
      />

      {/* Icon with accent color */}
      <div className="relative mb-4">
        <div
          className={`inline-flex p-3 rounded-xl transition-all duration-300 ${
            isDark ? 'bg-[#0a0a0a]' : 'bg-[#faf8f6]'
          }`}
          style={{
            boxShadow: `0 0 0 0 ${accentColor}40`,
          }}
        >
          <Icon 
            className="w-6 h-6 transition-colors duration-300" 
            style={{ color: accentColor }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className={`mb-1 tracking-wide ${
          isDark ? 'text-white' : 'text-[#5a4f45]'
        }`}>
          {title}
        </h3>
        
        <div className={`mb-3 ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
        }`}>
          {description}
        </div>

        <div 
          className="text-3xl transition-colors duration-300"
          style={{ color: accentColor }}
        >
          {stat}
        </div>
      </div>

      {/* Hover arrow indicator */}
      <div className={`absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 ${
        isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
      }`}>
        →
      </div>
    </button>
  );
}