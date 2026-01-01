import React, { useState } from 'react';
import { Plus, Trash2, Calendar, MessageCircle, Gift } from 'lucide-react';
import { Theme, Relationship } from '../App';

interface RelationshipsSectionProps {
  theme: Theme;
  relationships: Relationship[];
  setRelationships: React.Dispatch<React.SetStateAction<Relationship[]>>;
}

export function RelationshipsSection({ theme, relationships, setRelationships }: RelationshipsSectionProps) {
  const isDark = theme === 'noir';
  const [filter, setFilter] = useState<string>('all');

  const addRelationship = () => {
    const newRelationship: Relationship = {
      id: Date.now().toString(),
      name: '',
      category: 'Friend',
      lastContact: new Date().toISOString().split('T')[0],
      nextAction: '',
      birthday: '',
      notes: '',
      frequency: 'Monthly'
    };
    setRelationships([...relationships, newRelationship]);
  };

  const updateRelationship = (id: string, updates: Partial<Relationship>) => {
    setRelationships(relationships.map(rel => rel.id === id ? { ...rel, ...updates } : rel));
  };

  const deleteRelationship = (id: string) => {
    setRelationships(relationships.filter(rel => rel.id !== id));
  };

  const getDaysSinceContact = (lastContact: string) => {
    if (!lastContact) return null;
    const last = new Date(lastContact);
    const today = new Date();
    const diffTime = today.getTime() - last.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUpcomingBirthday = (birthday?: string) => {
    if (!birthday) return null;
    const today = new Date();
    const bday = new Date(birthday);
    const thisYearBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
    
    if (thisYearBday < today) {
      thisYearBday.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = thisYearBday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const categories = ['all', ...new Set(relationships.map(r => r.category))];
  const filteredRelationships = filter === 'all' 
    ? relationships 
    : relationships.filter(r => r.category === filter);

  const inputClass = isDark
    ? 'w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-2 text-[#e0e0e0] outline-none focus:border-[#3a3a3a] transition-colors'
    : 'w-full bg-[#faf8f6] border border-[#e8e3dd] rounded px-3 py-2 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors';

  const labelClass = isDark
    ? 'block text-[#6a6a6a] text-xs mb-1 uppercase tracking-wider'
    : 'block text-[#8b7e74] text-xs mb-1 uppercase tracking-wider';

  return (
    <div className="px-6 py-12 lg:py-16 pb-24 lg:pb-12">
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-center tracking-[0.3em] mb-4 uppercase ${
          isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
        }`}>
          Relationships
        </h1>
        <p className={`text-center text-sm mb-8 ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
        }`}>
          Stay connected with the people who matter
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

        {/* Relationships Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {filteredRelationships.map(rel => {
            const daysSince = getDaysSinceContact(rel.lastContact);
            const daysUntilBirthday = getUpcomingBirthday(rel.birthday);
            const needsAttention = daysSince && daysSince > 30;

            return (
              <div
                key={rel.id}
                className={`rounded-lg p-5 ${
                  isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
                } ${needsAttention ? isDark ? 'border-orange-900/50' : 'border-orange-200' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={rel.name}
                      onChange={(e) => updateRelationship(rel.id, { name: e.target.value })}
                      className={`mb-2 ${inputClass}`}
                      placeholder="Name"
                    />
                    <div className="flex gap-2">
                      <select
                        value={rel.category}
                        onChange={(e) => updateRelationship(rel.id, { category: e.target.value })}
                        className={`${inputClass} text-xs`}
                      >
                        <option>Friend</option>
                        <option>Family</option>
                        <option>Colleague</option>
                        <option>Mentor</option>
                        <option>Client</option>
                        <option>Other</option>
                      </select>
                      <select
                        value={rel.frequency}
                        onChange={(e) => updateRelationship(rel.id, { frequency: e.target.value })}
                        className={`${inputClass} text-xs`}
                      >
                        <option>Weekly</option>
                        <option>Bi-weekly</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Yearly</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteRelationship(rel.id)}
                    className={`ml-2 ${
                      isDark ? 'text-[#6a6a6a] hover:text-[#a0a0a0]' : 'text-[#a89a8f] hover:text-[#8b7e74]'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Status Indicators */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                    isDark ? 'bg-[#0a0a0a] text-[#6a6a6a]' : 'bg-[#faf8f6] text-[#a89a8f]'
                  }`}>
                    <MessageCircle className="w-3 h-3" />
                    {daysSince !== null ? `${daysSince}d ago` : 'No contact'}
                  </div>
                  {daysUntilBirthday !== null && daysUntilBirthday <= 30 && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                      isDark ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-50 text-purple-700'
                    }`}>
                      <Gift className="w-3 h-3" />
                      Birthday in {daysUntilBirthday}d
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Last Contact</label>
                    <input
                      type="date"
                      value={rel.lastContact}
                      onChange={(e) => updateRelationship(rel.id, { lastContact: e.target.value })}
                      className={`${inputClass} text-sm`}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Birthday</label>
                    <input
                      type="date"
                      value={rel.birthday || ''}
                      onChange={(e) => updateRelationship(rel.id, { birthday: e.target.value })}
                      className={`${inputClass} text-sm`}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Next Action</label>
                    <input
                      type="text"
                      value={rel.nextAction}
                      onChange={(e) => updateRelationship(rel.id, { nextAction: e.target.value })}
                      className={`${inputClass} text-sm`}
                      placeholder="e.g., Send message, Schedule lunch"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Notes</label>
                    <textarea
                      value={rel.notes}
                      onChange={(e) => updateRelationship(rel.id, { notes: e.target.value })}
                      className={`${inputClass} resize-none text-sm`}
                      rows={2}
                      placeholder="Interests, conversation topics, context..."
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Button */}
        <button
          onClick={addRelationship}
          className={`w-full border-2 border-dashed rounded-lg py-6 transition-all flex items-center justify-center gap-2 group ${
            isDark
              ? 'bg-[#1a1a1a] border-[#2a2a2a] text-[#6a6a6a] hover:border-[#3a3a3a] hover:bg-[#0a0a0a]'
              : 'bg-white border-[#e8e3dd] text-[#8b7e74] hover:border-[#c9bfb5] hover:bg-[#faf8f6]'
          }`}
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="tracking-[0.1em] uppercase text-sm">Add New Contact</span>
        </button>
      </div>
    </div>
  );
}
