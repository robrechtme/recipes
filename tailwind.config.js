module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        primary: {
          500: "#FBD791",
          800: "#77674D",
        },
        secondary: {
          100: "#F8FAFB",
          500: "#6F717E",
          900: "#041339",
        },
        gray: {},
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
