import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../App';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
        theme === 'soft'
          ? 'bg-white text-[#8b7e74] shadow-sm hover:shadow-md border border-[#e8e3dd]'
          : 'bg-[#1a1a1a] text-[#a0a0a0] shadow-lg hover:shadow-xl border border-[#2a2a2a]'
      }`}
    >
      {theme === 'soft' ? (
        <>
          <Moon className="w-4 h-4" />
          <span className="text-sm tracking-wider uppercase">Noir</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4" />
          <span className="text-sm tracking-wider uppercase">Soft</span>
        </>
      )}
    </button>
  );
}
