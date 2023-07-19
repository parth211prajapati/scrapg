/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: "#4A9CBF",
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight: false,
  },
}

