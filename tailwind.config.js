const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
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
      },
      maxWidth: {
        screen: '100vw',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
