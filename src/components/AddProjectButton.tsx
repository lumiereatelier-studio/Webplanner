import React from 'react';
import { Plus } from 'lucide-react';
import { Theme } from '../App';

interface AddProjectButtonProps {
  theme: Theme;
  onClick: () => void;
}

export function AddProjectButton({ theme, onClick }: AddProjectButtonProps) {
  const isDark = theme === 'noir';

  return (
    <button
      onClick={onClick}
      className={`w-full border-2 border-dashed rounded-lg py-8 transition-all flex items-center justify-center gap-2 group ${
        isDark
          ? 'bg-[#1a1a1a] border-[#2a2a2a] text-[#6a6a6a] hover:border-[#3a3a3a] hover:bg-[#0a0a0a]'
          : 'bg-white border-[#e8e3dd] text-[#8b7e74] hover:border-[#c9bfb5] hover:bg-[#faf8f6]'
      }`}
    >
      <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
      <span className="tracking-[0.1em] uppercase text-sm">Add New Project</span>
    </button>
  );
}
