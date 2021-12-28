const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
module.exports = {
    mode: "development",
    entry: './src/_cjs_es',
    devtool: "source-map", // development 模式默认是eval
    output: {
        filename: "_cjs_es.js",
        path: path.resolve(__dirname, './build'),
    },
    plugins: [
        // new CleanWebpackPlugin()
    ]
}
