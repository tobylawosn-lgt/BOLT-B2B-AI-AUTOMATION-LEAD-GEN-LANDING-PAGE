/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          950: '#08090b',
          900: '#0c0e12',
          850: '#101318',
          800: '#151921',
          700: '#1c2128',
          600: '#272d37',
          500: '#3a4150',
        },
        signal: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        fadeIn: 'fadeIn 0.5s ease forwards',
        scanLine: 'scanLine 4s ease-in-out infinite',
        pulseDot: 'pulseDot 2.5s ease-in-out infinite',
        blink: 'blink 1.5s steps(2) infinite',
        countGlow: 'countGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px) blur(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0) blur(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scanLine: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.3' },
          '50%': { transform: 'translateY(180px)', opacity: '0.8' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 8px rgba(52,211,153,0.6)' },
          '50%': { opacity: '0.4', boxShadow: '0 0 4px rgba(52,211,153,0.3)' },
        },
        blink: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        countGlow: {
          '0%, 100%': { textShadow: '0 0 20px rgba(52,211,153,0.2)' },
          '50%': { textShadow: '0 0 30px rgba(52,211,153,0.4)' },
        },
      },
    },
  },
  plugins: [],
};
