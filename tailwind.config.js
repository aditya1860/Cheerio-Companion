/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A7B6B',
          light: '#0E9E89',
          dark: '#065f52',
        },
        accent: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
        },
        surface: {
          DEFAULT: '#F8FAF9',
          card: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E2EAE8',
        },
        text: {
          primary: '#1A2E2B',
          secondary: '#4B6B66',
          muted: '#7A9A96',
        },
        error: {
          DEFAULT: '#DC2626',
          light: '#FEF2F2',
        },
        success: {
          DEFAULT: '#16A34A',
          light: '#F0FDF4',
        },
        warning: {
          DEFAULT: '#D97706',
          light: '#FFFBEB',
        },
        info: {
          DEFAULT: '#0369A1',
          light: '#EFF6FF',
        },
      },
      fontFamily: {
        base: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.08)',
        md: '0 4px 16px rgba(0,0,0,0.10)',
        lg: '0 8px 32px rgba(0,0,0,0.12)',
        guide: '0 16px 48px rgba(10,123,107,0.18)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      width: {
        guide: '420px',
      },
      minHeight: {
        tap: '44px',
      },
      animation: {
        'pulse-dot': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-dot': 'bounce 1s infinite',
        'fade-in': 'fadeIn 200ms ease',
        'slide-up': 'slideUp 300ms ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
