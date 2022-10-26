/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'sand': '#e8e5da',
      },
      fontFamily: {
        hackyd: ["Hacky Demo", "serif"],
      },
    },
  },
  plugins: [],
};
