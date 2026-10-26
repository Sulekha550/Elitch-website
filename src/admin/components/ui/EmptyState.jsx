import React from 'react';
import { FolderPlus } from 'lucide-react';

export default function EmptyState({
  icon: Icon = FolderPlus,
  title = 'No records found',
  description = 'There are currently no items matching your criteria in the system.',
  actionLabel,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-[#EDE5F5] shadow-[0_2px_10px_rgba(120,81,216,0.03)]">
      <div className="p-4 rounded-2xl bg-[#F3E8FF] border border-[#DDD6FE] text-[#6D28D9] mb-4 shadow-xs">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-[#241B35] tracking-tight mb-1 font-display">
        {title}
      </h3>
      <p className="text-xs text-[#786D88] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] text-white hover:from-[#4C1D95] hover:to-[#5533A8] transition-all shadow-md hover:shadow-lg"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
