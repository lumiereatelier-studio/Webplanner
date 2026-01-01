import React from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { Theme, Habit } from '../App';

interface HabitsSectionProps {
  theme: Theme;
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

export function HabitsSection({ theme, habits, setHabits }: HabitsSectionProps) {
  const isDark = theme === 'noir';

  const addHabit = () => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: '',
      frequency: 'Daily',
      streak: 0,
      completedDates: []
    };
    setHabits([...habits, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(habits.map(habit => habit.id === id ? { ...habit, ...updates } : habit));
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const toggleToday = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const isCompleted = habit.completedDates.includes(today);
    const newCompletedDates = isCompleted
      ? habit.completedDates.filter(d => d !== today)
      : [...habit.completedDates, today];

    // Calculate new streak
    let newStreak = 0;
    if (!isCompleted) {
      const sortedDates = [...newCompletedDates].sort().reverse();
      let currentDate = new Date();
      for (const dateStr of sortedDates) {
        const date = new Date(dateStr);
        const diffTime = currentDate.getTime() - date.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 1) {
          newStreak++;
          currentDate = date;
        } else {
          break;
        }
      }
    }

    updateHabit(id, { 
      completedDates: newCompletedDates,
      streak: newStreak
    });
  };

  const isCompletedToday = (habit: Habit) => {
    const today = new Date().toISOString().split('T')[0];
    return habit.completedDates.includes(today);
  };

  const inputClass = isDark
    ? 'w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-[#e0e0e0] outline-none focus:border-[#3a3a3a] transition-colors'
    : 'w-full bg-[#faf8f6] border border-[#e8e3dd] rounded px-4 py-3 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors';

  return (
    <div className="px-6 py-12 lg:py-16 pb-24 lg:pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-center tracking-[0.3em] mb-4 uppercase ${
          isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
        }`}>
          Habit Tracker
        </h1>
        <p className={`text-center text-sm mb-12 ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
        }`}>
          Build consistency and track your progress
        </p>

        <div className="space-y-4 mb-6">
          {habits.map(habit => {
            const completedToday = isCompletedToday(habit);
            return (
              <div
                key={habit.id}
                className={`rounded-lg p-6 ${
                  isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleToday(habit.id)}
                    className={`mt-2 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                      completedToday
                        ? isDark
                          ? 'bg-[#e0e0e0] border-[#e0e0e0] scale-110'
                          : 'bg-[#5a4f45] border-[#5a4f45] scale-110'
                        : isDark
                        ? 'border-[#3a3a3a] hover:border-[#4a4a4a]'
                        : 'border-[#c9bfb5] hover:border-[#8b7e74]'
                    }`}
                  >
                    {completedToday && <Check className="w-6 h-6 text-white" />}
                  </button>

                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={habit.name}
                      onChange={(e) => updateHabit(habit.id, { name: e.target.value })}
                      className={inputClass}
                      placeholder="Habit name"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={habit.frequency}
                        onChange={(e) => updateHabit(habit.id, { frequency: e.target.value })}
                        className={inputClass}
                      >
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Weekdays</option>
                        <option>Weekends</option>
                      </select>

                      <div className={`flex items-center justify-center rounded ${
                        isDark ? 'bg-[#0a0a0a]' : 'bg-[#f5f1ed]'
                      }`}>
                        <span className={`text-sm ${
                          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
                        }`}>
                          🔥 {habit.streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className={`mt-2 ${
                      isDark ? 'text-[#6a6a6a] hover:text-[#a0a0a0]' : 'text-[#a89a8f] hover:text-[#8b7e74]'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={addHabit}
          className={`w-full border-2 border-dashed rounded-lg py-6 transition-all flex items-center justify-center gap-2 group ${
            isDark
              ? 'bg-[#1a1a1a] border-[#2a2a2a] text-[#6a6a6a] hover:border-[#3a3a3a] hover:bg-[#0a0a0a]'
              : 'bg-white border-[#e8e3dd] text-[#8b7e74] hover:border-[#c9bfb5] hover:bg-[#faf8f6]'
          }`}
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="tracking-[0.1em] uppercase text-sm">Add New Habit</span>
        </button>
      </div>
    </div>
  );
}
