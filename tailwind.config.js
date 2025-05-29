/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF4C60', // Buttons, accents
        background: '#1B1B2F', // Main background
        text: '#EAEAEA', // Primary text
        secondary: '#A0A0A0', // Secondary text
        card: '#2A2A4A', // Card background
      },
    },
  },
  plugins: [],
};