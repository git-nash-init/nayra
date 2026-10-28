/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Couture direction: sharp corners everywhere. Only `full` survives, for the creator avatar.
    borderRadius: {
      none: '0',
      sm: '0',
      DEFAULT: '0',
      md: '0',
      lg: '0',
      xl: '0',
      '2xl': '0',
      '3xl': '0',
      full: '9999px',
    },
    extend: {
      colors: {
        // Warm ivory and onyx replace pure white and pure black
        white: '#f3ece0',
        black: '#0a0806',
        canvas: {
          base: '#0a0806',
          surface: '#12100c',
          elevated: '#1a1611',
          subtle: '#221d16',
        },
        accent: {
          DEFAULT: '#c9a96e',
          light: '#e6d3a3',
          deep: '#8a6a32',
          hover: '#e6d3a3',
          subtle: 'rgba(201, 169, 110, 0.08)',
        },
        muted: {
          light: '#d8cfc0',
          DEFAULT: '#b9b0a2',
          dark: '#8a8174',
        },
        hairline: 'rgba(201, 169, 110, 0.22)',
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'Didot', '"Bodoni 72"', 'serif'],
        sans: ['Jost', '"Futura PT"', 'Futura', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        tight: '-0.01em',
        widest: '0.3em',
        masthead: '0.18em',
      },
      transitionTimingFunction: {
        couture: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        sheen: {
          '0%': { backgroundPosition: '-150% 0' },
          '100%': { backgroundPosition: '250% 0' },
        },
        'letter-in': {
          '0%': { opacity: '0', transform: 'translateY(0.12em)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        sheen: 'sheen 2.8s ease-in-out infinite',
        'letter-in': 'letter-in 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
