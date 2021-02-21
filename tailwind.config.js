const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false,
  theme: {
    extend: {
      outline: {
        blue: ["2px solid #0000ff", "-2px"],
      },
    },
  },
  variants: {
    extend: {
      outline: ["focus-visible"],
    },
  },
  plugins: [],
};
