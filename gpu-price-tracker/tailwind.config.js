/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#141414",
        "dark-card": "#222222",
        "dark-border": "#242424",
        "dark-text": "#818181",
      },
    },
  },
  plugins: [],
};
