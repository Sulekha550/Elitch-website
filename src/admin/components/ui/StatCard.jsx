import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({
  title,
  value,
  sublabel,
  icon: Icon,
  trend,
  trendPositive = true,
  accentColor = 'gold', // 'gold' | 'bronze' | 'obsidian' | 'neutral'
  goldAccent = true,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative p-6 rounded-2xl bg-white border border-[#EDE5F5] shadow-[0_2px_12px_rgba(109,40,217,0.03)] hover:shadow-[0_12px_28px_rgba(109,40,217,0.08)] hover:border-[#EC4899]/50 transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#786D88]">
          {title}
        </span>
        {Icon && (
          <div className="p-2.5 rounded-xl border border-[#F3E8FF] bg-[#FAF5FF] text-[#6D28D9] group-hover:bg-gradient-to-r group-hover:from-[#EC4899] group-hover:to-[#8B5CF6] group-hover:text-white group-hover:border-transparent transition-all duration-200 shadow-xs">
            <Icon className="w-5 h-5 transition-colors" />
          </div>
        )}
      </div>

      <div className="flex items-baseline space-x-3">
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#241B35] font-display">
          {value}
        </div>
        {trend && (
          <div
            className={`flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${
              trendPositive
                ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                : 'text-rose-800 bg-rose-50 border-rose-200'
            }`}
          >
            {trendPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {trend}
          </div>
        )}
      </div>

      {sublabel && (
        <p className="mt-2.5 text-xs text-[#786D88] font-normal leading-relaxed">
          {sublabel}
        </p>
      )}

      {/* Radiant pink bottom highlight accent line */}
      <div className="absolute inset-x-5 -bottom-px h-[2px] rounded-full transition-opacity opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-[#EC4899] to-transparent" />
    </div>
  );
}

