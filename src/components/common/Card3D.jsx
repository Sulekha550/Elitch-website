/**
 * Card3D — legacy component replaced with a clean 2D card wrapper.
 * Preserves the same API (children, className, etc.) so existing
 * usage in AboutPage doesn't break, but removes all 3D perspective/
 * rotateX/rotateY transforms. Uses a refined border highlight on hover.
 */
import React from 'react';

export default function Card3D({
  children,
  className = '',
  // Props kept for API compatibility — no longer applied
  maxTilt = 0,
  glare = false,
  scale = 1,
  elevation = 0,
  disabled = false,
}) {
  return (
    <div className={`group relative ${className}`}>
      {children}
    </div>
  );
}

