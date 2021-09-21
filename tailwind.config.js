module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light-blue': '#67cce9',
        'brand-gray': '#39383a',
        'hover-gray': '#a3a5a8',
      },
    },
  },
  variants: {
    extend: {},
    display: ['group-hover'],
    visibility: ['group-hover'],
  },
  plugins: [],
}
