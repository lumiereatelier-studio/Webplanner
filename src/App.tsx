import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { ThemeToggle } from './components/ThemeToggle';
import { WelcomeModal } from './components/WelcomeModal';
import { Dashboard } from './components/Dashboard';
import { ProjectsSection } from './components/ProjectsSection';
import { TasksSection } from './components/TasksSection';
import { NotesSection } from './components/NotesSection';
import { GoalsSection } from './components/GoalsSection';
import { FinanceSection } from './components/FinanceSection';
import { HabitsSection } from './components/HabitsSection';
import { RelationshipsSection } from './components/RelationshipsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { BalanceSection } from './components/BalanceSection';
import { SomedaySection } from './components/SomedaySection';
import { STORAGE_KEYS, saveToStorage, loadFromStorage } from './utils/storage';

export type Theme = 'soft' | 'noir';
export type Section = 'dashboard' | 'projects' | 'tasks' | 'notes' | 'goals' | 'finance' | 'habits' | 'relationships' | 'reviews' | 'balance' | 'someday';

export interface Project {
  id: string;
  label: string;
  name: string;
  notes: string;
  goals: string;
  actionFocus: string;
  detailedNotes: string;
  resources: string;
  timeline: string;
  status: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  completed: boolean;
  project?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  progress: number;
  milestones: string;
}

