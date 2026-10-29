import React from 'react';

export default function StatusBadge({ status, type = 'status' }) {
  if (!status) return null;

  const normalized = status.toString().trim();

  // Luxury Architectural Real Estate Status Palette
  const styles = {
    // Project statuses
    Ongoing: 'bg-[#FDF2F8] text-[#DB2777] border-[#FBCFE8] font-semibold',
    Upcoming: 'bg-sky-50 text-sky-800 border-sky-200 font-semibold',
    Completed: 'bg-[#EDF6F1] text-[#1D6A42] border-[#CDE5D6] font-semibold',

    // Lead & Inquiry statuses
    New: 'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5] font-bold',
    new: 'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5] font-bold',
    Contacted: 'bg-[#F3EEFF] text-[#6D28D9] border-[#DDD6FE]',
    Qualified: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-bold',
    'Follow-up': 'bg-pink-50 text-pink-700 border-pink-200',
    Closed: 'bg-slate-100 text-slate-700 border-slate-200',
    in_progress: 'bg-purple-50 text-purple-700 border-purple-200',
    responded: 'bg-[#FDF2F8] text-[#DB2777] border-[#FBCFE8]',
    archived: 'bg-stone-100 text-stone-600 border-stone-200',

    // Priority
    High: 'bg-rose-50 text-rose-800 border-rose-200 font-bold',
    Medium: 'bg-[#FDF2F8] text-[#DB2777] border-[#FBCFE8]',
    Low: 'bg-stone-50 text-stone-600 border-stone-200',

    // Roles
    superadmin: 'bg-gradient-to-r from-[#21093A] to-[#17052A] text-pink-300 border-[#EC4899]/40 font-bold',
    admin: 'bg-[#F3EEFF] text-[#6D28D9] border-[#DDD6FE] font-semibold',
    editor: 'bg-stone-100 text-stone-700 border-stone-200',

    // Publication
    Published: 'bg-[#EDF6F1] text-[#1D6A42] border-[#CDE5D6] font-semibold',
    Draft: 'bg-stone-100 text-stone-600 border-stone-200'
  };

  const badgeClass =
    styles[normalized] || 'bg-[#FAF8FD] text-[#786D88] border-[#EDE5F5]';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border tracking-wide uppercase shadow-xs ${badgeClass}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80"></span>
      {normalized.replace('_', ' ')}
    </span>
  );
}

