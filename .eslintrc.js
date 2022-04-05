module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  extends: ["standard", "plugin:prettier/recommended", "plugin:node/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  overrides: [
    {
      files: ["hardhat.config.js"],
      globals: { task: true },
    },
  ],
  "prettier/prettier": ["error", { singleQuote: true, parser: "flow" }],
}
