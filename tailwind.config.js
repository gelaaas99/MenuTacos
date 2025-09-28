/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        'light': '0 4px 6px rgba(255, 248, 240, 0.1)', // sombra clara para modo oscuro
      }
    },
  },
  plugins: [],
}

