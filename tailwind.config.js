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
        // Brand color system
        primary: {
          light: '#4A8FA3',
          DEFAULT: '#174b5f',
          dark: '#0F3A4A'
        },
        secondary: {
          light: '#5CC4D4',
          DEFAULT: '#10a6bf',
          dark: '#0C7A8E'
        },
        accent: {
          light: '#B8E86D',
          DEFAULT: '#9dde40',
          dark: '#7AC22F'
        },
        neutral: {
          light: '#F5F5F5',
          DEFAULT: '#ffffff',
          dark: '#2f2d2e'
        },
        // Keep accent-red for mic button (specialized use)
        'accent-red': '#ff4600'
      },
      fontFamily: {
        'primary': ['Source Sans Pro', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 30px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
} 