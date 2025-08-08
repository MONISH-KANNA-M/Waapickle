/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f0e6df',
        primary: '#a47b68',
        accent: '#c4a797',
        dark: '#6d4c41',
        hover: '#8d6e63',
        light: '#fffaf7',
      },
      fontFamily: {
        heading: ['Lora', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};