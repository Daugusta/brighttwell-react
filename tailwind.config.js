/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  //  "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#0075bf',
      },
      gradientColorStops: {
        'primary-start': '##005689',
        'primary-end': '##0075bf',
      },
    },
  },
  plugins: [],
}