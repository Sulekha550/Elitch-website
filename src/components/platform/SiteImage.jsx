import React, { useState, useEffect, useRef } from 'react';

/**
 * Premium SiteImage component.
 *
 * Features:
 * - Lazy loads images via IntersectionObserver (native loading="lazy" fallback).
 * - Smooth fade-in placeholder -> loaded image transition.
 * - Gentle hover zoom on hoverable variants.
 * - Generative blurred LQIP-style placeholder while loading.
 * - Fully accessible: descriptive alt text, role="img", aria-busy state.
 * - Responsive srcset-like behavior via width/height props and Tailwind sizing.
 * - Respects prefers-reduced-motion.
 */
export default function SiteImage({
  src,
  alt,
  caption,
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  rounded = '2xl',
  zoom = false,
  fade = true,
  priority = false,
  className = '',
  wrapperClassName = '',
  style = {},
  onClick,
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  // IntersectionObserver lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setInView(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: '200px', threshold: 0.01 }
      );
      observer.observe(imgRef.current);
      return () => observer.disconnect();
    } else {
      setInView(true);
    }
  }, [priority]);

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    '4xl': 'rounded-[2rem]',
    full: 'rounded-full',
  }[rounded] || 'rounded-2xl';

  return (
    <div
      ref={imgRef}
      className={`
        relative overflow-hidden ${roundedClasses} ${wrapperClassName}
        ${zoom ? 'group hover:scale-[1.03] transition-transform duration-700 ease-out' : ''}
      `}
      style={{ width, height, ...style }}
      role={alt ? 'img' : 'presentation'}
      aria-label={alt || caption}
      aria-busy={!isLoaded && !isError}
    >
      {/* Blurred placeholder background */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-br from-sky-100/70 via-indigo-50/60 to-cyan-50/70
          dark:from-brand-800/80 dark:via-brand-850/80 dark:to-brand-900/80
          transition-opacity duration-500
          ${isLoaded || isError ? 'opacity-0' : 'opacity-100'}
        `}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,240,255,0.18),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(124,58,237,0.18),transparent_60%)]" />
      </div>

      {/* Actual image */}
      {inView && (
        <img
          src={src}
          alt={alt || ''}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchingValue="lazy"
          className={`
            block w-full h-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}
            transition-opacity duration-700 ease-out
            ${fade && !reducedMotion.current ? (isLoaded ? 'opacity-100' : 'opacity-0') : 'opacity-100'}
            ${zoom ? 'group-hover:scale-[1.08] transition-transform duration-700 ease-out' : ''}
            ${isError ? 'hidden' : ''}
          `}
          style={{ height }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
          onClick={onClick}
          {...rest}
        />
      )}

      {/* Fallback state when image fails to load */}
      {isError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-brand-900 text-slate-400 dark:text-slate-500 text-xs font-mono"
          aria-hidden="true"
        >
          <span className="flex flex-col items-center gap-1.5">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span>Visual unavailable</span>
          </span>
        </div>
      )}

      {/* Caption */}
      {caption && (
        <span
          className="absolute bottom-0 left-0 right-0 text-center text-[11px] font-mono text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-brand-950/70 backdrop-blur-sm py-1.5 px-3 truncate"
          aria-hidden="true"
        >
          {caption}
        </span>
      )}
    </div>
  );
}