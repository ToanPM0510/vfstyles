// src/App.jsx
import React, { useState, useEffect } from 'react'; // Thêm useEffect
import { useLocation } from 'react-router-dom'; // Thêm dòng này
import ErrorBoundary from './ErrorBoundary';
import AppCanvas from './components/AppCanvas';
import Toast from './Toast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import ReactGA from 'react-ga4';

// Khởi tạo GA4
ReactGA.initialize('G-YB2BBZK2FN');

function App() {
  const [toast, setToast] = useState(null);
  const location = useLocation(); // Thêm hook này

  // Theo dõi pageviews
  useEffect(() => {
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
  }, [location]);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  // Ví dụ về theo dõi sự kiện
  const trackEvent = (eventName, eventParams) => {
    ReactGA.event({
      category: 'User Interaction',
      action: eventName,
      ...eventParams
    });
  };

  return (
    <ErrorBoundary>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => {
            setToast(null);
            // Ví dụ về tracking event khi đóng toast
            trackEvent('Close Toast', { label: toast.type });
          }} 
        />
      )}
      <AppCanvas 
        onShowToast={(message, type) => {
          showToast(message, type);
          // Ví dụ về tracking event khi hiển thị toast
          trackEvent('Show Toast', { label: type });
        }} 
      />
      <Analytics />
      <SpeedInsights />
    </ErrorBoundary>
  );
}

export default App;