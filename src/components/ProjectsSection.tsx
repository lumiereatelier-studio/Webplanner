import React, { useState } from 'react';
import { Theme, Project } from '../App';
import { ProjectsOverview } from './ProjectsOverview';
import { ProjectDetail } from './ProjectDetail';

interface ProjectsSectionProps {
  theme: Theme;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export function ProjectsSection({ theme, projects, setProjects }: ProjectsSectionProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      label: 'Project Label',
      name: '',
      notes: '',
      goals: '',
      actionFocus: '',
      detailedNotes: '',
      resources: '',
      timeline: '',
      status: 'Planning'
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, ...updatedProject } : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
    if (selectedProjectId === id) {
      setSelectedProjectId(null);
    }
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <>
      {selectedProject ? (
        <ProjectDetail
          theme={theme}
          project={selectedProject}
          onUpdate={updateProject}
          onBack={() => setSelectedProjectId(null)}
          onDelete={deleteProject}
        />
      ) : (
        <ProjectsOverview
          theme={theme}
          projects={projects}
          onSelectProject={setSelectedProjectId}
          onAddProject={addProject}
          onDeleteProject={deleteProject}
        />
      )}
    </>
  );
}
