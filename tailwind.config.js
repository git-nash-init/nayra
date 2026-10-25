/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          base: '#0a0a0a',
          surface: '#141414',
          elevated: '#1a1a1a',
          subtle: '#222222',
        },
        accent: {
          DEFAULT: '#ff4925',
          hover: '#bd2608',
          glow: 'rgba(255, 73, 37, 0.25)',
          subtle: 'rgba(255, 73, 37, 0.08)',
        },
        muted: {
          light: '#cacaca',
          DEFAULT: '#8f8f8f',
          dark: '#555555',
        },
        hairline: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.06em',
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.12em',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
