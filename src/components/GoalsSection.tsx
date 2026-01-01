import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Theme, Goal } from '../App';

interface GoalsSectionProps {
  theme: Theme;
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}

export function GoalsSection({ theme, goals, setGoals }: GoalsSectionProps) {
  const isDark = theme === 'noir';

  const addGoal = () => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: '',
      description: '',
      timeframe: '3 months',
      progress: 0,
      milestones: ''
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, ...updates } : goal));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const inputClass = isDark
    ? 'w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-[#e0e0e0] outline-none focus:border-[#3a3a3a] transition-colors'
    : 'w-full bg-[#faf8f6] border border-[#e8e3dd] rounded px-4 py-3 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors';

  const labelClass = isDark
    ? 'block text-[#6a6a6a] text-xs mb-2 uppercase tracking-wider'
    : 'block text-[#8b7e74] text-xs mb-2 uppercase tracking-wider';

  return (
    <div className="px-6 py-12 lg:py-16 pb-24 lg:pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-center tracking-[0.3em] mb-4 uppercase ${
          isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
        }`}>
          Goals
        </h1>
        <p className={`text-center text-sm mb-12 ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
        }`}>
          Track your long-term objectives
        </p>

        <div className="space-y-6 mb-6">
          {goals.map(goal => (
            <div
              key={goal.id}
              className={`rounded-lg p-6 ${
                isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <input
                  type="text"
                  value={goal.title}
                  onChange={(e) => updateGoal(goal.id, { title: e.target.value })}
                  className={`flex-1 mr-4 ${inputClass}`}
                  placeholder="Goal title"
                />
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className={isDark ? 'text-[#6a6a6a] hover:text-[#a0a0a0]' : 'text-[#a89a8f] hover:text-[#8b7e74]'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    value={goal.description}
                    onChange={(e) => updateGoal(goal.id, { description: e.target.value })}
                    className={`${inputClass} resize-none`}
                    rows={2}
                    placeholder="What do you want to achieve?"
                  />
                </div>

                <div>
                  <label className={labelClass}>Timeframe</label>
                  <select
                    value={goal.timeframe}
                    onChange={(e) => updateGoal(goal.id, { timeframe: e.target.value })}
                    className={inputClass}
                  >
                    <option>1 month</option>
                    <option>3 months</option>
                    <option>6 months</option>
                    <option>1 year</option>
                    <option>2+ years</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Progress: {goal.progress}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={goal.progress}
                    onChange={(e) => updateGoal(goal.id, { progress: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className={`mt-2 h-2 rounded-full ${
                    isDark ? 'bg-[#0a0a0a]' : 'bg-[#f5f1ed]'
                  }`}>
                    <div
                      className={`h-full rounded-full transition-all ${
                        isDark ? 'bg-[#e0e0e0]' : 'bg-[#8b7e74]'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Milestones</label>
                  <textarea
                    value={goal.milestones}
                    onChange={(e) => updateGoal(goal.id, { milestones: e.target.value })}
                    className={`${inputClass} resize-none`}
                    rows={3}
                    placeholder="Key milestones and checkpoints..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addGoal}
          className={`w-full border-2 border-dashed rounded-lg py-6 transition-all flex items-center justify-center gap-2 group ${
            isDark
              ? 'bg-[#1a1a1a] border-[#2a2a2a] text-[#6a6a6a] hover:border-[#3a3a3a] hover:bg-[#0a0a0a]'
              : 'bg-white border-[#e8e3dd] text-[#8b7e74] hover:border-[#c9bfb5] hover:bg-[#faf8f6]'
          }`}
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="tracking-[0.1em] uppercase text-sm">Add New Goal</span>
        </button>
      </div>
    </div>
  );
}
