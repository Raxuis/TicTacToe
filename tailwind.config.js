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
        gray: {
          dark: {
            DEFAULT: "#203741",
          },
          light: {
            DEFAULT: "#B6CAD3",
            dark: "#7D9AA7"
          },
          medium: {
            DEFAULT: "#284551",
            dark: "#132C36",
          }
        },
        cell: {
          DEFAULT: "#1f3640",
        }
      },
      fontFamily: {
        "space-grotesk": ['Space Grotesk', 'sans-serif']
      },
      boxShadow: {
        buttonSecondary: '0px 4px 0px 0px #CE8E14',
        buttonGreyLight: '0px 4px 0px 0px #7D9AA7',
        buttonGrey: '0px 4px 0px 0px #132C36',
        cellGreyShadow: '0px 7px 0px 0px #132C36'
      }
    },
  },
  plugins: [require('daisyui'),],
}