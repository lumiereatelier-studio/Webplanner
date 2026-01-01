import React, { useState } from 'react';
import { Key, CheckCircle } from 'lucide-react';
import { STORAGE_KEYS, saveToStorage, loadFromStorage } from '../utils/storage';
import { BRANDING } from '../config/branding';

interface LicenseCheckProps {
  onValidated: () => void;
}

// Simple license validation - you can make this more sophisticated
// For Gumroad integration, you can use their API to verify license keys
function validateLicenseKey(key: string): boolean {
  // For now, accept any non-empty key that looks like a license
  // Replace this with real validation (e.g., Gumroad API call)
  // Example patterns:
  // - Check against a list of valid keys
  // - Call Gumroad's license verification API
  // - Use a hash/signature verification
  
  const pattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return pattern.test(key.toUpperCase()) || key === 'DEMO';
}

export function LicenseCheck({ onValidated }: LicenseCheckProps) {
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsValidating(true);

    // Simulate API call delay
    setTimeout(() => {
      if (validateLicenseKey(licenseKey)) {
        saveToStorage(STORAGE_KEYS.LICENSE_KEY, licenseKey);
        onValidated();
      } else {
        setError('Invalid license key. Please check and try again.');
      }
      setIsValidating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f5f1ed] rounded-full mb-4">
            <Key className="w-8 h-8 text-[#8b7e74]" />
          </div>
          <h1 className="text-2xl text-[#5a4f45] mb-2">
            {BRANDING.appName}
          </h1>
          <p className="text-sm text-[#a89a8f]">
            Enter your license key to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#8b7e74] mb-2">
              License Key
            </label>
            <input
              type="text"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="w-full bg-[#faf8f6] border border-[#e8e3dd] rounded px-4 py-3 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors uppercase tracking-wider"
              disabled={isValidating}
            />
            {error && (
              <p className="text-xs text-red-600 mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isValidating || !licenseKey}
            className="w-full bg-[#5a4f45] text-white py-3 rounded-lg hover:bg-[#6b5e54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isValidating ? 'Validating...' : 'Activate License'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#e8e3dd]">
          <p className="text-xs text-[#a89a8f] text-center mb-2">
            Don't have a license yet?
          </p>
          <a
            href={BRANDING.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm text-[#8b7e74] hover:text-[#6b5e54] transition-colors"
          >
            Purchase {BRANDING.appName} →
          </a>
        </div>

        <div className="mt-6 p-4 bg-[#faf8f6] rounded-lg">
          <p className="text-xs text-[#a89a8f] text-center">
            💡 Demo Mode: Enter "DEMO" to try it out
          </p>
        </div>

        <p className="text-xs text-center text-[#c9bfb5] mt-6">
          Having trouble? Contact {BRANDING.supportEmail}
        </p>
      </div>
    </div>
  );
}
