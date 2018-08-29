module.exports = {
  extends: [
    "airbnb-base",
    "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["import", "jest"],
  env: {
    node: true,
    "jest/globals": true
  }
};
