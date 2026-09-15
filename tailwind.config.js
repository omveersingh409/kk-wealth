/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#07101E', // Darkest background
          800: '#0B192C', // Card background
          700: '#142742', // Lighter card background
          600: '#1e385e', 
        },
        brand: {
          green: '#10B981', // Emerald 500 for upward trends/success
          blue: '#3B82F6',  // Blue 500 for general accents
          red: '#EF4444',   // Red 500 for downward trends/stops
        },
        text: {
          main: '#F8FAFC',  // Slate 50
          muted: '#94A3B8', // Slate 400
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
