/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'paradiso': {
          '10':  '#33cccc',
          '20':  '#a7b7c7',
          '30':  '#ff8080',
          '40':  '#7ed8b4',
          '50':  '#f4f9f9',
          '100': '#daedeb',
          '200': '#b4dbd7',
          '300': '#87c1be',
          '400': '#5ea3a2',
          '500': '#408080',
          '600': '#356a6c',
          '700': '#2d5658',
          '800': '#284647',
          '900': '#243c3d',
          '930': '#112022',
          '950': '#091213',
        },
      }
    },
  },
  plugins: [],

}

