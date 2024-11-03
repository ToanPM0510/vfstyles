// src/components/Loading.jsx
import React from 'react';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">
        <span>Loading</span>
        <span className="dots">...</span>
      </div>
    </div>
  );
};

export default Loading;