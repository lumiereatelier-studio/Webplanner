import React from 'react';

export default function FrostGlass_Option4_Scandinavian() {
  return (
    <div className="w-full min-h-screen relative flex items-center justify-center overflow-hidden" style={{
      // PASTEL INTERIOR - soft colorful vibes!
      backgroundImage: `url('https://images.unsplash.com/photo-1632999101501-47bd016f7e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBpbnRlcmlvciUyMHJvb218ZW58MXx8fHwxNzY3NTExMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      
      {/* MUCH WIDER - like an OS dashboard */}
      <div className="w-full max-w-7xl mx-auto px-8">
        
        {/* DARK/BLACK FROSTED GLASS - inverted! */}
        <div className="rounded-3xl p-12" style={{
          background: 'rgba(30, 30, 30, 0.4)',
          backdropFilter: 'blur(60px) saturate(150%)',
          WebkitBackdropFilter: 'blur(60px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        }}>
          
          {/* Top row - Logo centered */}
          <div className="text-center mb-12">
            <h1 className="text-6xl mb-1" style={{ 
              color: '#FFFFFF',
              fontWeight: 300,
              letterSpacing: '0.1em'
            }}>
              LALINE
            </h1>
            <p className="text-xs tracking-widest" style={{ 
              color: '#D4D4D4',
              textTransform: 'uppercase',
              fontSize: '10px',
              letterSpacing: '0.3em'
            }}>
              Life Planner
            </p>
          </div>

          {/* HORIZONTAL LAYOUT - 3 columns like OS */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            
            {/* LEFT COLUMN - Weather/Stats placeholder */}
            <div>
              <div className="mb-6">
                <p className="text-sm mb-2" style={{ color: '#C4C4C4' }}>Weather</p>
                <p className="text-3xl" style={{ color: '#FFFFFF', fontWeight: 300 }}>22°</p>
                <p className="text-sm" style={{ color: '#B0B0B0' }}>Partly Cloudy</p>
              </div>
              <div>
                <p className="text-sm mb-2" style={{ color: '#C4C4C4' }}>Tasks Today</p>
                <p className="text-3xl" style={{ color: '#FFFFFF', fontWeight: 300 }}>3</p>
                <p className="text-sm" style={{ color: '#B0B0B0' }}>Upcoming</p>
              </div>
            </div>

            {/* CENTER COLUMN - Main greeting */}
            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="text-4xl mb-4" style={{ 
                color: '#FFFFFF',
                fontWeight: 300,
              }}>
                Good afternoon, Tara
              </h2>
              <p className="text-base italic mb-6" style={{ 
                color: '#D4D4D4',
                fontWeight: 300,
                lineHeight: '1.8',
              }}>
                "You have the authority to design your day."
              </p>
            </div>

            {/* RIGHT COLUMN - Time/Date */}
            <div className="text-right">
              <p className="text-5xl mb-2" style={{ 
                color: '#FFFFFF',
                fontWeight: 300,
              }}>
                2:34
              </p>
              <p className="text-lg mb-1" style={{ 
                color: '#E4E4E4',
                fontWeight: 300,
              }}>
                Sunday
              </p>
              <p className="text-base" style={{ 
                color: '#C4C4C4',
              }}>
                January 4, 2026
              </p>
            </div>

          </div>

          {/* Bottom row - Buttons - WHITE FROSTED GLASS! */}
          <div className="flex justify-center gap-3">
            <button className="px-7 py-3.5 rounded-2xl transition-all hover:scale-105" style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(30px) saturate(150%)',
              WebkitBackdropFilter: 'blur(30px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              color: '#FFFFFF',
              fontWeight: 400,
              fontSize: '13px',
              letterSpacing: '0.03em'
            }}>
              Begin Day
            </button>
            
            <button className="px-7 py-3.5 rounded-2xl transition-all hover:scale-105" style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(30px) saturate(150%)',
              WebkitBackdropFilter: 'blur(30px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              color: '#FFFFFF',
              fontWeight: 400,
              fontSize: '13px',
              letterSpacing: '0.03em'
            }}>
              View Calendar
            </button>

            <button className="px-7 py-3.5 rounded-2xl transition-all hover:scale-105" style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(30px) saturate(150%)',
              WebkitBackdropFilter: 'blur(30px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              color: '#FFFFFF',
              fontWeight: 400,
              fontSize: '13px',
              letterSpacing: '0.03em'
            }}>
              Today's Focus
            </button>

            <button className="px-7 py-3.5 rounded-2xl transition-all hover:scale-105" style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(30px) saturate(150%)',
              WebkitBackdropFilter: 'blur(30px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              color: '#FFFFFF',
              fontWeight: 400,
              fontSize: '13px',
              letterSpacing: '0.03em'
            }}>
              Settings
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
}