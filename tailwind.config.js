
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'library-dark': '#1a120b',
        'library-wood': '#3c2a21',
        'library-light': '#d5cea3',
        'library-accent': '#e5e5cb',
      },
      fontFamily: {
        'serif': ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
}
  
