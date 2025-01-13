/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#36CDCA",
          dark: "#CE8E14"
        },
        secondary: {
          DEFAULT: "#F6BC47"
        },
        "light-gray": {
          DEFAULT: "#B6CAD3",
          dark: "#7D9AA7"
        },
        "medium-gray": {
          DEFAULT: "#284551",
          dark: "#132C36",
        },
        "dark-gray": {
          DEFAULT: "#203741",
        },
        cell: {
          DEFAULT: "#1f3640",
        }
      },
      fontFamily: {
        "space-grotesk": ['Space Grotesk', 'sans-serif']
      }
    },
  },
  plugins: [],
}