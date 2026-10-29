import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('vardha_admin_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => api.getToken());
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      // Continue client cleanup even if network request fails
    } finally {
      api.clearToken();
      setAdmin(null);
      setToken(null);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const activeToken = api.getToken();
    if (!activeToken) {
      setAdmin(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.get('/auth/me');
      if (res.success && res.admin) {
        setAdmin(res.admin);
        localStorage.setItem('vardha_admin_profile', JSON.stringify(res.admin));
      } else {
        logout();
      }
    } catch (err) {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();

    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('vardha:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('vardha:unauthorized', handleUnauthorized);
    };
  }, [checkAuth, logout]);

  const login = async (email, password, remember = true) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.success && res.token) {
        api.setToken(res.token, remember);
        setToken(res.token);
        setAdmin(res.admin);
        localStorage.setItem('vardha_admin_profile', JSON.stringify(res.admin));
        return { success: true, admin: res.admin };
      }
      return { success: false, message: res.message || 'Login failed.' };
    } catch (err) {
      return {
        success: false,
        message: err.data?.message || err.message || 'Authentication failed. Please verify credentials.'
      };
    }
  };

  const updateProfile = async (profileData) => {
    const res = await api.put('/auth/profile', profileData);
    if (res.success && res.admin) {
      setAdmin((prev) => ({ ...prev, ...res.admin }));
      localStorage.setItem('vardha_admin_profile', JSON.stringify({ ...admin, ...res.admin }));
    }
    return res;
  };

  const changePassword = async (currentPassword, newPassword) => {
    return await api.put('/auth/password', { currentPassword, newPassword });
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: Boolean(token && admin),
        isLoading,
        login,
        logout,
        updateProfile,
        changePassword,
        checkAuth
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export default AdminAuthContext;

