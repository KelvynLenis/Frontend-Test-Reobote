/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Work Sans', 'sans-serif'],
      },
      colors: {
        primary: '#005079',
        background: '#D8DEE8',
      },
    },
  },
  plugins: [],
}
