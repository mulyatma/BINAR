module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "standard",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "comma-dangle": 0,
    quotes: 0,
    semi: 0,
    "no-trailing-spaces": 0,
    "space-before-function-paren": 0,
    "space-infix-ops": 0,
    eqeqeq: 0,
    curly: 0,
    "array-bracket-spacing": 0,
    "prefer-const": 0,
    "no-extra-boolean-cast": 0,
    "no-undef": 0,
    "n/no-path-concat": 0,
    "no-unused-vars": 0,
  },
};
