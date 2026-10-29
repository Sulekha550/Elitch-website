import React, { useState, useEffect, useRef } from 'react';

// Data points defining the organic compounding growth curve
// Coordinates in SVG viewBox: 0 0 600 350 (Baseline y = 295)
const DATA_POINTS = [
  { x: 45, y: 275, delay: 0.05, label: 'Baseline', value: 'Q1' },
  { x: 115, y: 240, delay: 0.39, label: 'Early Traction', value: 'Phase 1' },
  { x: 185, y: 255, delay: 0.75, label: 'Calibration', value: 'Phase 2' },
  { x: 255, y: 205, delay: 1.18, label: 'Panel Expansion', value: 'Phase 3' },
  { x: 325, y: 185, delay: 1.54, label: 'Enterprise Scaling', value: 'Phase 4' },
  { x: 400, y: 145, delay: 1.96, label: 'Global Reach', value: 'Phase 5' },
  { x: 475, y: 120, delay: 2.36, label: 'Market Leadership', value: 'Phase 6' },
  { x: 555, y: 80, delay: 2.80, label: 'Peak Reach', value: 'Scale' }
];

// Vertical glowing bars that build from bottom baseline
const BARS = [
  { id: 'b0', x: 68, width: 22, height: 50, y: 245, delay: 0.10 },
  { id: 'b1', x: 128, width: 22, height: 75, y: 220, delay: 0.25 },
  { id: 'b2', x: 188, width: 22, height: 65, y: 230, delay: 0.40 },
  { id: 'b3', x: 248, width: 22, height: 110, y: 185, delay: 0.55 },
  { id: 'b4', x: 308, width: 22, height: 135, y: 160, delay: 0.70 },
  { id: 'b5', x: 368, width: 22, height: 170, y: 125, delay: 0.85 },
  { id: 'b6', x: 428, width: 22, height: 200, y: 95, delay: 1.00 },
  { id: 'b7', x: 488, width: 22, height: 235, y: 60, delay: 1.15 }
];

// Calculated Catmull-Rom smooth spline path string
const LINE_PATH_D = 'M 45 275 C 56.7 269.2, 91.7 243.3, 115 240 C 138.3 236.7, 161.7 260.8, 185 255 C 208.3 249.2, 231.7 216.7, 255 205 C 278.3 193.3, 300.8 195.0, 325 185 C 349.2 175.0, 375.0 155.8, 400 145 C 425.0 134.2, 449.2 130.8, 475 120 C 500.8 109.2, 541.7 86.7, 555 80';

