/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-55': 'rgba(0, 0, 0, 0.55)',
        
      },
      fontFamily: {
        menlo: ['Menlo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
