import React from 'react';

export default function LiquidGlass_12_3() {
  return (
    <div className="w-full min-h-screen relative" style={{
      // Slightly lighter than Frost, but still rich enough for contrast
      background: '#F2EAE2',
      // Organic warmth
      backgroundImage: `
        radial-gradient(
          ellipse 1200px 800px at 50% 50%,
          rgba(255, 245, 235, 0.4),
          transparent
        )
      `
    }}>
      <div className="max-w-6xl mx-auto px-8 py-20">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl mb-3" style={{ 
            color: '#2D2520',
            fontWeight: 300,
            letterSpacing: '-0.03em'
          }}>
            LALINE
          </h1>
          <p className="text-base tracking-wide" style={{ 
            color: '#8B7865',
            textTransform: 'uppercase',
            fontSize: '13px',
            letterSpacing: '0.15em'
          }}>
            Life Planner
          </p>
        </div>

        {/* Main Glass Card - LIQUID DRAMATIC FLOAT */}
        <div className="mb-8 rounded-3xl p-10 transition-all hover:-translate-y-2 hover:shadow-2xl" style={{
          // More luminous, flowing glass
          background: 'rgba(255, 255, 254, 0.75)',
          backdropFilter: 'blur(32px) saturate(120%)',
          WebkitBackdropFilter: 'blur(32px) saturate(120%)',
          // Softer border with gradient feel
          border: '1.5px solid rgba(255, 255, 255, 1)',
          borderTop: '2px solid rgba(255, 255, 255, 1)',
          // LIQUID DRAMATIC shadows - softer but BIGGER
          boxShadow: `
            0 40px 100px rgba(93, 73, 58, 0.22),
            0 20px 50px rgba(93, 73, 58, 0.15),
            0 10px 25px rgba(93, 73, 58, 0.1),
            0 4px 20px rgba(255, 255, 255, 0.6) inset,
            0 -4px 12px rgba(196, 166, 141, 0.06) inset
          `
        }}>
          <h2 className="text-3xl mb-3" style={{ 
            color: '#2D2520',
            fontWeight: 400,
            letterSpacing: '-0.02em'
          }}>
            This week flows
          </h2>
          <p className="mb-8 text-base leading-relaxed" style={{ 
            color: '#8B7865',
          }}>
            Like water finding its path. Clear. Intentional. Effortless.
          </p>
          
          {/* Task Items - Liquid soft with shadows */}
          <div className="space-y-4">
            {['Design the delicious', 'Write with conviction', 'Ship with confidence'].map((task, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:bg-white/70 hover:shadow-lg" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 253, 250, 0.35))',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 12px rgba(93, 73, 58, 0.05), 0 2px 4px rgba(255, 255, 255, 0.9) inset'
              }}>
                <div className="w-5 h-5 rounded-lg flex-shrink-0" style={{
                  background: 'linear-gradient(135deg, rgba(196, 166, 141, 0.3), rgba(255, 255, 255, 0.5))',
                  border: '1.5px solid rgba(196, 166, 141, 0.5)',
                  boxShadow: '0 2px 6px rgba(196, 166, 141, 0.15) inset'
                }}></div>
                <span style={{ 
                  color: '#2D2520', 
                  fontSize: '16px',
                  fontWeight: 400
                }}>{task}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid - Liquid floating */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { number: '12', label: 'Completed' },
            { number: '3', label: 'In Progress' },
            { number: '2', label: 'Projects' }
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl p-8 text-center transition-all hover:-translate-y-2 hover:shadow-2xl" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 254, 0.8), rgba(255, 253, 250, 0.65))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(255, 255, 255, 1)',
              borderTop: '2px solid rgba(255, 255, 255, 1)',
              boxShadow: `
                0 25px 70px rgba(93, 73, 58, 0.16),
                0 12px 35px rgba(93, 73, 58, 0.11),
                0 6px 18px rgba(93, 73, 58, 0.07),
                0 2px 10px rgba(255, 255, 255, 0.8) inset
              `
            }}>
              <div className="text-4xl mb-2" style={{ 
                color: '#2D2520',
                fontWeight: 300
              }}>
                {stat.number}
              </div>
              <div className="text-xs uppercase tracking-widest" style={{ 
                color: '#A89584',
                letterSpacing: '0.12em'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA - Liquid shimmer with drama */}
        <div className="mt-16 text-center">
          <button className="px-10 py-4 rounded-2xl transition-all hover:scale-105 hover:shadow-2xl" style={{
            background: 'linear-gradient(135deg, rgba(206, 176, 151, 0.85), rgba(196, 166, 141, 0.95))',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            borderTop: '1.5px solid rgba(255, 255, 255, 0.95)',
            boxShadow: '0 16px 48px rgba(93, 73, 58, 0.22), 0 4px 12px rgba(255, 255, 255, 0.5) inset',
            color: '#2D2520',
            fontWeight: 500,
            fontSize: '15px',
            letterSpacing: '0.02em'
          }}>
            Begin
          </button>
        </div>

      </div>
    </div>
  );
}