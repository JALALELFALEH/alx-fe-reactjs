// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // We're using JS/JSX, not TS/TSX.
  ],
  theme: {
    extend: {
      // We'll add custom colors, fonts, etc., here later.
      // This is where you rebel against the default theme.
      colors: {
        'primary': '#10b981', // A tasty emerald green
        'primary-dark': '#059669',
        'secondary': '#f59e0b', // An appetizing amber
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'], // Modern font stack
      },
    },
  },
  plugins: [],
}