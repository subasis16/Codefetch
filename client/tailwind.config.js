/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ossium: {
          dark: '#0a0a0a',
          darker: '#050505',
          card: '#121212',
          text: '#f5f5f5',
          muted: '#a1a1aa',
          accent: '#f9fafb', // Grey accent
          'accent-hover': '#e5e7eb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