export interface FinanceEntry {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

export interface Habit {
  id: string;
  name: string;
  frequency: string;
  streak: number;
  completedDates: string[];
}

export interface Relationship {
  id: string;
  name: string;
  category: string;
  lastContact: string;
  nextAction: string;
  birthday?: string;
  notes: string;
  frequency: string;
}

export interface WeeklyReview {
  id: string;
  weekOf: string;
  wins: string;
  challenges: string;
  lessons: string;
  nextWeekFocus: string;
  gratitude: string;
}

export interface LifeArea {
  id: string;
  name: string;
  score: number;
  notes: string;
}

export interface SomedayItem {
  id: string;
  title: string;
  description: string;
  category: string;
  addedDate: string;
}

export default function App() {
  console.log('🟢 APP.TSX IS LOADING!!!');
  
  const [theme, setTheme] = useState<Theme>('soft');
  const [currentSection, setCurrentSection] = useState<Section>('dashboard');
  
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      label: 'Work',
      name: 'Q1 Marketing Campaign',
      notes: 'Launch new product line campaign',
      goals: 'Increase brand awareness by 30%',
      actionFocus: 'Finalize creative assets',
      detailedNotes: '',
      resources: '',
      timeline: 'Jan - Mar 2025',
      status: 'In Progress'
    },
    {
      id: '2',
      label: 'Personal',
      name: 'Home Renovation',
      notes: 'Kitchen and bathroom updates',
      goals: 'Modernize living space',
      actionFocus: 'Get contractor quotes',
      detailedNotes: '',
      resources: '',
      timeline: 'Feb - Apr 2025',
      status: 'In Progress'
    },
    {
      id: '3',
      label: 'Work',
      name: 'Product Launch',
      notes: 'New mobile app release',
      goals: '10k downloads in first month',
      actionFocus: 'Beta testing',
      detailedNotes: '',
      resources: '',
      timeline: 'Mar 2025',
      status: 'Planning'
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review marketing budget',
      description: '',
      priority: 'High',
      dueDate: new Date().toISOString().split('T')[0],
      completed: false
    },
    {
      id: '2',
      title: 'Prepare presentation slides',
      description: 'Q1 review meeting',
      priority: 'High',
      dueDate: new Date().toISOString().split('T')[0],
      completed: false
    },
    {
      id: '3',
      title: 'Call contractor about kitchen',
      description: 'Discuss timeline and pricing',
      priority: 'Medium',
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      completed: false
    },
    {
      id: '4',
      title: 'Book dentist appointment',
      description: 'Regular checkup',
      priority: 'Low',
      dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      completed: false
    }
  ]);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Meeting Notes',
      content: 'Key points from today\'s discussion...',
      category: 'Work',
      createdAt: new Date().toISOString()
    }
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Learn Spanish',
      description: 'Achieve conversational fluency',
      timeframe: '6 months',
      progress: 25,
      milestones: 'Complete beginner course, Practice daily'
    },
    {
      id: '2',
      title: 'Run a Half Marathon',
      description: 'Complete 21K run',
      timeframe: '4 months',
      progress: 60,
      milestones: '5K done, 10K in progress'
    },
    {
      id: '3',
      title: 'Read 24 Books This Year',
      description: 'Two books per month',
      timeframe: '12 months',
      progress: 8,
      milestones: '2 books completed so far'
    }
  ]);

  const [financeEntries, setFinanceEntries] = useState<FinanceEntry[]>([
    {
      id: '1',
      type: 'income',
      category: 'Salary',
      amount: 4500,
      description: 'Monthly salary',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: '2',
      type: 'expense',
      category: 'Rent',
      amount: 1200,
      description: 'Monthly rent',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: '3',
      type: 'expense',
      category: 'Groceries',
      amount: 350,
      description: 'Weekly shopping',
      date: new Date().toISOString().split('T')[0]
    }
  ]);
  
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Exercise',
      frequency: 'Daily',
      streak: 7,
      completedDates: []
    },
    {
      id: '2',
      name: 'Read for 30 minutes',
      frequency: 'Daily',
      streak: 12,
      completedDates: []
    },
    {
      id: '3',
      name: 'Meditation',
      frequency: 'Daily',
      streak: 5,
      completedDates: []
    }
  ]);

  const [relationships, setRelationships] = useState<Relationship[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      category: 'Friend',
      lastContact: '2024-12-20',
      nextAction: 'Coffee catch-up',
      birthday: '1990-05-15',
      notes: 'Met at university. Working on startup.',
      frequency: 'Monthly'
    },
    {
      id: '2',
      name: 'Mom',
      category: 'Family',
      lastContact: '2024-12-28',
      nextAction: 'Sunday dinner',
      birthday: '1965-03-22',
      notes: 'Call every weekend',
      frequency: 'Weekly'
    }
  ]);

  const [reviews, setReviews] = useState<WeeklyReview[]>([]);

  const [lifeAreas, setLifeAreas] = useState<LifeArea[]>([
    { id: '1', name: 'Health & Fitness', score: 7, notes: '' },
    { id: '2', name: 'Career & Work', score: 8, notes: '' },
    { id: '3', name: 'Relationships', score: 6, notes: '' },
    { id: '4', name: 'Personal Growth', score: 7, notes: '' },
    { id: '5', name: 'Finance', score: 5, notes: '' },
    { id: '6', name: 'Recreation & Fun', score: 6, notes: '' },
    { id: '7', name: 'Environment', score: 7, notes: '' },
    { id: '8', name: 'Contribution', score: 5, notes: '' },
  ]);

  const [somedayItems, setSomedayItems] = useState<SomedayItem[]>([
    {
      id: '1',
      title: 'Learn to play piano',
      description: 'Always wanted to learn an instrument',
      category: 'Personal',
      addedDate: new Date().toISOString()
    }
  ]);

  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  // Track if initial load is complete
  const hasMounted = useRef(false);

  const toggleTheme = () => {
    setTheme(theme === 'soft' ? 'noir' : 'soft');
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    console.log('🔴 CLOSING WELCOME - Saving to localStorage...');
    saveToStorage(STORAGE_KEYS.WELCOME_SEEN, true);
    console.log('🔴 Saved! Check:', localStorage.getItem(STORAGE_KEYS.WELCOME_SEEN));
  };

  // Load all data from localStorage on mount
  useEffect(() => {
    const savedProjects = loadFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, []);
    const savedTasks = loadFromStorage<Task[]>(STORAGE_KEYS.TASKS, []);
    const savedNotes = loadFromStorage<Note[]>(STORAGE_KEYS.NOTES, []);
    const savedGoals = loadFromStorage<Goal[]>(STORAGE_KEYS.GOALS, []);
    const savedFinance = loadFromStorage<FinanceEntry[]>(STORAGE_KEYS.FINANCE, []);
    const savedHabits = loadFromStorage<Habit[]>(STORAGE_KEYS.HABITS, []);
    const savedRelationships = loadFromStorage<Relationship[]>(STORAGE_KEYS.RELATIONSHIPS, []);
    const savedReviews = loadFromStorage<WeeklyReview[]>(STORAGE_KEYS.REVIEWS, []);
    const savedLifeAreas = loadFromStorage<LifeArea[]>(STORAGE_KEYS.LIFE_AREAS, []);
    const savedSomeday = loadFromStorage<SomedayItem[]>(STORAGE_KEYS.SOMEDAY, []);
    const savedTheme = loadFromStorage<Theme>(STORAGE_KEYS.THEME, 'soft');
    const welcomeSeen = loadFromStorage<boolean>(STORAGE_KEYS.WELCOME_SEEN, false);

    // Only load saved data if it exists, otherwise keep default data
    if (savedProjects.length > 0) setProjects(savedProjects);
    if (savedTasks.length > 0) setTasks(savedTasks);
    if (savedNotes.length > 0) setNotes(savedNotes);
    if (savedGoals.length > 0) setGoals(savedGoals);
    if (savedFinance.length > 0) setFinanceEntries(savedFinance);
    if (savedHabits.length > 0) setHabits(savedHabits);
    if (savedRelationships.length > 0) setRelationships(savedRelationships);
    if (savedReviews.length > 0) setReviews(savedReviews);
    if (savedLifeAreas.length > 0) setLifeAreas(savedLifeAreas);
    if (savedSomeday.length > 0) setSomedayItems(savedSomeday);
    
    setTheme(savedTheme);
    setShowWelcome(!welcomeSeen);
    
    // Use setTimeout to ensure auto-save enables AFTER initial load completes
    setTimeout(() => {
      hasMounted.current = true;
    }, 100);
  }, []);

  // Auto-save data to localStorage whenever it changes (but not on first render)
  useEffect(() => {
    if (hasMounted.current) {
      saveToStorage(STORAGE_KEYS.PROJECTS, projects);
    }
  }, [projects]);

  useEffect(() => {
    if (hasMounted.current) {
      saveToStorage(STORAGE_KEYS.TASKS, tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (hasMounted.current) {
      saveToStorage(STORAGE_KEYS.NOTES, notes);
    }
  }, [notes]);

  useEffect(() => {
    if (hasMounted.current) {
      saveToStorage(STORAGE_KEYS.GOALS, goals);
    }
  }, [goals]);

  useEffect(() => {
    if (hasMounted.current) {
      saveToStorage(STORAGE_KEYS.FINANCE, financeEntries);
    }
  }, [financeEntries]);

  useEffect(() => {
    if (hasMounted.current) {
      saveToStorage(STORAGE_KEYS.HABITS, habits);
    }
  }, [habits]);

  useEffect(() => {
    if (hasMounted.current) {
      saveToStorage(STORAGE_KEYS.RELATIONSHIPS, relationships);
    }
  }, [relationships]);

  useEffect(() => {
    if (hasMounted.current) {
      saveToStorage(STORAGE_KEYS.REVIEWS, reviews);
    }
  }, [reviews]);

  useEffect(() => {
    if (hasMounted.current) {
      saveToStorage(STORAGE_KEYS.LIFE_AREAS, lifeAreas);
    }
  }, [lifeAreas]);

  useEffect(() => {
    if (hasMounted.current) {
      saveToStorage(STORAGE_KEYS.SOMEDAY, somedayItems);
    }
  }, [somedayItems]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return (
          <Dashboard
            theme={theme}
            projects={projects}
            tasks={tasks}
            goals={goals}
            habits={habits}
            notes={notes}
            financeEntries={financeEntries}
            relationships={relationships}
            reviews={reviews}
            somedayItems={somedayItems}
            onNavigate={setCurrentSection}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            theme={theme}
            projects={projects}
            setProjects={setProjects}
          />
        );
      case 'tasks':
        return (
          <TasksSection
            theme={theme}
            tasks={tasks}
            setTasks={setTasks}
            projects={projects}
          />
        );
      case 'notes':
        return (
          <NotesSection
            theme={theme}
            notes={notes}
            setNotes={setNotes}
          />
        );
      case 'goals':
        return (
          <GoalsSection
            theme={theme}
            goals={goals}
            setGoals={setGoals}
          />
        );
      case 'finance':
        return (
          <FinanceSection
            theme={theme}
            entries={financeEntries}
            setEntries={setFinanceEntries}
          />
        );
      case 'habits':
        return (
          <HabitsSection
            theme={theme}
            habits={habits}
            setHabits={setHabits}
          />
        );
      case 'relationships':
        return (
          <RelationshipsSection
            theme={theme}
            relationships={relationships}
            setRelationships={setRelationships}
          />
        );
      case 'reviews':
        return (
          <ReviewsSection
            theme={theme}
            reviews={reviews}
            setReviews={setReviews}
          />
        );
      case 'balance':
        return (
          <BalanceSection
            theme={theme}
            lifeAreas={lifeAreas}
            setLifeAreas={setLifeAreas}
          />
        );
      case 'someday':
        return (
          <SomedaySection
            theme={theme}
            items={somedayItems}
            setItems={setSomedayItems}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'soft' ? 'bg-[#f5f1ed]' : 'bg-[#0a0a0a]'}`}>
      {showWelcome && <WelcomeModal theme={theme} onClose={handleCloseWelcome} />}
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <Navigation
        theme={theme}
        currentSection={currentSection}
        onNavigate={setCurrentSection}
      />
      <div className="lg:pl-64">
        {renderSection()}
      </div>
    </div>
  );
}