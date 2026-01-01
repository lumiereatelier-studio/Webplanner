import React from 'react';
import { LayoutDashboard, FolderKanban, CheckSquare, FileText, Target, DollarSign, Activity, Users, BookOpen, PieChart, Lightbulb } from 'lucide-react';
import { Theme, Section } from '../App';
import { Logo } from './Logo';

interface NavigationProps {
  theme: Theme;
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

const navItems = [
  { id: 'dashboard' as Section, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects' as Section, label: 'Projects', icon: FolderKanban },
  { id: 'tasks' as Section, label: 'Tasks', icon: CheckSquare },
  { id: 'notes' as Section, label: 'Notes', icon: FileText },
  { id: 'goals' as Section, label: 'Goals', icon: Target },
  { id: 'habits' as Section, label: 'Habits', icon: Activity },
  { id: 'relationships' as Section, label: 'Relationships', icon: Users },
  { id: 'balance' as Section, label: 'Life Balance', icon: PieChart },
  { id: 'reviews' as Section, label: 'Weekly Reviews', icon: BookOpen },
  { id: 'someday' as Section, label: 'Someday/Maybe', icon: Lightbulb },
  { id: 'finance' as Section, label: 'Finance', icon: DollarSign },
];

export function Navigation({ theme, currentSection, onNavigate }: NavigationProps) {
  const isDark = theme === 'noir';

  return (
    <>
      {/* Mobile Header */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-40 px-6 py-4 ${
        isDark ? 'bg-[#1a1614] border-b border-[#2a2a2a]' : 'bg-white border-b border-[#e8e3dd]'
      }`}>
        <Logo theme={theme} size="sm" />
      </div>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 bottom-0 w-64 z-30 ${
        isDark ? 'bg-[#1a1614] border-r border-[#2a2a2a]' : 'bg-white border-r border-[#e8e3dd]'
      } hidden lg:block`}>
        <div className="p-8">
          <div className="mb-12">
            <Logo theme={theme} size="md" />
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? isDark
                        ? 'bg-[#1a1a1a] text-white'
                        : 'bg-[#f5f1ed] text-[#5a4f45]'
                      : isDark
                      ? 'text-[#6a6a6a] hover:bg-[#151515] hover:text-[#a0a0a0]'
                      : 'text-[#a89a8f] hover:bg-[#faf8f6] hover:text-[#8b7e74]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 ${
        isDark ? 'bg-[#1a1614] border-t border-[#2a2a2a]' : 'bg-white border-t border-[#e8e3dd]'
      }`}>
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 ${
                  isActive
                    ? isDark ? 'text-white' : 'text-[#5a4f45]'
                    : isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}