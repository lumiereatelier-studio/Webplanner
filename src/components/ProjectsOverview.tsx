import React from 'react';
import { ProjectOverviewCard } from './ProjectOverviewCard';
import { AddProjectButton } from './AddProjectButton';
import { Theme, Project } from '../App';

interface ProjectsOverviewProps {
  theme: Theme;
  projects: Project[];
  onSelectProject: (id: string) => void;
  onAddProject: () => void;
  onDeleteProject: (id: string) => void;
}

export function ProjectsOverview({ 
  theme,
  projects, 
  onSelectProject, 
  onAddProject,
  onDeleteProject 
}: ProjectsOverviewProps) {
  const isDark = theme === 'noir';

  return (
    <div className="px-6 py-12 lg:py-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-center tracking-[0.3em] mb-4 uppercase ${
          isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
        }`}>
          Projects Planner
        </h1>
        <p className={`text-center text-sm mb-12 ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
        }`}>
          Overview of all current projects
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {projects.map((project) => (
            <ProjectOverviewCard
              key={project.id}
              theme={theme}
              project={project}
              onClick={() => onSelectProject(project.id)}
              onDelete={onDeleteProject}
            />
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <AddProjectButton theme={theme} onClick={onAddProject} />
        </div>
      </div>
    </div>
  );
}
