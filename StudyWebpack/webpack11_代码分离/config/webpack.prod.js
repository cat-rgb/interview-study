const isProduction = true
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    mode: "production",
    // 配置cdn  index.html 引入cdn
    externals: {
        lodash: "_",
        dayjs: "dayjs"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:6].css"
        })
    ]
}