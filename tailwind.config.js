/* eslint-env node */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        DEFAULT: '#F3F3F4',
      },
      primary: {
        DEFAULT: '#F94943',
      },
      secondary: {
        DEFAULT: '#43f94f',
      },
      gray: {
        darker: '#1A1A19',
        dark: '#3f3d3b',
        DEFAULT: '#7f7f7f',
      },
      black: {
        DEFAULT: '#151414',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Poppins', 'sans-serif'],
    },
  },

  plugins: [],
};
