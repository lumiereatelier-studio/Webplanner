import React, { useState } from 'react';

// Import your Figma components
import FrostGlassDesign from './imports/FrostGlass';
import LiquidGlassDesign from './imports/LiquidGlass';

export default function LandingComparison() {
  const [activeView, setActiveView] = useState<'frost' | 'liquid' | 'both'>('both');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Toggle Controls */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-black/50 backdrop-blur-xl rounded-full p-2 flex gap-2">
          <button
            onClick={() => setActiveView('frost')}
            className={`px-6 py-2 rounded-full transition-all ${
              activeView === 'frost'
                ? 'bg-white text-black'
                : 'bg-transparent hover:bg-white/10'
            }`}
          >
            Frost Glass
          </button>
          <button
            onClick={() => setActiveView('both')}
            className={`px-6 py-2 rounded-full transition-all ${
              activeView === 'both'
                ? 'bg-white text-black'
                : 'bg-transparent hover:bg-white/10'
            }`}
          >
            Both
          </button>
          <button
            onClick={() => setActiveView('liquid')}
            className={`px-6 py-2 rounded-full transition-all ${
              activeView === 'liquid'
                ? 'bg-white text-black'
                : 'bg-transparent hover:bg-white/10'
            }`}
          >
            Liquid Glass
          </button>
        </div>
      </div>

      {/* Designs Display */}
      <div className={`grid ${activeView === 'both' ? 'grid-cols-2' : 'grid-cols-1'} min-h-screen`}>
        {(activeView === 'frost' || activeView === 'both') && (
          <div className="relative border-r border-white/10">
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-sm">
                Frost Glass
              </span>
            </div>
            <FrostGlassDesign />
          </div>
        )}
        
        {(activeView === 'liquid' || activeView === 'both') && (
          <div className="relative">
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-sm">
                Liquid Glass
              </span>
            </div>
            <LiquidGlassDesign />
          </div>
        )}
      </div>

      {/* Strategic Commentary */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-2xl">
        <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <p className="text-sm text-gray-300 leading-relaxed">
            <span className="text-white font-medium">Re: Product vs Marketing —</span> You're right. 
            If this is <em>insane</em>, it will sell itself. But... slower at first. The play: Launch with 
            silent authority, let Pinterest slowly seed it (your friends handle this), then when AI 
            floods 2027 with mediocrity, LALINE stands out as the "finished product" with actual taste. 
            <span className="text-white"> The design IS the marketing.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
