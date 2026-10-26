import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8FC] flex flex-col items-center justify-center text-[#241B35]">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-[#DDD6FE] border-t-[#6D28D9] animate-spin"></div>
          <div className="absolute font-serif font-black text-sm tracking-widest text-[#6D28D9]">V</div>
        </div>
        <p className="mt-4 text-xs font-mono uppercase tracking-widest font-semibold text-[#6D28D9]">
          Authenticating Sovereign Session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
