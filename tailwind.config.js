/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      boxShadow: {
        'solid': '4px 4px 0 0 rgba(23,23,23,0.3)',
      },
    },
  },
  plugins: [],
};
