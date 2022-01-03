const path = require("path")
const {resolve} = require("../webpack.config");

const appDir = process.cwd()
const resolveApp = (relativePath) => path.resolve(appDir, relativePath)

module.exports = resolveApp