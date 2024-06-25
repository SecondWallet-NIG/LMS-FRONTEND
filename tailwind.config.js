/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: { xxs: "270px", xs: "350px", ...defaultTheme.screens },
      colors: {
        swGray: "#737373",
        swGrey50: "#EAEAEA",
        swLightGray: "#f5f5f5",
        swBlue: "#2769B3",
        swBlueActiveStateBg: "#E9F0F7",
        swDarkBlue: "#2360A3",
        swDarkBlueOutline: "#1C4B7F",
        swLightBlue: "#1073F4",
        swBrown: "#545454",
        swDarkBlue: "#153A62",
        swGreen: "#17B26A",
        swDarkGreen: "#0D623A",
        swIndicatorYellow: "#F9C00F",
        swIndicatorPink: "#FF00AE",
        swTextColor: "#545454",
        swBlack: "#333333",
        swPurple: "#BB00FF",
        swIndicatorLightRed: "#F04438",
        swDarkRed: "#84251F",
        swIndicatorPurple: "#D154FF",
        swIndicatorDarkRed: "#AA3028",
        swLightBlueIndcatorBg: "#F0F6FE",
        swLightPinkIndcatorBg: "#FFF0FA",
        swLightGreenIndcatorBg: "#F1FDF8",
        swLightPurpleIndcatorBg: "#FBF0FF",
      },
    },
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  plugins: [],
};
