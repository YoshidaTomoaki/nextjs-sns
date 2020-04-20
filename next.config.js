const path = require("path")

module.exports = {
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "components": path.resolve(__dirname, "./components"),
      "credentials": path.resolve(__dirname, "./credentials"),
      "utill": path.resolve(__dirname, "./utill")
    }
    return config
  }
}
