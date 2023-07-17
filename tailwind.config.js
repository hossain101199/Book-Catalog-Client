/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1565D8",
        secondary: "#183B56",
        tertiary: "#0D2436",
      },
    },
  },
  plugins: [],
};
