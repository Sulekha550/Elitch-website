import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '', showLabel = false }) {
  const { effectiveTheme, toggleTheme } = useTheme();
  const isDarkActive = effectiveTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDarkActive ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkActive ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative flex items-center gap-2 p-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ${
        isDarkActive
          ? 'bg-brand-900 border border-white/15 text-amber-400 hover:border-amber-400/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]'
          : 'bg-slate-100 border border-slate-200/90 text-slate-700 hover:border-cyan-400/60 hover:shadow-[0_0_15px_rgba(14,165,233,0.15)] shadow-inner'
      } ${className}`}
    >
      {/* Sliding pill thumb */}
      <div className={`relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 transform ${
        isDarkActive 
          ? 'bg-brand-800 text-amber-300 shadow-md' 
          : 'bg-white text-amber-500 shadow-sm border border-slate-200/80'
      }`}>
        {isDarkActive ? (
          <Moon className="w-4 h-4 transition-transform group-hover:rotate-12 duration-300 fill-amber-300/20" />
        ) : (
          <Sun className="w-4 h-4 transition-transform group-hover:rotate-45 duration-300 text-amber-500 fill-amber-500/30" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold px-2 pr-2.5 transition-colors text-slate-700 dark:text-slate-300">
          {isDarkActive ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}

