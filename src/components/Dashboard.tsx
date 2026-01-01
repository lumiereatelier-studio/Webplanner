import React from 'react';
import { Theme, Section, Project, Task, Goal, Habit } from '../App';
import { ArrowRight } from 'lucide-react';
import { SettingsMenu } from './SettingsMenu';

interface DashboardProps {
  theme: Theme;
  projects: Project[];
  tasks: Task[];
  goals: Goal[];
  habits: Habit[];
  onNavigate: (section: Section) => void;
}

export function Dashboard({ theme, projects, tasks, goals, habits, onNavigate }: DashboardProps) {
  const isDark = theme === 'noir';
  const activeTasks = tasks.filter(t => !t.completed);
  const activeProjects = projects.filter(p => p.status === 'In Progress');

  return (
    <div className="px-6 py-12 lg:py-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className={`flex-1 text-center tracking-[0.3em] uppercase ${
            isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
          }`}>
            Dashboard
          </h1>
          <SettingsMenu theme={theme} />
        </div>
        <p className={`text-center text-sm mb-12 ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
        }`}>
          Your life at a glance
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className={`rounded-lg p-6 ${
            isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
          }`}>
            <div className={`text-3xl mb-2 ${isDark ? 'text-white' : 'text-[#5a4f45]'}`}>
              {activeProjects.length}
            </div>
            <div className={`text-sm uppercase tracking-wider ${
              isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
            }`}>
              Active Projects
            </div>
          </div>

          <div className={`rounded-lg p-6 ${
            isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
          }`}>
            <div className={`text-3xl mb-2 ${isDark ? 'text-white' : 'text-[#5a4f45]'}`}>
              {activeTasks.length}
            </div>
            <div className={`text-sm uppercase tracking-wider ${
              isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
            }`}>
              Open Tasks
            </div>
          </div>

          <div className={`rounded-lg p-6 ${
            isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
          }`}>
            <div className={`text-3xl mb-2 ${isDark ? 'text-white' : 'text-[#5a4f45]'}`}>
              {goals.length}
            </div>
            <div className={`text-sm uppercase tracking-wider ${
              isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
            }`}>
              Active Goals
            </div>
          </div>

          <div className={`rounded-lg p-6 ${
            isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
          }`}>
            <div className={`text-3xl mb-2 ${isDark ? 'text-white' : 'text-[#5a4f45]'}`}>
              {habits.reduce((max, h) => Math.max(max, h.streak), 0)}
            </div>
            <div className={`text-sm uppercase tracking-wider ${
              isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
            }`}>
              Best Streak
            </div>
          </div>
        </div>

        {/* Quick Access Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <div className={`rounded-lg p-6 ${
            isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`uppercase tracking-wider text-sm ${
                isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
              }`}>
                Recent Projects
              </h2>
              <button
                onClick={() => onNavigate('projects')}
                className={`text-sm flex items-center gap-1 ${
                  isDark ? 'text-[#6a6a6a] hover:text-[#a0a0a0]' : 'text-[#a89a8f] hover:text-[#8b7e74]'
                }`}
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {projects.slice(0, 3).map(project => (
                <div
                  key={project.id}
                  className={`p-3 rounded ${
                    isDark ? 'bg-[#0a0a0a]' : 'bg-[#faf8f6]'
                  }`}
                >
                  <div className={`text-sm mb-1 ${isDark ? 'text-white' : 'text-[#5a4f45]'}`}>
                    {project.name || 'Untitled'}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'}`}>
                    {project.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className={`rounded-lg p-6 ${
            isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`uppercase tracking-wider text-sm ${
                isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
              }`}>
                Upcoming Tasks
              </h2>
              <button
                onClick={() => onNavigate('tasks')}
                className={`text-sm flex items-center gap-1 ${
                  isDark ? 'text-[#6a6a6a] hover:text-[#a0a0a0]' : 'text-[#a89a8f] hover:text-[#8b7e74]'
                }`}
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {activeTasks.slice(0, 3).map(task => (
                <div
                  key={task.id}
                  className={`p-3 rounded ${
                    isDark ? 'bg-[#0a0a0a]' : 'bg-[#faf8f6]'
                  }`}
                >
                  <div className={`text-sm mb-1 ${isDark ? 'text-white' : 'text-[#5a4f45]'}`}>
                    {task.title}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'}`}>
                    {task.priority} Priority
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}