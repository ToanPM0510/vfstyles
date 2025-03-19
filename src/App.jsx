// src/App.jsx
import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import AppCanvas from './components/AppCanvas';
import Toast from './Toast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';
import ForgotPassword from './pages/ForgotPassword';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-YB2BBZK2FN');

function App() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/" });
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const trackEvent = (eventName, eventParams) => {
    ReactGA.event({
      category: 'User Interaction',
      action: eventName,
      ...eventParams
    });
  };

  return (
    <Router>
      <ErrorBoundary>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
        <Toaster position="top-right" />
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AppCanvas onShowToast={showToast} />} />
          </Route>

          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </ErrorBoundary>
    </Router>
  );
}

export default App;