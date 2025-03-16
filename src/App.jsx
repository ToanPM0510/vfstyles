// src/App.jsx
import React, { useState } from 'react';
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
import Login from '../pages/Login';
import Register from '../pages/Register';
import Verify from '../pages/Verify';
import ForgotPassword from '../pages/ForgotPassword';
import AuthLayout from '../layouts/AuthLayout';

function App() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
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
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/" element={<AppCanvas onShowToast={showToast} />} />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </ErrorBoundary>
    </Router>
  );
}

export default App;