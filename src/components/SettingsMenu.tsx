import React, { useState, useRef } from 'react';
import { Settings, Download, Upload, Trash2, Key } from 'lucide-react';
import { Theme } from '../App';
import { exportAllData, importAllData, clearAllData } from '../utils/storage';
import { BRANDING } from '../config/branding';

interface SettingsMenuProps {
  theme: Theme;
}

export function SettingsMenu({ theme }: SettingsMenuProps) {
  const isDark = theme === 'noir';
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const success = await importAllData(file);
      if (success) {
        alert('Data imported successfully! The page will reload.');
        window.location.reload();
      } else {
        alert('Error importing data. Please check the file format.');
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors ${
          isDark
            ? 'text-[#a0a0a0] hover:bg-[#1a1a1a]'
            : 'text-[#8b7e74] hover:bg-[#faf8f6]'
        }`}
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute right-0 mt-2 w-64 rounded-lg shadow-xl z-50 overflow-hidden ${
            isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#e8e3dd]'
          }`}>
            <div className={`px-4 py-3 border-b ${
              isDark ? 'border-[#2a2a2a]' : 'border-[#e8e3dd]'
            }`}>
              <div className={`text-sm uppercase tracking-wider ${
                isDark ? 'text-[#6a6a6a]' : 'text-[#8b7e74]'
              }`}>
                Data Management
              </div>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  exportAllData();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                  isDark
                    ? 'text-[#e0e0e0] hover:bg-[#0a0a0a]'
                    : 'text-[#5a4f45] hover:bg-[#faf8f6]'
                }`}
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Export Backup</span>
              </button>

              <button
                onClick={() => {
                  fileInputRef.current?.click();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                  isDark
                    ? 'text-[#e0e0e0] hover:bg-[#0a0a0a]'
                    : 'text-[#5a4f45] hover:bg-[#faf8f6]'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span className="text-sm">Import Backup</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />

              <hr className={`my-2 ${
                isDark ? 'border-[#2a2a2a]' : 'border-[#e8e3dd]'
              }`} />

              <button
                onClick={() => {
                  clearAllData();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                  isDark
                    ? 'text-red-400 hover:bg-red-900/20'
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Clear All Data</span>
              </button>
            </div>

            <div className={`px-4 py-3 border-t ${
              isDark ? 'border-[#2a2a2a] bg-[#0a0a0a]' : 'border-[#e8e3dd] bg-[#faf8f6]'
            }`}>
              <div className={`text-xs ${
                isDark ? 'text-[#4a4a4a]' : 'text-[#c9bfb5]'
              }`}>
                {BRANDING.appName} v{BRANDING.version}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
