import React from 'react';
import intimateInterior from 'figma:asset/43816c14c69295de74c2d9aa19636897e9bf01b1.png';
import mountainLivingRoom from 'figma:asset/86197787f5019d453236f2270be40531eb04b255.png';
import outdoorDeck from 'figma:asset/591940cf4ebcbeb470cf3d47e340c45aa9bb998a.png';
import libraryReading from 'figma:asset/8cd317c8b5c1e09393dbfc1c43e603168bd80035.png';
import modernKitchen from 'figma:asset/72594e259a30f648273b838de2f45bf7cd696d4c.png';

interface AreaCard {
  id: string;
  name: string;
  description: string;
  stat: string;
  isPremium: boolean;
  isPlaceholder?: boolean;
}

interface Section {
  title: string;
  subtitle: string;
  background: string;
  areas: AreaCard[];
  gridCols: 2 | 4; // 2 for side-by-side, 4 for 2x2 grid
  hasSeparatorAfter?: boolean;
}

// Separator component - "hallway" between rooms
function Separator() {
  return (
    <div className="w-full h-[40vh] relative flex items-center justify-center" style={{
      background: 'linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
    }}>
      {/* Subtle decorative line */}
      <div style={{
        width: '1px',
        height: '80px',
        background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)',
      }} />
    </div>
  );
}

