const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
module.exports = {
    mode: "development",
    entry: './src/main.js',
    devtool: "inline-nosources-cheap-module-source-map", // development 模式默认是eval
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, './build'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
