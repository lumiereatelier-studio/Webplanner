import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LicenseCheck } from './components/LicenseCheck';
import { STORAGE_KEYS, loadFromStorage } from './utils/storage';
import './styles/globals.css';

// Set to true if you want to require license keys
// Set to false for open use (no license required)
const REQUIRE_LICENSE = false;

function Main() {
  const [isLicensed, setIsLicensed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if license is required
    if (!REQUIRE_LICENSE) {
      setIsLicensed(true);
      setIsChecking(false);
      return;
    }

    // Check for existing license
    const existingLicense = loadFromStorage(STORAGE_KEYS.LICENSE_KEY, '');
    if (existingLicense) {
      // You could add additional validation here
      setIsLicensed(true);
    }
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center">
        <div className="text-[#8b7e74]">Loading...</div>
      </div>
    );
  }

  if (REQUIRE_LICENSE && !isLicensed) {
    return <LicenseCheck onValidated={() => setIsLicensed(true)} />;
  }

  return <App />;
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Main />);
}
