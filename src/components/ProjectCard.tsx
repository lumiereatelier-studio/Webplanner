import React from 'react';
import { Trash2 } from 'lucide-react';
import { Project } from '../App';

interface ProjectCardProps {
  project: Project;
  onUpdate: (id: string, updatedProject: Partial<Project>) => void;
  onDelete: (id: string) => void;
}

export function ProjectCard({ project, onUpdate, onDelete }: ProjectCardProps) {
  const handleChange = (field: keyof Project, value: string) => {
    onUpdate(project.id, { [field]: value });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm relative group">
      <button
        onClick={() => onDelete(project.id)}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#8b7e74] hover:text-[#6b5e54]"
        aria-label="Delete project"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="space-y-6">
        {/* Project Label */}
        <div>
          <input
            type="text"
            value={project.label}
            onChange={(e) => handleChange('label', e.target.value)}
            className="text-[#8b7e74] tracking-[0.15em] uppercase text-sm bg-transparent border-none outline-none w-full placeholder:text-[#c9bfb5]"
            placeholder="Project Label"
          />
        </div>

        {/* Project Name */}
        <div>
          <label className="block text-[#8b7e74] text-xs mb-2">
            What is the name of this project?
          </label>
          <input
            type="text"
            value={project.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full bg-[#faf8f6] border border-[#e8e3dd] rounded px-4 py-3 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors"
            placeholder=""
          />
        </div>

        {/* Notes / Context / Purpose */}
        <div>
          <label className="block text-[#8b7e74] text-xs mb-2">
            Notes / context / purpose
          </label>
          <textarea
            value={project.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="w-full bg-[#faf8f6] border border-[#e8e3dd] rounded px-4 py-3 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors resize-none"
            rows={2}
            placeholder="What is the origin idea of? Why does it matter right now?"
          />
        </div>

        {/* Goals */}
        <div>
          <label className="block text-[#8b7e74] text-xs mb-2">
            Goals
          </label>
          <textarea
            value={project.goals}
            onChange={(e) => handleChange('goals', e.target.value)}
            className="w-full bg-[#faf8f6] border border-[#e8e3dd] rounded px-4 py-3 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors resize-none"
            rows={3}
            placeholder="Anything useful to know — timing, possible status, in start/date"
          />
        </div>

        {/* Action Focus */}
        <div>
          <label className="block text-[#8b7e74] text-xs mb-2">
            Action Focus
          </label>
          <textarea
            value={project.actionFocus}
            onChange={(e) => handleChange('actionFocus', e.target.value)}
            className="w-full bg-[#faf8f6] border border-[#e8e3dd] rounded px-4 py-3 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors resize-none"
            rows={2}
            placeholder="Current status or next step"
          />
        </div>
      </div>
    </div>
  );
}
