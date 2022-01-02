const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
module.exports = {
    mode: "development",
    entry: './src/main',
    devtool: "source-map", // development 模式默认是eval
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, './build'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: "babel-loader"
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
