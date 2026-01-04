import React from 'react';

// Welcome Screen Component
import WelcomeScreen from './imports/FrostGlass_Option3_ModernApartment';

// Dashboard Cards
import DashboardCards from './components/DashboardCards';

export default function App() {
  return (
    <div className="w-full">
      
      {/* SECTION 1: Welcome Screen - Full viewport height, isolated */}
      <section className="h-screen w-full relative" style={{
        isolation: 'isolate', // Create new stacking context
      }}>
        <WelcomeScreen />
      </section>

      {/* SECTION 2: Dashboard Cards - Scrollable, different background */}
      <section className="w-full relative" style={{
        isolation: 'isolate', // Separate stacking context
        backgroundColor: '#000', // Solid black base to prevent any bleed
      }}>
        <DashboardCards />
      </section>

    </div>
  );
}