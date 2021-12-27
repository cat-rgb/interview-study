const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
module.exports = {
    mode: "development",
    entry: './src/_commonjs',
    devtool: "source-map", // development 模式默认是eval
    output: {
        filename: "commonjs.js",
        path: path.resolve(__dirname, './build'),
    },
    plugins: [
        // new CleanWebpackPlugin()
    ]
}