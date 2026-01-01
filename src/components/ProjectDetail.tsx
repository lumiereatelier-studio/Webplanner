import React from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Theme, Project } from '../App';

interface ProjectDetailProps {
  theme: Theme;
  project: Project;
  onUpdate: (id: string, updatedProject: Partial<Project>) => void;
  onBack: () => void;
  onDelete: (id: string) => void;
}

export function ProjectDetail({ theme, project, onUpdate, onBack, onDelete }: ProjectDetailProps) {
  const isDark = theme === 'noir';

  const handleChange = (field: keyof Project, value: string) => {
    onUpdate(project.id, { [field]: value });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project?')) {
      onDelete(project.id);
    }
  };

  const inputClass = isDark
    ? 'w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-[#e0e0e0] outline-none focus:border-[#3a3a3a] transition-colors'
    : 'w-full bg-[#faf8f6] border border-[#e8e3dd] rounded px-4 py-3 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors';

  const labelClass = isDark
    ? 'block text-[#6a6a6a] text-xs mb-2 uppercase tracking-wider'
    : 'block text-[#8b7e74] text-xs mb-2 uppercase tracking-wider';

  return (
    <div className="px-6 py-12 lg:py-16 pb-24 lg:pb-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 transition-colors ${
              isDark ? 'text-[#a0a0a0] hover:text-white' : 'text-[#8b7e74] hover:text-[#6b5e54]'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="tracking-[0.1em] uppercase text-sm">Back to Projects</span>
          </button>

          <button
            onClick={handleDelete}
            className={`flex items-center gap-2 transition-colors ${
              isDark ? 'text-[#6a6a6a] hover:text-red-500' : 'text-[#8b7e74] hover:text-red-600'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Delete Project</span>
          </button>
        </div>

        <div className={`rounded-lg p-8 shadow-sm ${
          isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white'
        }`}>
          <div className="space-y-8">
            {/* Project Label */}
            <div>
              <label className={labelClass}>Project Label</label>
              <input
                type="text"
                value={project.label}
                onChange={(e) => handleChange('label', e.target.value)}
                className={inputClass}
                placeholder="e.g., Work, Personal, Health"
              />
            </div>

            {/* Project Name */}
            <div>
              <label className={labelClass}>What is the name of this project?</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={inputClass}
                placeholder="Project name"
              />
            </div>

            {/* Status */}
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={project.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className={inputClass}
              >
                <option>Planning</option>
                <option>In Progress</option>
                <option>On Hold</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            {/* Notes / Context / Purpose */}
            <div>
              <label className={labelClass}>Notes / Context / Purpose</label>
              <textarea
                value={project.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className={`${inputClass} resize-none`}
                rows={3}
                placeholder="What is the origin idea of? Why does it matter right now?"
              />
            </div>

            {/* Goals */}
            <div>
              <label className={labelClass}>Goals</label>
              <textarea
                value={project.goals}
                onChange={(e) => handleChange('goals', e.target.value)}
                className={`${inputClass} resize-none`}
                rows={4}
                placeholder="Anything useful to know — timing, possible status, in start/date"
              />
            </div>

            {/* Action Focus */}
            <div>
              <label className={labelClass}>Action Focus</label>
              <textarea
                value={project.actionFocus}
                onChange={(e) => handleChange('actionFocus', e.target.value)}
                className={`${inputClass} resize-none`}
                rows={3}
                placeholder="Current status or next step"
              />
            </div>

            {/* Timeline */}
            <div>
              <label className={labelClass}>Timeline</label>
              <textarea
                value={project.timeline}
                onChange={(e) => handleChange('timeline', e.target.value)}
                className={`${inputClass} resize-none`}
                rows={4}
                placeholder="Key dates, milestones, deadlines..."
              />
            </div>

            {/* Resources */}
            <div>
              <label className={labelClass}>Resources & Links</label>
              <textarea
                value={project.resources}
                onChange={(e) => handleChange('resources', e.target.value)}
                className={`${inputClass} resize-none`}
                rows={5}
                placeholder="Links, documents, contacts, tools needed..."
              />
            </div>

            {/* Detailed Notes / Data Dump */}
            <div>
              <label className={labelClass}>Detailed Notes / Data Dump</label>
              <textarea
                value={project.detailedNotes}
                onChange={(e) => handleChange('detailedNotes', e.target.value)}
                className={`${inputClass} resize-none font-mono text-sm`}
                rows={12}
                placeholder="Brain dump everything related to this project — ideas, meeting notes, research, decisions, random thoughts..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
