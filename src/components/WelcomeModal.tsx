import React from 'react';
import { X, CheckCircle, Download } from 'lucide-react';
import { Theme } from '../App';
import { BRANDING } from '../config/branding';

interface WelcomeModalProps {
  theme: Theme;
  onClose: () => void;
}

export function WelcomeModal({ theme, onClose }: WelcomeModalProps) {
  const isDark = theme === 'noir';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className={`max-w-2xl w-full rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto ${
        isDark ? 'bg-[#1a1a1a]' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`p-6 border-b ${
          isDark ? 'border-[#2a2a2a]' : 'border-[#e8e3dd]'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className={`text-2xl mb-2 ${
                isDark ? 'text-white' : 'text-[#5a4f45]'
              }`}>
                Welcome to {BRANDING.appName}
              </h2>
              <p className={`text-sm ${
                isDark ? 'text-[#a0a0a0]' : 'text-[#a89a8f]'
              }`}>
                {BRANDING.tagline}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`${
                isDark ? 'text-[#6a6a6a] hover:text-[#a0a0a0]' : 'text-[#a89a8f] hover:text-[#8b7e74]'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Features */}
          <div>
            <h3 className={`uppercase tracking-wider text-sm mb-4 ${
              isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
            }`}>
              Everything you need to organize your life
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {BRANDING.features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 text-sm ${
                    isDark ? 'text-[#e0e0e0]' : 'text-[#5a4f45]'
                  }`}
                >
                  <CheckCircle className={`w-4 h-4 flex-shrink-0 ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Data */}
          <div className={`p-4 rounded-lg ${
            isDark ? 'bg-[#0a0a0a] border border-[#2a2a2a]' : 'bg-[#faf8f6] border border-[#e8e3dd]'
          }`}>
            <h4 className={`text-sm mb-2 flex items-center gap-2 ${
              isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
            }`}>
              🔒 Your Data, Your Device
            </h4>
            <p className={`text-sm ${
              isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
            }`}>
              All your data is stored locally in your browser. Nothing is sent to any server. 
              Your information stays completely private and secure.
            </p>
          </div>

          {/* Backup Reminder */}
          <div className={`p-4 rounded-lg border-2 border-dashed ${
            isDark ? 'border-[#2a2a2a] bg-[#0a0a0a]' : 'border-[#e8e3dd] bg-white'
          }`}>
            <h4 className={`text-sm mb-2 flex items-center gap-2 ${
              isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
            }`}>
              <Download className="w-4 h-4" />
              Important: Regular Backups
            </h4>
            <p className={`text-sm mb-2 ${
              isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
            }`}>
              Since data is stored in your browser, we recommend exporting backups regularly. 
              You'll find the export option in the Dashboard settings menu.
            </p>
          </div>

          {/* Quick Start */}
          <div>
            <h3 className={`uppercase tracking-wider text-sm mb-3 ${
              isDark ? 'text-[#a0a0a0]' : 'text-[#8b7e74]'
            }`}>
              Quick Start Guide
            </h3>
            <ol className={`space-y-2 text-sm ${
              isDark ? 'text-[#e0e0e0]' : 'text-[#5a4f45]'
            }`}>
              <li>1. Start at the <strong>Dashboard</strong> to see your overview</li>
              <li>2. Create your first <strong>Project</strong> or <strong>Goal</strong></li>
              <li>3. Add daily <strong>Tasks</strong> and <strong>Habits</strong> to track</li>
              <li>4. Try the <strong>Life Balance</strong> wheel to assess your life areas</li>
              <li>5. Use the theme toggle (top right) to switch between Soft and Noir modes</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${
          isDark ? 'border-[#2a2a2a]' : 'border-[#e8e3dd]'
        }`}>
          <button
            onClick={onClose}
            className={`w-full py-3 rounded-lg transition-colors ${
              isDark
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-[#5a4f45] text-white hover:bg-[#6b5e54]'
            }`}
          >
            Get Started
          </button>
          <p className={`text-center text-xs mt-3 ${
            isDark ? 'text-[#4a4a4a]' : 'text-[#c9bfb5]'
          }`}>
            Version {BRANDING.version}
          </p>
        </div>
      </div>
    </div>
  );
}
