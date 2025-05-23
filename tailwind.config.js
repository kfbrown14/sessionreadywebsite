/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  theme: {
    extend: {
      colors: {
        'midnight-blue': 'rgb(0, 18, 51)',
        'accent-blue': 'rgb(161, 228, 242)',
        'accent-green': 'rgb(168, 218, 181)',
        'accent-red': '#ff4600',
        // New nature-themed colors
        sage: {
          light: '#C4D4C0',
          DEFAULT: '#7A9B76',
          dark: '#4A6B46'
        },
        lavender: {
          light: '#E8E0F0',
          DEFAULT: '#B8A3D1',
          dark: '#7A5B9E'
        },
        earth: {
          light: '#D4C3A3',
          DEFAULT: '#8B7355',
          dark: '#5C4A3A'
        },
        mist: '#F5F7FA',
        storm: '#2D3748'
      },
      fontFamily: {
        'google-sans': ['Google Sans Display', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
        'primary': ['Inter', 'sans-serif'],
        'secondary': ['Playfair Display', 'serif']
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 30px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
} 