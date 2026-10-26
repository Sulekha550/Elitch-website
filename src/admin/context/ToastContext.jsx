import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col space-y-3 pointer-events-none max-w-md w-full px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start p-4 rounded-2xl shadow-[0_15px_35px_rgba(48,35,71,0.12)] border transition-all duration-300 transform translate-y-0 backdrop-blur-xl bg-white ${
              toast.type === 'success'
                ? 'border-[#A7F3D0] border-l-4 border-l-[#10B981]'
                : toast.type === 'error'
                ? 'border-[#FECDD3] border-l-4 border-l-[#E11D48]'
                : 'border-[#DDD6FE] border-l-4 border-l-[#7851D8]'
            }`}
          >
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {toast.type === 'success' && (
                <div className="p-1 rounded-lg bg-[#ECFDF5] text-[#10B981]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="p-1 rounded-lg bg-[#FFF1F2] text-[#E11D48]">
                  <AlertCircle className="w-4 h-4" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="p-1 rounded-lg bg-[#F0EAFE] text-[#7851D8]">
                  <Info className="w-4 h-4" />
                </div>
              )}
            </div>
            <div className="flex-1 mr-2">
              {toast.title && (
                <h4 className="text-xs font-bold tracking-wide text-[#302347]">
                  {toast.title}
                </h4>
              )}
              {toast.message && (
                <p className="text-xs text-[#6F657D] mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-[#9B91A8] hover:text-[#302347] hover:bg-[#F3EEFF] rounded-lg transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
