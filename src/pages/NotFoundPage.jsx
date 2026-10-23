import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass, Mail } from 'lucide-react';

import { HERO_IMAGES } from '../data/imageAssets';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center pt-24 px-6 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGES.globalNetwork.url}
          alt={HERO_IMAGES.globalNetwork.alt}
          className="w-full h-full object-cover object-center filter blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-slate-900/80 dark:bg-slate-950/90" />
      </div>

      <div className="relative z-10 glass-card rounded-3xl p-10 max-w-lg w-full text-center border border-white/20 dark:border-white/10 shadow-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-pink-700 dark:text-pink-400 font-bold">
          404 • Resource Not Located
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white">
          Data Node <br />Unavailable
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          The requested route or dossier could not be indexed on the Elicit Research network. Please navigate back to a primary operating hub.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-xs font-display flex items-center justify-center gap-2 shadow-md hover:shadow-lg shadow-pink-600/20 active:scale-95 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
