module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false,
  theme: {
    extend: {
      outline: {
        blue: ["2px solid #0000ff", "-2px"],
      },
      letterSpacing: {
        widest2: ".5em",
      },
    },
  },
  variants: {
    extend: {
      outline: ["focus-visible"],
      display: ["group-hover"],
    },
  },
  plugins: [],
};
