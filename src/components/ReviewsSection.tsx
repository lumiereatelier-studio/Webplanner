import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Theme, WeeklyReview } from '../App';

interface ReviewsSectionProps {
  theme: Theme;
  reviews: WeeklyReview[];
  setReviews: React.Dispatch<React.SetStateAction<WeeklyReview[]>>;
}

export function ReviewsSection({ theme, reviews, setReviews }: ReviewsSectionProps) {
  const isDark = theme === 'noir';
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addReview = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    const newReview: WeeklyReview = {
      id: Date.now().toString(),
      weekOf: weekStart.toISOString().split('T')[0],
      wins: '',
      challenges: '',
      lessons: '',
      nextWeekFocus: '',
      gratitude: ''
    };
    setReviews([newReview, ...reviews]);
    setExpandedId(newReview.id);
  };

  const updateReview = (id: string, updates: Partial<WeeklyReview>) => {
    setReviews(reviews.map(review => review.id === id ? { ...review, ...updates } : review));
  };

  const deleteReview = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const formatWeekRange = (weekOf: string) => {
    const start = new Date(weekOf);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
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
          Weekly Reviews
        </h1>
        <p className={`text-center text-sm mb-8 ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
        }`}>
          Reflect, learn, and plan ahead
        </p>

        {/* Add New Review */}
        <button
          onClick={addReview}
          className={`w-full mb-6 border-2 border-dashed rounded-lg py-6 transition-all flex items-center justify-center gap-2 group ${
            isDark
              ? 'bg-[#1a1a1a] border-[#2a2a2a] text-[#6a6a6a] hover:border-[#3a3a3a] hover:bg-[#0a0a0a]'
              : 'bg-white border-[#e8e3dd] text-[#8b7e74] hover:border-[#c9bfb5] hover:bg-[#faf8f6]'
          }`}
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="tracking-[0.1em] uppercase text-sm">New Weekly Review</span>
        </button>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map(review => {
            const isExpanded = expandedId === review.id;
            return (
              <div
                key={review.id}
                className={`rounded-lg overflow-hidden ${
                  isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : review.id)}
                  className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
                    isDark ? 'hover:bg-[#0a0a0a]' : 'hover:bg-[#faf8f6]'
                  }`}
                >
                  <div>
                    <div className={`text-sm uppercase tracking-wider mb-1 ${
                      isDark ? 'text-[#6a6a6a]' : 'text-[#8b7e74]'
                    }`}>
                      Week of
                    </div>
                    <div className={isDark ? 'text-[#e0e0e0]' : 'text-[#5a4f45]'}>
                      {formatWeekRange(review.weekOf)}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className={`w-5 h-5 ${isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'}`} />
                  )}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={`px-6 pb-6 pt-2 border-t ${
                    isDark ? 'border-[#2a2a2a]' : 'border-[#e8e3dd]'
                  }`}>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>🎉 Wins & Accomplishments</label>
                        <textarea
                          value={review.wins}
                          onChange={(e) => updateReview(review.id, { wins: e.target.value })}
                          className={`${inputClass} resize-none`}
                          rows={3}
                          placeholder="What went well this week? What are you proud of?"
                        />
                      </div>

                      <div>
                        <label className={labelClass}>⚡ Challenges & Obstacles</label>
                        <textarea
                          value={review.challenges}
                          onChange={(e) => updateReview(review.id, { challenges: e.target.value })}
                          className={`${inputClass} resize-none`}
                          rows={3}
                          placeholder="What was difficult? What got in the way?"
                        />
                      </div>

                      <div>
                        <label className={labelClass}>💡 Lessons Learned</label>
                        <textarea
                          value={review.lessons}
                          onChange={(e) => updateReview(review.id, { lessons: e.target.value })}
                          className={`${inputClass} resize-none`}
                          rows={3}
                          placeholder="What did you learn? What would you do differently?"
                        />
                      </div>

                      <div>
                        <label className={labelClass}>🎯 Next Week's Focus</label>
                        <textarea
                          value={review.nextWeekFocus}
                          onChange={(e) => updateReview(review.id, { nextWeekFocus: e.target.value })}
                          className={`${inputClass} resize-none`}
                          rows={3}
                          placeholder="What are your top 3 priorities for next week?"
                        />
                      </div>

                      <div>
                        <label className={labelClass}>🙏 Gratitude</label>
                        <textarea
                          value={review.gratitude}
                          onChange={(e) => updateReview(review.id, { gratitude: e.target.value })}
                          className={`${inputClass} resize-none`}
                          rows={2}
                          placeholder="What are you grateful for this week?"
                        />
                      </div>

                      <button
                        onClick={() => {
                          if (confirm('Delete this review?')) {
                            deleteReview(review.id);
                          }
                        }}
                        className={`text-sm ${
                          isDark ? 'text-[#6a6a6a] hover:text-red-400' : 'text-[#a89a8f] hover:text-red-600'
                        }`}
                      >
                        Delete Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {reviews.length === 0 && (
            <div className={`text-center py-12 ${isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'}`}>
              <p className="mb-2">No reviews yet</p>
              <p className="text-sm">Start your first weekly reflection above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
