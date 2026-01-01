// localStorage utility for data persistence

export const STORAGE_KEYS = {
  PROJECTS: 'lifeadmin_projects',
  TASKS: 'lifeadmin_tasks',
  NOTES: 'lifeadmin_notes',
  GOALS: 'lifeadmin_goals',
  FINANCE: 'lifeadmin_finance',
  HABITS: 'lifeadmin_habits',
  RELATIONSHIPS: 'lifeadmin_relationships',
  REVIEWS: 'lifeadmin_reviews',
  LIFE_AREAS: 'lifeadmin_life_areas',
  SOMEDAY: 'lifeadmin_someday',
  THEME: 'lifeadmin_theme',
  WELCOME_SEEN: 'lifeadmin_welcome_seen',
  LICENSE_KEY: 'lifeadmin_license_key',
};

export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
}

export function exportAllData() {
  const data = {
    projects: localStorage.getItem(STORAGE_KEYS.PROJECTS),
    tasks: localStorage.getItem(STORAGE_KEYS.TASKS),
    notes: localStorage.getItem(STORAGE_KEYS.NOTES),
    goals: localStorage.getItem(STORAGE_KEYS.GOALS),
    finance: localStorage.getItem(STORAGE_KEYS.FINANCE),
    habits: localStorage.getItem(STORAGE_KEYS.HABITS),
    relationships: localStorage.getItem(STORAGE_KEYS.RELATIONSHIPS),
    reviews: localStorage.getItem(STORAGE_KEYS.REVIEWS),
    lifeAreas: localStorage.getItem(STORAGE_KEYS.LIFE_AREAS),
    someday: localStorage.getItem(STORAGE_KEYS.SOMEDAY),
    theme: localStorage.getItem(STORAGE_KEYS.THEME),
    exportDate: new Date().toISOString(),
    version: '1.0.0'
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `life-admin-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importAllData(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.projects) localStorage.setItem(STORAGE_KEYS.PROJECTS, data.projects);
        if (data.tasks) localStorage.setItem(STORAGE_KEYS.TASKS, data.tasks);
        if (data.notes) localStorage.setItem(STORAGE_KEYS.NOTES, data.notes);
        if (data.goals) localStorage.setItem(STORAGE_KEYS.GOALS, data.goals);
        if (data.finance) localStorage.setItem(STORAGE_KEYS.FINANCE, data.finance);
        if (data.habits) localStorage.setItem(STORAGE_KEYS.HABITS, data.habits);
        if (data.relationships) localStorage.setItem(STORAGE_KEYS.RELATIONSHIPS, data.relationships);
        if (data.reviews) localStorage.setItem(STORAGE_KEYS.REVIEWS, data.reviews);
        if (data.lifeAreas) localStorage.setItem(STORAGE_KEYS.LIFE_AREAS, data.lifeAreas);
        if (data.someday) localStorage.setItem(STORAGE_KEYS.SOMEDAY, data.someday);
        if (data.theme) localStorage.setItem(STORAGE_KEYS.THEME, data.theme);
        
        resolve(true);
      } catch (error) {
        console.error('Error importing data:', error);
        resolve(false);
      }
    };
    reader.readAsText(file);
  });
}

export function clearAllData(): void {
  if (confirm('Are you sure you want to delete ALL data? This cannot be undone. Consider exporting a backup first.')) {
    Object.values(STORAGE_KEYS).forEach(key => {
      if (key !== STORAGE_KEYS.LICENSE_KEY && key !== STORAGE_KEYS.WELCOME_SEEN) {
        localStorage.removeItem(key);
      }
    });
    window.location.reload();
  }
}
