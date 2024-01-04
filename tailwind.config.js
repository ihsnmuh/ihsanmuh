/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
        secondary: ['var(--font-poppins)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
          950: 'rgb(var(--tw-color-primary-950) / <alpha-value>)',
        },
      },
      animation: {
        gradient: 'gradient 5s ease infinite',
        wave: 'wave 2.5s infinite',
      },
      keyframes: {
        gradient: {
          '0%': {
            'background-position': '0% 05%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
        wave: {
          '0%': {
            transform: 'rotate(0.0deg)',
          },
          '10%': {
            transform: 'rotate(14.0deg)',
          },
          '20%': {
            transform: 'rotate(-8.0deg)',
          },
          '30%': {
            transform: 'rotate(14.0deg)',
          },
          '40%': {
            transform: 'rotate(-4.0deg)',
          },
          '50%': {
            transform: 'rotate(10.0deg)',
          },
          '60%': {
            transform: 'rotate(0.0deg)',
          },
          '100%': {
            transform: 'rotate(0.0deg)',
          },
        },
      },
    },
  },
  plugins: [],
};
