/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: { xxs: "270px", xs: "350px", ...defaultTheme.screens },
      colors: {
        swGray: "#BEBEBE",
        swLightGray: "#f5f5f5",
        swBlue: "#2769B3",
      },
    },
  },
  plugins: [],
};
