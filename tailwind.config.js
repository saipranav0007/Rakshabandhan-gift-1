/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#060608',
          900: '#0b0b10',
          850: '#101017',
          800: '#171722',
        },
        festive: {
          gold: '#f59e0b',
          amber: '#fbbf24',
          crimson: '#e11d48',
          rose: '#f43f5e',
          ruby: '#9f1239',
          cream: '#fef3c7',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'serif'],
        handwritten: ['"Caveat"', '"Dancing Script"', 'cursive'],
        script: ['"Marck Script"', '"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'flicker': 'diyaFlicker 2.5s infinite alternate',
        'shimmer': 'shimmer 2.5s infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        diyaFlicker: {
          '0%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.9' },
          '20%': { transform: 'scale(1.08, 0.95) rotate(1deg)', opacity: '1' },
          '40%': { transform: 'scale(0.95, 1.05) rotate(-2deg)', opacity: '0.85' },
          '60%': { transform: 'scale(1.04, 0.98) rotate(2deg)', opacity: '0.95' },
          '80%': { transform: 'scale(0.98, 1.02) rotate(-1deg)', opacity: '0.9' },
          '100%': { transform: 'scale(1.05, 0.97) rotate(1deg)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
