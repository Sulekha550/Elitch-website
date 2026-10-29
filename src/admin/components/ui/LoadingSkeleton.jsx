import React from 'react';

export default function LoadingSkeleton({ type = 'table', rows = 5 }) {
  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white border border-[#EDE5F5] animate-pulse shadow-xs"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="h-3 w-24 bg-[#EDE5F5] rounded"></div>
              <div className="h-9 w-9 bg-[#F3E8FF] rounded-xl"></div>
            </div>
            <div className="h-7 w-20 bg-[#EDE5F5] rounded mb-2"></div>
            <div className="h-3 w-32 bg-[#F3EEFF] rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'form') {
    return (
      <div className="p-6 rounded-2xl bg-white border border-[#EDE5F5] animate-pulse space-y-5 shadow-xs">
        <div className="h-5 w-48 bg-[#EDE5F5] rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-10 bg-[#FAF8FC] border border-[#EDE5F5] rounded-xl"></div>
          <div className="h-10 bg-[#FAF8FC] border border-[#EDE5F5] rounded-xl"></div>
        </div>
        <div className="h-32 bg-[#FAF8FC] border border-[#EDE5F5] rounded-xl"></div>
        <div className="h-10 w-36 bg-[#F3E8FF] rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#EDE5F5] animate-pulse shadow-xs">
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-[#EDE5F5]">
        <div className="h-4 w-32 bg-[#EDE5F5] rounded"></div>
        <div className="h-8 w-44 bg-[#F3E8FF] rounded-lg"></div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-[#F3E8FF] rounded-xl flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-[#EDE5F5] rounded"></div>
              <div className="h-3 w-1/2 bg-[#F3EEFF] rounded"></div>
            </div>
            <div className="h-6 w-20 bg-[#FCE7F3] rounded-full"></div>
            <div className="h-8 w-8 bg-[#FAF8FC] border border-[#EDE5F5] rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

