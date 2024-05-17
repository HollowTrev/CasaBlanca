/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      phone: "412px", // => @media (min-width: 412px)
      tablet: "576px", // => @media (min-width: 576px)
      laptop: "960px", // => @media (min-width: 960px)
      desktop: "1480px", // => @media (min-width: 1280px)
    },
    backgroundImage: {
      ImageBg: "url('./assets/images/image_2.jpg')",
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#A11E22",
          secondary: "#1D1E23",
          accent: "#E5E4DA",
          neutral: "#1B1A1A",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
