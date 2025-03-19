// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Kiểm tra token trong localStorage
  const isAuthenticated = localStorage.getItem('token');
  
  // Nếu không có token, chuyển hướng về trang login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có token, render các route con
  return <Outlet />;
};

export default ProtectedRoute;