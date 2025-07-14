/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 4s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },

  plugins: [],
}
