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
        love: {
          midnight: '#101323',
          darkPurple: '#21162F',
          secondaryPurple: '#55306F',
          softPink: '#F49AC2',
          pink: '#FF79B7',
          violet: '#8B5CF6',
          deepViolet: '#5125A8',
          gold: '#E9C77B',
          cream: '#FFF4EB',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'Trajan Pro', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'love-glow': '0 0 25px rgba(255, 121, 183, 0.45)',
        'violet-glow': '0 0 25px rgba(139, 92, 246, 0.5)',
        'gold-glow': '0 0 20px rgba(233, 199, 123, 0.4)',
        'card-soft': '0 10px 30px -5px rgba(16, 19, 35, 0.7), 0 0 0 1px rgba(244, 154, 194, 0.15)',
        'card-active': '0 15px 40px -5px rgba(16, 19, 35, 0.9), 0 0 0 1px rgba(255, 121, 183, 0.4), 0 0 25px rgba(255, 121, 183, 0.25)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'staff-sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 8px rgba(255, 121, 183, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(255, 121, 183, 0.8))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
