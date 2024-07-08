/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      lato: ["Lato", "sans-serif"],
      pop: ["Poppins", "sans-serif"],
      con: ["Convergence", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "rgb(53, 44, 128)",
        secondary: "rgb(141, 48, 58)",
        light: "rgb(106, 106, 106)",
        borde: "rgb(202,202,202)",
        placeholderText: "#B3B3B3",
        gray: "#616161",
        textPri: "#4D4A4A",
        textSecondary: "#151515"
      },
    },
  },
  plugins: [],
};