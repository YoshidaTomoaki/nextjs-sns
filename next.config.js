const path = require("path")

module.exports = {
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "components": path.resolve(__dirname, "./components"),
      "credentials": path.resolve(__dirname, "./credentials"),
      "models": path.resolve(__dirname, "./models"),
      "utill": path.resolve(__dirname, "./utill"),
      "lib": path.resolve(__dirname, "./lib"),
    }
    return config
  }
}
