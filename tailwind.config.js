// tailwind.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    container: {
      center: true, // даст mx-auto
      padding: {
        DEFAULT: '0',     // мобилки
        // sm: '0',           // ≥ 640px
        // md: '10rem',           // ≥ 768px
        lg: '10rem',           // ≥ 1024px
        // xl: '20rem',           // ≥ 1280px
        '2xl': '8rem',        // ≥ 1536px (большие экраны, телевизоры
      },
    },
    extend: {
      colors: {
        colorPrimary: "#EAF6F3",
        colorBg: "#ffeded",
        'color-text': '#174142',
        'color-icons': '#67A799',
        'color-action': '#55A630',
      },
      fontFamily: {
        main: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
