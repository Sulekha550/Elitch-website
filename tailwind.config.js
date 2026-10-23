/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#050811',
          900: '#070C18',
          850: '#0D1527',
          800: '#111C33',
          700: '#1A294A',
          600: '#263B66',
          500: '#38538A',
        },
        navy: {
          950: '#050A18',
          900: '#0B132B',
          800: '#0F172A',
          700: '#1E293B',
          600: '#334155',
          500: '#475569',
        },
        surface: {
          light: '#FAFBFF',
          sky: '#EAF4FF',
          lavender: '#F1EDFF',
          mint: '#E6F7F5',
        },
        accent: {
          cyan: '#0284C7',
          'cyan-bright': '#06B6D4',
          teal: '#0D9488',
          'teal-dark': '#0F766E',
          electric: '#0EA5E9',
          blue: '#2563EB',
          indigo: '#4F46E5',
          violet: '#7C3AED',
          amber: '#F59E0B',
          emerald: '#10B981',
          coral: '#F43F5E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-dots': "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'status-pulse': 'statusPulse 2.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        statusPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)',
        'card-hover': '0 4px 12px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04)',
        'card-xl': '0 8px 24px rgba(15,23,42,0.08), 0 4px 8px rgba(15,23,42,0.04)',
        'btn': '0 1px 3px rgba(2,132,199,0.25)',
        'btn-hover': '0 4px 12px rgba(2,132,199,0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
