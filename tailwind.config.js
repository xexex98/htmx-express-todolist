/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.{pug, html}'],
  theme: {
    extend: {
      theme: {
        width: {
          '1of2': '50%',
          '1of4': '25%',
        },
      },
    },
  },
  plugins: [],
};
