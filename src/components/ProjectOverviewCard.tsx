import React from 'react';
import { Trash2, ArrowRight } from 'lucide-react';
import { Theme, Project } from '../App';

interface ProjectOverviewCardProps {
  theme: Theme;
  project: Project;
  onClick: () => void;
  onDelete: (id: string) => void;
}

export function ProjectOverviewCard({ theme, project, onClick, onDelete }: ProjectOverviewCardProps) {
  const isDark = theme === 'noir';

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(project.id);
  };

  return (
    <div 
      onClick={onClick}
      className={`rounded-lg p-6 shadow-sm hover:shadow-md transition-all cursor-pointer relative group h-64 flex flex-col ${
        isDark 
          ? 'bg-[#1a1a1a] border border-[#2a2a2a]' 
          : 'bg-white border border-[#e8e3dd]'
      }`}
    >
      <button
        onClick={handleDelete}
        className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 ${
          isDark ? 'text-[#6a6a6a] hover:text-[#a0a0a0]' : 'text-[#8b7e74] hover:text-[#6b5e54]'
        }`}
        aria-label="Delete project"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="flex-1 flex flex-col">
        {/* Project Label */}
        <div className={`tracking-[0.15em] uppercase text-xs mb-4 ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#8b7e74]'
        }`}>
          {project.label || 'Project Label'}
        </div>

        {/* Project Name */}
        <h3 className={`mb-3 line-clamp-2 ${
          isDark ? 'text-[#e0e0e0]' : 'text-[#5a4f45]'
        }`}>
          {project.name || 'Untitled Project'}
        </h3>

        {/* Status Badge */}
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs ${
            isDark 
              ? 'bg-[#0a0a0a] border border-[#2a2a2a] text-[#a0a0a0]'
              : 'bg-[#faf8f6] border border-[#e8e3dd] text-[#8b7e74]'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Brief Notes */}
        <p className={`text-sm line-clamp-3 flex-1 ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
        }`}>
          {project.notes || 'No notes added yet'}
        </p>

        {/* View Details Arrow */}
        <div className={`flex items-center gap-2 text-sm mt-4 group-hover:gap-3 transition-all ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#8b7e74]'
        }`}>
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
