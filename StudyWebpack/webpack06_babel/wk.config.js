const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
module.exports = {
    mode: "development",
    entry: './src/react_main.jsx',
    devtool: "inline-nosources-cheap-module-source-map", // development 模式默认是eval
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, './build'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/, // 排除打包编译
                use: [{
                    loader: "babel-loader",
                    // options: {
                    //     presets: ["@babel/preset-env"],
                    //     // plugins: ["@babel/plugin-transform-arrow-functions",
                    //     // "@babel/plugin-transform-block-scoping"
                    //     // ]
                    // }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
