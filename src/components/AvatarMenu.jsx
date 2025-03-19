// src/components/AvatarMenu.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AvatarMenu.css';

const AvatarMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token
    navigate('/login'); // Chuyển hướng về trang login
  };

  return (
    <div className="avatar-menu">
      {/* Avatar */}
      <div
        className="avatar"
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu
      >
        <img
          src="https://via.placeholder.com/40" // Thay bằng URL avatar thực tế
          alt="Avatar"
        />
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="menu">
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;