import React, { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { Theme, Task, Project } from '../App';

interface TasksSectionProps {
  theme: Theme;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  projects: Project[];
}

export function TasksSection({ theme, tasks, setTasks, projects }: TasksSectionProps) {
  const isDark = theme === 'noir';
  const [showCompleted, setShowCompleted] = useState(false);

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const displayTasks = showCompleted ? completedTasks : activeTasks;

  const inputClass = isDark
    ? 'bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-2 text-[#e0e0e0] outline-none focus:border-[#3a3a3a] transition-colors'
    : 'bg-[#faf8f6] border border-[#e8e3dd] rounded px-3 py-2 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors';

  return (
    <div className="px-6 py-12 lg:py-16 pb-24 lg:pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-center tracking-[0.3em] mb-4 uppercase ${
          isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
        }`}>
          Tasks
        </h1>
        <p className={`text-center text-sm mb-8 ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
        }`}>
          Manage your to-do list
        </p>

        {/* Toggle */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setShowCompleted(false)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              !showCompleted
                ? isDark
                  ? 'bg-[#1a1a1a] text-white border border-[#2a2a2a]'
                  : 'bg-white text-[#5a4f45] border border-[#e8e3dd]'
                : isDark
                ? 'text-[#6a6a6a] hover:text-[#a0a0a0]'
                : 'text-[#a89a8f] hover:text-[#8b7e74]'
            }`}
          >
            Active ({activeTasks.length})
          </button>
          <button
            onClick={() => setShowCompleted(true)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              showCompleted
                ? isDark
                  ? 'bg-[#1a1a1a] text-white border border-[#2a2a2a]'
                  : 'bg-white text-[#5a4f45] border border-[#e8e3dd]'
                : isDark
                ? 'text-[#6a6a6a] hover:text-[#a0a0a0]'
                : 'text-[#a89a8f] hover:text-[#8b7e74]'
            }`}
          >
            Completed ({completedTasks.length})
          </button>
        </div>

        {/* Tasks List */}
        <div className="space-y-4 mb-6">
          {displayTasks.map(task => (
            <div
              key={task.id}
              className={`rounded-lg p-4 ${
                isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? isDark
                        ? 'bg-[#e0e0e0] border-[#e0e0e0]'
                        : 'bg-[#5a4f45] border-[#5a4f45]'
                      : isDark
                      ? 'border-[#3a3a3a] hover:border-[#4a4a4a]'
                      : 'border-[#c9bfb5] hover:border-[#8b7e74]'
                  }`}
                >
                  {task.completed && <Check className="w-3 h-3 text-white" />}
                </button>

                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => updateTask(task.id, { title: e.target.value })}
                    className={`w-full ${inputClass} ${task.completed ? 'line-through opacity-50' : ''}`}
                    placeholder="Task title"
                  />
                  
                  <textarea
                    value={task.description}
                    onChange={(e) => updateTask(task.id, { description: e.target.value })}
                    className={`w-full ${inputClass} resize-none text-sm`}
                    rows={2}
                    placeholder="Description"
                  />

                  <div className="grid grid-cols-3 gap-3">
                    <select
                      value={task.priority}
                      onChange={(e) => updateTask(task.id, { priority: e.target.value as any })}
                      className={`${inputClass} text-sm`}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>

                    <input
                      type="date"
                      value={task.dueDate}
                      onChange={(e) => updateTask(task.id, { dueDate: e.target.value })}
                      className={`${inputClass} text-sm`}
                    />

                    <select
                      value={task.project || ''}
                      onChange={(e) => updateTask(task.id, { project: e.target.value })}
                      className={`${inputClass} text-sm`}
                    >
                      <option value="">No Project</option>
                      {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.name || 'Untitled'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className={`mt-1 ${
                    isDark ? 'text-[#6a6a6a] hover:text-[#a0a0a0]' : 'text-[#a89a8f] hover:text-[#8b7e74]'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        {!showCompleted && (
          <button
            onClick={addTask}
            className={`w-full border-2 border-dashed rounded-lg py-6 transition-all flex items-center justify-center gap-2 group ${
              isDark
                ? 'bg-[#1a1a1a] border-[#2a2a2a] text-[#6a6a6a] hover:border-[#3a3a3a] hover:bg-[#0a0a0a]'
                : 'bg-white border-[#e8e3dd] text-[#8b7e74] hover:border-[#c9bfb5] hover:bg-[#faf8f6]'
            }`}
          >
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="tracking-[0.1em] uppercase text-sm">Add New Task</span>
          </button>
        )}
      </div>
    </div>
  );
}