export default function GrowthAnalyticsChart() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [exactLength, setExactLength] = useState(565);
  const [activePoint, setActivePoint] = useState(null);

  useEffect(() => {
    // Measure exact SVG path length dynamically
    if (pathRef.current) {
      try {
        const measured = pathRef.current.getTotalLength();
        if (measured > 0) {
          setExactLength(measured);
        }
      } catch (e) {
        // Fallback to pre-calculated length 565
      }
    }

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setHasAnimated(true);
        return;
      }
    }

    // IntersectionObserver triggers animation when ~25% visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasAnimated(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-transparent border-0 shadow-none transition-all duration-500"
    >
      {/* Top Header Overlay: Subtle website-related text & verified panel tag */}
      <div className="relative z-20 flex items-center justify-between p-4 sm:p-5 md:p-6 pb-2">
        {/* Left: Subtle website-related branding text */}
        <div className="flex flex-col">
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            Enterprise Intelligence
          </span>
          <p className="text-xs sm:text-sm font-display font-semibold text-slate-700 dark:text-slate-200">
            Authentic Data &amp; Growth Insights
          </p>
        </div>

        {/* Right: 5M+ Panel badge */}
        <div className="flex items-center gap-2 bg-pink-500/10 dark:bg-pink-500/20 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-xl border border-pink-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-600" />
          </span>
          <span className="text-xs sm:text-sm font-display font-bold text-slate-800 dark:text-white">
            5M+ Panel
          </span>
          <span className="hidden sm:inline text-[10px] font-mono text-pink-600 dark:text-pink-400 uppercase tracking-wider font-semibold">
            Verified
          </span>
        </div>
      </div>

      {/* Responsive Animated SVG Chart Canvas */}
      <div className="relative w-full px-2 sm:px-4 pb-3 sm:pb-5">
        <svg
          viewBox="0 0 600 350"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto block select-none overflow-visible"
        >
          <defs>
            {/* Crisp glowing bar gradient (vibrant pink to rose) */}
            <linearGradient id="growthBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#e11d48" stopOpacity="0.80" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0.40" />
            </linearGradient>

            {/* Top highlight cap gradient for bars */}
            <linearGradient id="barCapGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>

          {/* Background Grid Lines (Clean and crisp) */}
          <g stroke="rgba(219, 39, 119, 0.12)" strokeDasharray="4 6" strokeWidth="1">
            <line x1="45" y1="90" x2="560" y2="90" />
            <line x1="45" y1="140" x2="560" y2="140" />
            <line x1="45" y1="190" x2="560" y2="190" />
            <line x1="45" y1="240" x2="560" y2="240" />
          </g>

          {/* Vertical Bars (Clean crisp geometry with NO blur / drop-shadow) */}
          <g>
            {BARS.map((bar) => (
              <g
                key={bar.id}
                style={{
                  transform: hasAnimated ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: `${bar.x + bar.width / 2}px 295px`,
                  transition: hasAnimated
                    ? `transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${bar.delay}s, opacity 0.8s ease-out ${bar.delay}s`
                    : 'none',
                  opacity: hasAnimated ? 1 : 0
                }}
              >
                {/* Main bar body */}
                <rect
                  x={bar.x}
                  y={bar.y}
                  width={bar.width}
                  height={bar.height}
                  rx="6"
                  fill="url(#growthBarGrad)"
                />
                {/* Glowing top cap */}
                <rect
                  x={bar.x + 1}
                  y={bar.y}
                  width={bar.width - 2}
                  height="3"
                  rx="1.5"
                  fill="url(#barCapGrad)"
                  opacity="0.95"
                />
              </g>
            ))}
          </g>

          {/* 
            Hidden Path Reference for exact length measurement
          */}
          <path
            ref={pathRef}
            d={LINE_PATH_D}
            fill="none"
            stroke="transparent"
            strokeWidth="1"
          />

          {/* Outer pink border behind the white line for clean definition */}
          <path
            d={LINE_PATH_D}
            fill="none"
            stroke="#be185d"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
            style={{
              strokeDasharray: exactLength,
              strokeDashoffset: hasAnimated ? 0 : exactLength,
              transition: hasAnimated
                ? 'stroke-dashoffset 2.8s cubic-bezier(0.25, 1, 0.4, 1)'
                : 'none'
            }}
          />

          {/* Main Crisp White Growth Line */}
          <path
            d={LINE_PATH_D}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: exactLength,
              strokeDashoffset: hasAnimated ? 0 : exactLength,
              transition: hasAnimated
                ? 'stroke-dashoffset 2.8s cubic-bezier(0.25, 1, 0.4, 1)'
                : 'none'
            }}
          />

          {/* Small Glowing White Circular Points Along The Line */}
          {DATA_POINTS.map((pt, i) => {
            const isLast = i === DATA_POINTS.length - 1;
            const isHovered = activePoint === i;

            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setActivePoint(i)}
                onMouseLeave={() => setActivePoint(null)}
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'scale(1)' : 'scale(0)',
                  transformOrigin: `${pt.x}px ${pt.y}px`,
                  transition: hasAnimated
                    ? `transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${pt.delay}s, opacity 0.3s ease-out ${pt.delay}s`
                    : 'none'
                }}
              >
                {/* Outer ring */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 10 : 7}
                  fill="none"
                  stroke="#db2777"
                  strokeWidth="1.5"
                  opacity="0.5"
                  className="transition-all duration-300"
                />

                {/* Inner white circular point with vibrant pink rim */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5.5 : 4}
                  fill="#FFFFFF"
                  stroke="#db2777"
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                />

                {/* Continuous Pulsing Ping for the final top-right destination */}
                {isLast && hasAnimated && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="8"
                    fill="none"
                    stroke="#db2777"
                    strokeWidth="2"
                    className="animate-ping"
                    style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
                  />
                )}

                {/* Hover / Active Tooltip for Point */}
                {isHovered && (
                  <g
                    transform={`translate(${pt.x}, ${pt.y - 18})`}
                    className="pointer-events-none transition-all duration-300"
                  >
                    <rect
                      x="-32"
                      y="-22"
                      width="64"
                      height="20"
                      rx="6"
                      fill="#ffffff"
                      stroke="#db2777"
                      strokeWidth="1.2"
                    />
                    <text
                      x="0"
                      y="-8"
                      textAnchor="middle"
                      fill="#be185d"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      {pt.value}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