export default function DashboardCards() {
  // Mock projects data - in real app this would come from state/database
  const projects = [
    { id: 'p1', name: 'Brand Redesign', description: 'Q1 2026 Launch', stat: '8 tasks', isPremium: false },
    { id: 'p2', name: 'Product Documentation', description: 'Technical writing', stat: '3 tasks', isPremium: false },
    // Add placeholders if less than 4 projects
  ];

  // Fill to 4 cards with placeholders
  const projectCards: AreaCard[] = [...projects];
  while (projectCards.length < 4) {
    projectCards.push({
      id: `placeholder-${projectCards.length}`,
      name: 'New Project',
      description: 'What\'s next?',
      stat: 'Add project',
      isPremium: false,
      isPlaceholder: true,
    });
  }

  const sections: Section[] = [
    // SECTION 1: OFFICE - 4 Projects
    {
      title: "Work & Creation",
      subtitle: "The Office",
      background: outdoorDeck,
      areas: projectCards,
      gridCols: 4,
      hasSeparatorAfter: true, // Separator after Office
    },
    
    // SECTION 2: READING NOOK - Journal, Notes, Goals, Habits
    {
      title: "Reflection & Vision",
      subtitle: "The Reading Nook",
      background: libraryReading,
      areas: [
        { id: 'journal', name: 'Journal', description: 'Daily reflection', stat: '3 this week', isPremium: false },
        { id: 'notes', name: 'Notes', description: 'Ideas & research', stat: 'Unlock Aurelia', isPremium: true },
        { id: 'goals', name: 'Goals', description: 'Long-term vision', stat: '2 in progress', isPremium: false },
        { id: 'habits', name: 'Habits', description: 'Daily tracking', stat: '5 active', isPremium: false },
      ],
      gridCols: 4,
      hasSeparatorAfter: true, // YES - Separator after Reading Nook
    },
    
    // SECTION 3: LIVING ROOM - Home & Finance
    {
      title: "Life & Wealth",
      subtitle: "The Living Room",
      background: mountainLivingRoom,
      areas: [
        { id: 'home', name: 'Home', description: 'Household management', stat: 'Unlock Aurelia', isPremium: true },
        { id: 'finance', name: 'Finance', description: 'Budget & expenses', stat: 'Unlock Aurelia', isPremium: true },
      ],
      gridCols: 2,
      hasSeparatorAfter: false, // NO separator after Living Room
    },
    
    // SECTION 4: KITCHEN - Health & Meals
    {
      title: "Health & Nourishment",
      subtitle: "The Kitchen",
      background: modernKitchen,
      areas: [
        { id: 'health', name: 'Health', description: 'Wellness tracking', stat: 'Unlock Aurelia', isPremium: true },
        { id: 'meals', name: 'Meals', description: 'Meal prep & nutrition', stat: 'Unlock Aurelia', isPremium: true },
      ],
      gridCols: 2,
      hasSeparatorAfter: false,
    },
  ];

  return (
    <>
      {/* First separator - transition from welcome to areas */}
      <Separator />
      
      {sections.map((section, idx) => (
        <React.Fragment key={idx}>
          
          {/* Main Section */}
          <section 
            className="w-full min-h-screen relative flex items-center justify-center py-24 px-8"
            style={{
              backgroundImage: `url(${section.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed', // PARALLAX!
              position: 'relative',
              isolation: 'isolate',
              backgroundColor: '#000000', // Solid black base to prevent bleed
            }}
          >
            
            {/* Solid overlay to prevent bleed-through + darken for readability */}
            <div className="absolute inset-0" style={{
              background: 'rgba(0, 0, 0, 0.5)', // Simpler solid overlay
              zIndex: 1,
            }} />
            
            {/* Content Container */}
            <div className="w-full max-w-6xl mx-auto relative z-10">
              
              {/* Section Header */}
              <div className="text-center mb-12">
                <p className="text-xs tracking-widest mb-2" style={{ 
                  color: '#D4D4D4',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em'
                }}>
                  {section.subtitle}
                </p>
                <h2 className="text-5xl" style={{ 
                  color: '#FFFFFF',
                  fontWeight: 300,
                  letterSpacing: '0.05em'
                }}>
                  {section.title}
                </h2>
              </div>

              {/* Cards Grid - 2x2 for 4 cards, side-by-side for 2 cards */}
              <div 
                className={`grid gap-6 max-w-5xl mx-auto ${
                  section.gridCols === 4 
                    ? 'grid-cols-1 md:grid-cols-2' 
                    : 'grid-cols-1 md:grid-cols-2 max-w-4xl'
                }`}
              >
                
                {section.areas.map((area) => (
                  <button
                    key={area.id}
                    className="group relative rounded-3xl p-8 transition-all duration-300 hover:scale-105 text-left"
                    style={{
                      background: area.isPlaceholder
                        ? 'rgba(30, 30, 30, 0.2)'
                        : area.isPremium 
                          ? 'rgba(30, 30, 30, 0.3)' 
                          : 'rgba(30, 30, 30, 0.4)',
                      backdropFilter: 'blur(60px) saturate(150%)',
                      WebkitBackdropFilter: 'blur(60px) saturate(150%)',
                      border: area.isPlaceholder
                        ? '1px dashed rgba(255, 255, 255, 0.1)'
                        : area.isPremium 
                          ? '1px solid rgba(255, 255, 255, 0.05)' 
                          : '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: area.isPlaceholder 
                        ? 'none'
                        : `0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
                      opacity: area.isPlaceholder ? 0.5 : area.isPremium ? 0.7 : 1,
                      cursor: area.isPremium ? 'not-allowed' : 'pointer',
                    }}
                  >
                    
                    {/* Premium Lock Indicator */}
                    {area.isPremium && (
                      <div className="absolute top-5 right-5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{
                          background: 'rgba(255, 215, 0, 0.2)',
                          border: '1px solid rgba(255, 215, 0, 0.4)',
                        }}>
                          <span style={{ color: '#FFD700', fontSize: '14px' }}>✦</span>
                        </div>
                      </div>
                    )}

                    {/* Area Name */}
                    <h3 className="text-2xl mb-2" style={{ 
                      color: area.isPlaceholder ? '#888888' : '#FFFFFF',
                      fontWeight: 400,
                    }}>
                      {area.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm mb-6" style={{ 
                      color: area.isPlaceholder ? '#666666' : '#B0B0B0',
                    }}>
                      {area.description}
                    </p>

                    {/* Stat / Status - WHITE FROST BUTTON! */}
                    <div className="inline-block px-4 py-2 rounded-xl" style={{
                      background: area.isPlaceholder
                        ? 'rgba(255, 255, 255, 0.05)'
                        : area.isPremium 
                          ? 'rgba(255, 215, 0, 0.15)' 
                          : 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(20px) saturate(150%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                      border: area.isPlaceholder
                        ? '1px solid rgba(255, 255, 255, 0.05)'
                        : area.isPremium 
                          ? '1px solid rgba(255, 215, 0, 0.3)' 
                          : '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}>
                      <p className="text-xs tracking-wide" style={{ 
                        color: area.isPlaceholder 
                          ? '#666666'
                          : area.isPremium 
                            ? '#FFD700' 
                            : '#1A1A2E',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}>
                        {area.stat}
                      </p>
                    </div>

                    {/* Hover Glow Effect */}
                    {!area.isPremium && !area.isPlaceholder && (
                      <div 
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
                        }}
                      />
                    )}

                  </button>
                ))}

              </div>

            </div>
          </section>

          {/* Separator AFTER section (if specified) */}
          {section.hasSeparatorAfter && <Separator />}

        </React.Fragment>
      ))}

      {/* FINAL CTA SECTION - Upgrade to Aurelia */}
      <section className="w-full min-h-screen relative flex items-center justify-center py-24 px-8" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1759256243437-9c8f7238c42b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5zaW9uJTIwZXh0ZXJpb3IlMjBzdW5zZXR8ZW58MXx8fHwxNzY3NTMwOTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // PARALLAX!
        position: 'relative',
        isolation: 'isolate',
      }}>
        
        {/* Darker overlay for emphasis */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
        }} />
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-5xl mb-6" style={{ 
            color: '#FFFFFF',
            fontWeight: 300,
          }}>
            Ready for the complete experience?
          </h2>
          <p className="text-lg mb-10" style={{ 
            color: '#D4D4D4',
            lineHeight: '1.8',
          }}>
            Unlock <strong style={{ color: '#FFD700' }}>Aurelia</strong> to access all 8 life areas, 
            unlimited entries, and export capabilities. One-time payment, yours forever.
          </p>
          
          <button className="px-10 py-5 rounded-2xl transition-all hover:scale-105" style={{
            background: 'rgba(255, 215, 0, 0.2)',
            backdropFilter: 'blur(40px) saturate(150%)',
            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
            border: '1px solid rgba(255, 215, 0, 0.4)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            color: '#FFD700',
            fontWeight: 500,
            fontSize: '16px',
            letterSpacing: '0.05em'
          }}>
            Unlock Aurelia - $87 One-Time
          </button>
        </div>
      </section>
    </>
  );
}