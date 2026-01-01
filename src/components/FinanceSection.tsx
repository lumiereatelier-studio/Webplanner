import React, { useState } from 'react';
import { Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { Theme, FinanceEntry } from '../App';

interface FinanceSectionProps {
  theme: Theme;
  entries: FinanceEntry[];
  setEntries: React.Dispatch<React.SetStateAction<FinanceEntry[]>>;
}

export function FinanceSection({ theme, entries, setEntries }: FinanceSectionProps) {
  const isDark = theme === 'noir';
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  const addEntry = (type: 'income' | 'expense') => {
    const newEntry: FinanceEntry = {
      id: Date.now().toString(),
      type,
      category: '',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0]
    };
    setEntries([newEntry, ...entries]);
  };

  const updateEntry = (id: string, updates: Partial<FinanceEntry>) => {
    setEntries(entries.map(entry => entry.id === id ? { ...entry, ...updates } : entry));
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const filteredEntries = entries.filter(entry => 
    filter === 'all' ? true : entry.type === filter
  );

  const totalIncome = entries.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = entries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  const inputClass = isDark
    ? 'bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-2 text-[#e0e0e0] outline-none focus:border-[#3a3a3a] transition-colors'
    : 'bg-[#faf8f6] border border-[#e8e3dd] rounded px-3 py-2 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors';

  return (
    <div className="px-6 py-12 lg:py-16 pb-24 lg:pb-12">
      <div className="max-w-5xl mx-auto">
        <h1 className={`text-center tracking-[0.3em] mb-4 uppercase ${
          isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
        }`}>
          Finance Tracker
        </h1>
        <p className={`text-center text-sm mb-8 ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
        }`}>
          Monitor income and expenses
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`rounded-lg p-6 ${
            isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
          }`}>
            <div className={`flex items-center gap-2 mb-2 ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}>
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">Income</span>
            </div>
            <div className={`text-2xl ${isDark ? 'text-white' : 'text-[#5a4f45]'}`}>
              ${totalIncome.toFixed(2)}
            </div>
          </div>

          <div className={`rounded-lg p-6 ${
            isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
          }`}>
            <div className={`flex items-center gap-2 mb-2 ${
              isDark ? 'text-red-400' : 'text-red-600'
            }`}>
              <TrendingDown className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">Expenses</span>
            </div>
            <div className={`text-2xl ${isDark ? 'text-white' : 'text-[#5a4f45]'}`}>
              ${totalExpense.toFixed(2)}
            </div>
          </div>

          <div className={`rounded-lg p-6 ${
            isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
          }`}>
            <div className={`text-sm uppercase tracking-wider mb-2 ${
              isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
            }`}>
              Balance
            </div>
            <div className={`text-2xl ${
              balance >= 0
                ? isDark ? 'text-green-400' : 'text-green-600'
                : isDark ? 'text-red-400' : 'text-red-600'
            }`}>
              ${balance.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Add Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => addEntry('income')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded transition-colors ${
              isDark
                ? 'bg-green-900/20 text-green-400 hover:bg-green-900/30'
                : 'bg-green-50 text-green-700 hover:bg-green-100'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Income</span>
          </button>
          <button
            onClick={() => addEntry('expense')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded transition-colors ${
              isDark
                ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30'
                : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Expense</span>
          </button>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {(['all', 'income', 'expense'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded text-sm capitalize transition-colors ${
                filter === f
                  ? isDark
                    ? 'bg-[#1a1a1a] text-white border border-[#2a2a2a]'
                    : 'bg-white text-[#5a4f45] border border-[#e8e3dd]'
                  : isDark
                  ? 'text-[#6a6a6a] hover:text-[#a0a0a0]'
                  : 'text-[#a89a8f] hover:text-[#8b7e74]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Entries List */}
        <div className="space-y-3">
          {filteredEntries.map(entry => (
            <div
              key={entry.id}
              className={`rounded-lg p-4 ${
                isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 w-8 h-8 rounded flex items-center justify-center ${
                  entry.type === 'income'
                    ? isDark ? 'bg-green-900/20' : 'bg-green-50'
                    : isDark ? 'bg-red-900/20' : 'bg-red-50'
                }`}>
                  {entry.type === 'income' ? (
                    <TrendingUp className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  ) : (
                    <TrendingDown className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                  )}
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-3">
                  <input
                    type="text"
                    value={entry.category}
                    onChange={(e) => updateEntry(entry.id, { category: e.target.value })}
                    className={inputClass}
                    placeholder="Category"
                  />
                  <input
                    type="number"
                    value={entry.amount}
                    onChange={(e) => updateEntry(entry.id, { amount: parseFloat(e.target.value) || 0 })}
                    className={inputClass}
                    placeholder="Amount"
                    step="0.01"
                  />
                  <input
                    type="date"
                    value={entry.date}
                    onChange={(e) => updateEntry(entry.id, { date: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    value={entry.description}
                    onChange={(e) => updateEntry(entry.id, { description: e.target.value })}
                    className={`${inputClass} md:col-span-2`}
                    placeholder="Description"
                  />
                </div>

                <button
                  onClick={() => deleteEntry(entry.id)}
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
      </div>
    </div>
  );
}
