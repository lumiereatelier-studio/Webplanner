import React from 'react';
import { Theme, LifeArea } from '../App';

interface BalanceSectionProps {
  theme: Theme;
  lifeAreas: LifeArea[];
  setLifeAreas: React.Dispatch<React.SetStateAction<LifeArea[]>>;
}

export function BalanceSection({ theme, lifeAreas, setLifeAreas }: BalanceSectionProps) {
  const isDark = theme === 'noir';

  const updateArea = (id: string, updates: Partial<LifeArea>) => {
    setLifeAreas(lifeAreas.map(area => area.id === id ? { ...area, ...updates } : area));
  };

  const averageScore = lifeAreas.reduce((sum, area) => sum + area.score, 0) / lifeAreas.length;

  const inputClass = isDark
    ? 'w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-[#e0e0e0] outline-none focus:border-[#3a3a3a] transition-colors'
    : 'w-full bg-[#faf8f6] border border-[#e8e3dd] rounded px-4 py-3 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors';

  const labelClass = isDark
    ? 'block text-[#6a6a6a] text-xs mb-2 uppercase tracking-wider'
    : 'block text-[#8b7e74] text-xs mb-2 uppercase tracking-wider';

  // Calculate wheel chart coordinates
  const centerX = 200;
  const centerY = 200;
  const maxRadius = 150;
  const numAreas = lifeAreas.length;

  const getCoordinates = (index: number, score: number) => {
    const angle = (Math.PI * 2 * index) / numAreas - Math.PI / 2;
    const radius = (score / 10) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  const pathData = lifeAreas
    .map((area, index) => {
      const { x, y } = getCoordinates(index, area.score);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(' ') + ' Z';

  const gridLevels = [2, 4, 6, 8, 10];

  return (
    <div className="px-6 py-12 lg:py-16 pb-24 lg:pb-12">
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-center tracking-[0.3em] mb-4 uppercase ${
          isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
        }`}>
          Life Balance
        </h1>
        <p className={`text-center text-sm mb-12 ${
          isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
        }`}>
          Visualize and improve balance across life areas
        </p>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Wheel Chart */}
          <div className={`rounded-lg p-8 ${
            isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
          }`}>
            <div className="flex flex-col items-center">
              <div className={`text-sm uppercase tracking-wider mb-2 ${
                isDark ? 'text-[#6a6a6a]' : 'text-[#8b7e74]'
              }`}>
                Overall Balance
              </div>
              <div className={`text-3xl mb-6 ${isDark ? 'text-white' : 'text-[#5a4f45]'}`}>
                {averageScore.toFixed(1)}/10
              </div>

              <svg width="400" height="400" viewBox="0 0 400 400" className="max-w-full">
                {/* Grid circles */}
                {gridLevels.map(level => (
                  <circle
                    key={level}
                    cx={centerX}
                    cy={centerY}
                    r={(level / 10) * maxRadius}
                    fill="none"
                    stroke={isDark ? '#2a2a2a' : '#e8e3dd'}
                    strokeWidth="1"
                  />
                ))}

                {/* Axis lines */}
                {lifeAreas.map((_, index) => {
                  const { x, y } = getCoordinates(index, 10);
                  return (
                    <line
                      key={index}
                      x1={centerX}
                      y1={centerY}
                      x2={x}
                      y2={y}
                      stroke={isDark ? '#2a2a2a' : '#e8e3dd'}
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Score polygon */}
                <path
                  d={pathData}
                  fill={isDark ? 'rgba(224, 224, 224, 0.1)' : 'rgba(139, 126, 116, 0.1)'}
                  stroke={isDark ? '#e0e0e0' : '#8b7e74'}
                  strokeWidth="2"
                />

                {/* Labels */}
                {lifeAreas.map((area, index) => {
                  const { x, y } = getCoordinates(index, 11);
                  return (
                    <text
                      key={area.id}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      className={`text-xs ${isDark ? 'fill-[#6a6a6a]' : 'fill-[#8b7e74]'}`}
                    >
                      {area.name}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Score Cards */}
          <div className="space-y-4">
            {lifeAreas.map(area => (
              <div
                key={area.id}
                className={`rounded-lg p-4 ${
                  isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex-1">
                    <div className={`mb-2 ${isDark ? 'text-[#e0e0e0]' : 'text-[#5a4f45]'}`}>
                      {area.name}
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={area.score}
                        onChange={(e) => updateArea(area.id, { score: parseInt(e.target.value) })}
                        className="flex-1"
                      />
                      <div className={`w-12 text-center ${
                        isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
                      }`}>
                        {area.score}/10
                      </div>
                    </div>
                  </div>
                </div>
                <textarea
                  value={area.notes}
                  onChange={(e) => updateArea(area.id, { notes: e.target.value })}
                  className={`${inputClass} resize-none text-sm`}
                  rows={2}
                  placeholder="Notes: What would improve this area?"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className={`rounded-lg p-6 ${
          isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
        }`}>
          <h3 className={`uppercase tracking-wider text-sm mb-4 ${
            isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
          }`}>
            Insights
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className={`text-xs mb-2 ${isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'}`}>
                Strongest Areas
              </div>
              <div className={`text-sm ${isDark ? 'text-[#e0e0e0]' : 'text-[#5a4f45]'}`}>
                {lifeAreas
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 2)
                  .map(a => a.name)
                  .join(', ')}
              </div>
            </div>
            <div>
              <div className={`text-xs mb-2 ${isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'}`}>
                Areas for Growth
              </div>
              <div className={`text-sm ${isDark ? 'text-[#e0e0e0]' : 'text-[#5a4f45]'}`}>
                {lifeAreas
                  .sort((a, b) => a.score - b.score)
                  .slice(0, 2)
                  .map(a => a.name)
                  .join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
