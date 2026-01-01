import React, { useMemo } from 'react';
import { Theme, Section, Project, Task, Goal, Habit, FinanceEntry, Note, Relationship, WeeklyReview, SomedayItem } from '../App';
import { 
  FolderKanban, 
  CheckSquare, 
  Target, 
  DollarSign, 
  Activity, 
  FileText, 
  Users, 
  BookOpen, 
  PieChart, 
  Lightbulb,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { LifeAreaCard } from './LifeAreaCard';
import { SettingsMenu } from './SettingsMenu';
import { motion } from 'motion/react';

interface DashboardProps {
  theme: Theme;
  projects: Project[];
  tasks: Task[];
  goals: Goal[];
  habits: Habit[];
  notes?: Note[];
  financeEntries?: FinanceEntry[];
  relationships?: Relationship[];
  reviews?: WeeklyReview[];
  somedayItems?: SomedayItem[];
  onNavigate: (section: Section) => void;
}

export function Dashboard({ 
  theme, 
  projects, 
  tasks, 
  goals, 
  habits, 
  notes = [],
  financeEntries = [],
  relationships = [],
  reviews = [],
  somedayItems = [],
  onNavigate 
}: DashboardProps) {
  const isDark = theme === 'noir';

  // Get current date info
  const now = new Date();
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
  const fullDate = now.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  // Get time-based greeting
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Calculate stats
  const activeTasks = useMemo(() => tasks.filter(t => !t.completed), [tasks]);
  const activeProjects = useMemo(() => projects.filter(p => p.status === 'In Progress'), [projects]);
  const totalIncome = useMemo(() => 
    financeEntries.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0),
    [financeEntries]
  );
  const totalExpenses = useMemo(() => 
    financeEntries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0),
    [financeEntries]
  );
  const balance = totalIncome - totalExpenses;
  const activeGoals = useMemo(() => goals.filter(g => g.progress < 100), [goals]);
  const bestStreak = useMemo(() => 
    habits.reduce((max, h) => Math.max(max, h.streak), 0),
    [habits]
  );

  // Tasks due today
  const today = now.toISOString().split('T')[0];
  const tasksDueToday = useMemo(() => 
    activeTasks.filter(t => t.dueDate === today),
    [activeTasks, today]
  );

  // Habits to complete today
  const habitsToday = useMemo(() => {
    const todayStr = now.toISOString().split('T')[0];
    return habits.filter(h => !h.completedDates.includes(todayStr));
  }, [habits, now]);

  const lifeAreas = [
    {
      icon: FolderKanban,
      title: 'Projects',
      stat: activeProjects.length,
      description: 'Active projects',
      section: 'projects' as Section,
      accentColor: '#8B7355'
    },
    {
      icon: CheckSquare,
      title: 'Tasks',
      stat: activeTasks.length,
      description: 'Open tasks',
      section: 'tasks' as Section,
      accentColor: '#6B9080'
    },
    {
      icon: Target,
      title: 'Goals',
      stat: activeGoals.length,
      description: 'In progress',
      section: 'goals' as Section,
      accentColor: '#D4A574'
    },
    {
      icon: DollarSign,
      title: 'Finance',
      stat: balance >= 0 ? `+$${balance.toLocaleString()}` : `-$${Math.abs(balance).toLocaleString()}`,
      description: 'Current balance',
      section: 'finance' as Section,
      accentColor: balance >= 0 ? '#6B9080' : '#C97064'
    },
    {
      icon: Activity,
      title: 'Habits',
      stat: `${bestStreak} days`,
      description: 'Best streak',
      section: 'habits' as Section,
      accentColor: '#9B7E6B'
    },
    {
      icon: FileText,
      title: 'Notes',
      stat: notes.length,
      description: 'Total notes',
      section: 'notes' as Section,
      accentColor: '#A89A8F'
    },
    {
      icon: Users,
      title: 'Relationships',
      stat: relationships.length,
      description: 'Connections',
      section: 'relationships' as Section,
      accentColor: '#D4A574'
    },
    {
      icon: BookOpen,
      title: 'Reviews',
      stat: reviews.length,
      description: 'Weekly reviews',
      section: 'reviews' as Section,
      accentColor: '#8B7355'
    },
    {
      icon: PieChart,
      title: 'Life Balance',
      stat: '8 areas',
      description: 'Track wellness',
      section: 'balance' as Section,
      accentColor: '#6B9080'
    },
    {
      icon: Lightbulb,
      title: 'Someday',
      stat: somedayItems.length,
      description: 'Future ideas',
      section: 'someday' as Section,
      accentColor: '#9B7E6B'
    }
  ];

  return (
    <div className="px-6 py-8 lg:py-12 pb-24 lg:pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header with Settings */}
        <div className="flex items-start justify-between mb-12">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className={`w-5 h-5 ${isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'}`} />
                <h1 className={`tracking-[0.2em] uppercase ${
                  isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
                }`}>
                  {greeting}
                </h1>
              </div>
              <div className={`text-sm ${isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'}`}>
                {dayOfWeek}, {fullDate}
              </div>
            </motion.div>
          </div>
          <SettingsMenu theme={theme} />
        </div>

        {/* Today's Focus Section */}
        {(tasksDueToday.length > 0 || habitsToday.length > 0) && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className={`w-5 h-5 ${isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'}`} />
              <h2 className={`tracking-wider uppercase ${
                isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
              }`}>
                Today's Focus
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Tasks Due Today */}
              {tasksDueToday.length > 0 && (
                <div className={`rounded-xl p-6 ${
                  isDark 
                    ? 'bg-[#1a1a1a]/60 border border-[#2a2a2a]' 
                    : 'bg-white/60 border border-[#e8e3dd]'
                } backdrop-blur-sm`}>
                  <div className={`text-sm uppercase tracking-wider mb-3 ${
                    isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
                  }`}>
                    Tasks Due Today
                  </div>
                  <div className="space-y-2">
                    {tasksDueToday.slice(0, 3).map(task => (
                      <div 
                        key={task.id}
                        className={`p-3 rounded-lg ${
                          isDark ? 'bg-[#0a0a0a]' : 'bg-[#faf8f6]'
                        }`}
                      >
                        <div className={`${isDark ? 'text-white' : 'text-[#5a4f45]'}`}>
                          {task.title}
                        </div>
                        <div className={`text-xs mt-1 ${isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'}`}>
                          {task.priority} Priority
                        </div>
                      </div>
                    ))}
                  </div>
                  {tasksDueToday.length > 3 && (
                    <button
                      onClick={() => onNavigate('tasks')}
                      className={`mt-3 text-sm ${
                        isDark ? 'text-[#6a6a6a] hover:text-[#a0a0a0]' : 'text-[#a89a8f] hover:text-[#8b7e74]'
                      }`}
                    >
                      +{tasksDueToday.length - 3} more
                    </button>
                  )}
                </div>
              )}

              {/* Habits Pending */}
              {habitsToday.length > 0 && (
                <div className={`rounded-xl p-6 ${
                  isDark 
                    ? 'bg-[#1a1a1a]/60 border border-[#2a2a2a]' 
                    : 'bg-white/60 border border-[#e8e3dd]'
                } backdrop-blur-sm`}>
                  <div className={`text-sm uppercase tracking-wider mb-3 ${
                    isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
                  }`}>
                    Habits to Complete
                  </div>
                  <div className="space-y-2">
                    {habitsToday.slice(0, 3).map(habit => (
                      <div 
                        key={habit.id}
                        className={`p-3 rounded-lg ${
                          isDark ? 'bg-[#0a0a0a]' : 'bg-[#faf8f6]'
                        }`}
                      >
                        <div className={`${isDark ? 'text-white' : 'text-[#5a4f45]'}`}>
                          {habit.name}
                        </div>
                        <div className={`text-xs mt-1 ${isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'}`}>
                          {habit.streak} day streak
                        </div>
                      </div>
                    ))}
                  </div>
                  {habitsToday.length > 3 && (
                    <button
                      onClick={() => onNavigate('habits')}
                      className={`mt-3 text-sm ${
                        isDark ? 'text-[#6a6a6a] hover:text-[#a0a0a0]' : 'text-[#a89a8f] hover:text-[#8b7e74]'
                      }`}
                    >
                      +{habitsToday.length - 3} more
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Life Areas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <PieChart className={`w-5 h-5 ${isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'}`} />
            <h2 className={`tracking-wider uppercase ${
              isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
            }`}>
              Your Life Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {lifeAreas.map((area, index) => (
              <motion.div
                key={area.section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              >
                <LifeAreaCard
                  theme={theme}
                  icon={area.icon}
                  title={area.title}
                  stat={area.stat}
                  description={area.description}
                  section={area.section}
                  accentColor={area.accentColor}
                  onNavigate={onNavigate}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}