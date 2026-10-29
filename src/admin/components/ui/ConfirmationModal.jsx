import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmationModal({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed with this operation? This action cannot be undone.',
  confirmLabel = 'Delete Permanently',
  confirmVariant = 'danger',
  isLoading = false,
  onConfirm,
  onClose
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-[#241B35]/30 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-white border border-[#EDE5F5] shadow-[0_20px_50px_rgba(48,35,71,0.15)]">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-[#9B91A8] hover:text-[#241B35] hover:bg-[#F3EEFF] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div
            className={`p-2.5 rounded-xl border ${
              confirmVariant === 'danger'
                ? 'bg-[#FFF1F2] border-[#FECDD3] text-[#E11D48]'
                : 'bg-[#F3E8FF] border-[#DDD6FE] text-[#6D28D9]'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#241B35] font-display tracking-tight">
            {title}
          </h3>
        </div>

        <p className="text-xs text-[#786D88] mb-6 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#786D88] hover:text-[#241B35] hover:bg-[#F3EEFF] border border-[#EDE5F5] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-sm flex items-center ${
              confirmVariant === 'danger'
                ? 'bg-[#E11D48] hover:bg-[#BE123C] shadow-[#E11D48]/20'
                : 'bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] hover:from-[#4C1D95] hover:to-[#5533A8] shadow-[#6D28D9]/20'
            }`}
          >
            {isLoading && (
              <span className="w-3.5 h-3.5 mr-2 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
            )}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

