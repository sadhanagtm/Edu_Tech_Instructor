/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      height:{
        '100':"28rem",
        '105':"40rem",
        "110":"50rem"
      },
      backgroundColor:{
        'primary':"#04413D",
        "secondary":"#798F85",
        "ternary":"#68428A",
        "poly":"#440786",
        "light":"#175150",
      },

      width:{
   '100':"28rem",
   '120':"30rem"
      }
    },

   
  },
  plugins: [],
}

