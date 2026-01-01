import React, { useState } from 'react';
import { Plus, Trash2, MoveRight } from 'lucide-react';
import { Theme, SomedayItem } from '../App';

interface SomedaySectionProps {
  theme: Theme;
  items: SomedayItem[];
  setItems: React.Dispatch<React.SetStateAction<SomedayItem[]>>;
}

export function SomedaySection({ theme, items, setItems }: SomedaySectionProps) {
  const isDark = theme === 'noir';
  const [filter, setFilter] = useState<string>('all');

  const addItem = () => {
    const newItem: SomedayItem = {
      id: Date.now().toString(),
      title: '',
      description: '',
      category: 'Personal',
      addedDate: new Date().toISOString()
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, updates: Partial<SomedayItem>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const categories = ['all', ...new Set(items.map(i => i.category))];
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(i => i.category === filter);

  const getDaysAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const inputClass = isDark
    ? 'w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-[#e0e0e0] outline-none focus:border-[#3a3a3a] transition-colors'
    : 'w-full bg-[#faf8f6] border border-[#e8e3dd] rounded px-4 py-3 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors';

  return (
    <div className="px-6 py-12 lg:py-16 pb-24 lg:pb-12">
      <div className="max-w-5xl mx-auto">
        <h1 className={`text-center tracking-[0.3em] mb-4 uppercase ${
          isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
        }`}>
          Someday / Maybe
        </h1>
        <p className={`text-center text-sm mb-8 ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
        }`}>
          Capture ideas and dreams for later consideration
        </p>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded text-sm capitalize transition-colors ${
                filter === cat
                  ? isDark
                    ? 'bg-[#1a1a1a] text-white border border-[#2a2a2a]'
                    : 'bg-white text-[#5a4f45] border border-[#e8e3dd]'
                  : isDark
                  ? 'text-[#6a6a6a] hover:text-[#a0a0a0]'
                  : 'text-[#a89a8f] hover:text-[#8b7e74]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {filteredItems.map(item => {
            const daysAgo = getDaysAgo(item.addedDate);
            return (
              <div
                key={item.id}
                className={`rounded-lg p-5 ${
                  isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateItem(item.id, { title: e.target.value })}
                    className={`flex-1 mr-3 ${inputClass}`}
                    placeholder="Idea title"
                  />
                  <button
                    onClick={() => deleteItem(item.id)}
                    className={isDark ? 'text-[#6a6a6a] hover:text-[#a0a0a0]' : 'text-[#a89a8f] hover:text-[#8b7e74]'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-3">
                  <select
                    value={item.category}
                    onChange={(e) => updateItem(item.id, { category: e.target.value })}
                    className={`${inputClass} text-sm`}
                  >
                    <option>Personal</option>
                    <option>Career</option>
                    <option>Learning</option>
                    <option>Travel</option>
                    <option>Creative</option>
                    <option>Business</option>
                    <option>Lifestyle</option>
                    <option>Other</option>
                  </select>
                </div>

                <textarea
                  value={item.description}
                  onChange={(e) => updateItem(item.id, { description: e.target.value })}
                  className={`${inputClass} resize-none text-sm mb-3`}
                  rows={3}
                  placeholder="Describe this idea... Why does it interest you?"
                />

                <div className="flex items-center justify-between">
                  <div className={`text-xs ${isDark ? 'text-[#4a4a4a]' : 'text-[#c9bfb5]'}`}>
                    Added {daysAgo === 0 ? 'today' : `${daysAgo}d ago`}
                  </div>
                  <button
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      isDark ? 'text-[#6a6a6a] hover:text-[#a0a0a0]' : 'text-[#a89a8f] hover:text-[#8b7e74]'
                    }`}
                  >
                    <span>Move to Projects</span>
                    <MoveRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Button */}
        <button
          onClick={addItem}
          className={`w-full border-2 border-dashed rounded-lg py-6 transition-all flex items-center justify-center gap-2 group ${
            isDark
              ? 'bg-[#1a1a1a] border-[#2a2a2a] text-[#6a6a6a] hover:border-[#3a3a3a] hover:bg-[#0a0a0a]'
              : 'bg-white border-[#e8e3dd] text-[#8b7e74] hover:border-[#c9bfb5] hover:bg-[#faf8f6]'
          }`}
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="tracking-[0.1em] uppercase text-sm">Capture New Idea</span>
        </button>

        {/* Info Box */}
        <div className={`mt-8 p-6 rounded-lg border-2 border-dashed ${
          isDark ? 'border-[#2a2a2a] bg-[#0a0a0a]' : 'border-[#e8e3dd] bg-[#faf8f6]'
        }`}>
          <div className={`text-xs uppercase tracking-wider mb-2 ${
            isDark ? 'text-[#6a6a6a]' : 'text-[#8b7e74]'
          }`}>
            💡 What is Someday/Maybe?
          </div>
          <p className={`text-sm ${isDark ? 'text-[#a0a0a0]' : 'text-[#a89a8f]'}`}>
            A place for ideas, dreams, and possibilities that aren't ready to become active projects yet. 
            Review this list regularly - some ideas will fade, others will become your next big thing.
          </p>
        </div>
      </div>
    </div>
  );
}
