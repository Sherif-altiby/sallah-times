// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
      colors:{
        primary: '#7AB2B2',
        secondary: "#EEF7FF",
        tColor: "#4D869C",
        bgTime: "#CDE8E5"
      }
    },
  },
  plugins: [],
};
