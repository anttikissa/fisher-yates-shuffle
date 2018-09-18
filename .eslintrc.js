module.exports = {
  env: {
    browser: false,
    es6: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  globals: {
    module: true
  },
  rules: {
    indent: ["error", "tab"],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "never"],
    "no-empty": ["off"],
    "no-console": ["off"]
  }
};
