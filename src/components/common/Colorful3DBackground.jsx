/**
 * AmbientBackground — replaces the heavy Colorful3DBackground.
 * Renders two soft, static radial gradients that vary subtly per route.
 * Zero animations, zero canvas, zero 3D transforms.
 * Pure CSS, GPU-friendly, accessible.
 */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

// Route-keyed ambient palette: two complementary colours per page
// Route-keyed ambient palette: consistent Home Page palette across every page
const LIGHT_PALETTE = {
  '/':          { a: 'rgba(244,114,182,0.18)', b: 'rgba(99,102,241,0.12)' },
  '/services':  { a: 'rgba(244,114,182,0.18)', b: 'rgba(99,102,241,0.12)' },
  '/panel':     { a: 'rgba(244,114,182,0.18)', b: 'rgba(99,102,241,0.12)' },
  '/about':     { a: 'rgba(244,114,182,0.18)', b: 'rgba(99,102,241,0.12)' },
  '/contact':   { a: 'rgba(244,114,182,0.18)', b: 'rgba(99,102,241,0.12)' },
  '/careers':   { a: 'rgba(244,114,182,0.18)', b: 'rgba(99,102,241,0.12)' },
};

const DARK_PALETTE = {
  '/':          { a: 'rgba(236,72,153,0.10)', b: 'rgba(99,102,241,0.08)' },
  '/services':  { a: 'rgba(236,72,153,0.10)', b: 'rgba(99,102,241,0.08)' },
  '/panel':     { a: 'rgba(236,72,153,0.10)', b: 'rgba(99,102,241,0.08)' },
  '/about':     { a: 'rgba(236,72,153,0.10)', b: 'rgba(99,102,241,0.08)' },
  '/contact':   { a: 'rgba(236,72,153,0.10)', b: 'rgba(99,102,241,0.08)' },
  '/careers':   { a: 'rgba(236,72,153,0.10)', b: 'rgba(99,102,241,0.08)' },
};

const DEFAULT_LIGHT = { a: 'rgba(244,114,182,0.18)', b: 'rgba(99,102,241,0.12)' };
const DEFAULT_DARK  = { a: 'rgba(236,72,153,0.10)', b: 'rgba(99,102,241,0.08)' };

export default function AmbientBackground() {
  const { pathname } = useLocation();
  const { isDark } = useTheme();

  const palette = isDark
    ? (DARK_PALETTE[pathname]  ?? DEFAULT_DARK)
    : (LIGHT_PALETTE[pathname] ?? DEFAULT_LIGHT);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Top-left ambient orb */}
      <div
        className="absolute -left-40 -top-40 h-[680px] w-[680px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${palette.a} 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Bottom-right ambient orb */}
      <div
        className="absolute -bottom-48 -right-48 h-[640px] w-[640px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${palette.b} 0%, transparent 70%)`,
          filter: 'blur(70px)',
        }}
      />
    </div>
  );
}

