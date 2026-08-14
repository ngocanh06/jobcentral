/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2170e4',
          50: '#eff4ff',
          100: '#dbe1ff',
          500: '#2170e4',
          600: '#185fc7',
          700: '#0052cc',
        },
        brandDark: '#0d1c2f',
        brandLight: '#faf9ff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
