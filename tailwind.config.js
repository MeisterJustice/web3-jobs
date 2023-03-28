/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "60vh": "60vh",
        "70vh": "70vh",
      },
      width: {
        "60%": "60%",
      },
    },
  },
  plugins: [],
};
