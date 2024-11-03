// src/components/Toast.jsx
import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <i className={`fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
        <span>{message}</span>
      </div>
      <button className="toast-close" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default Toast;