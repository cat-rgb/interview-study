const isProduction = true
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const webpack = require("webpack")
module.exports = {
    mode: "production",
    // 配置cdn  index.html 引入cdn
    externals: {
        lodash: "_",
        dayjs: "dayjs"
    },
    optimization: {
        minimize: true, //设置为true minimizer设置才生效
        minimizer: [
            new TerserPlugin({
                extractComments: false, // 把注释单独抽取到一个单独的文件中
                parallel: true,  // true  当前cpu.length -1 多进程并发构建
                terserOptions: {
                    compress: {
                        arguments: true
                    },
                    mangle: true,
                    toplevel: true,
                    keep_classnames: false,
                    keep_fnames: false
                }
            })
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:6].css"
        }), // 将css单独抽离
        new CssMinimizerWebpackPlugin(), // 压缩css
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}