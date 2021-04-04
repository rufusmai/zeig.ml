const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        cyan: colors.cyan,
        lightBlue: colors.lightBlue
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    //require('@tailwindcss/forms')
  ],
}
