// src/App.jsx
import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import AppCanvas from './components/AppCanvas';
import Toast from './Toast';

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
    </ErrorBoundary>
  );
}

export default App;