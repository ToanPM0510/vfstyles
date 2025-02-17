// src/App.jsx
import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import AppCanvas from './components/AppCanvas';
import Toast from './Toast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  return (
    <ErrorBoundary>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      <AppCanvas onShowToast={showToast} />
      <Analytics />
      <SpeedInsights />
    </ErrorBoundary>
  );
}

export default App;