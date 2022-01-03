const isProduction = true
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const webpack = require("webpack")
const PurgecssWebpackPlugin = require("purgecss-webpack-plugin")
const glob = require("glob")
const resolveApp = require("./paths")
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
    mode: "development", // 改成development 查看代码效果
    // 配置cdn  index.html 引入cdn
    externals: {
        lodash: "_",
        dayjs: "dayjs"
    },
    optimization: {
        usedExports: true, // tree-shaking
        minimize: true, //设置为true minimizer设置才生效
        minimizer: [
            new TerserPlugin({
                extractComments: false, // 把注释单独抽取到一个单独的文件中
                parallel: true,  // true  当前cpu.length -1 多进程并发构建
                terserOptions: {
                    compress: {
                        arguments: true,
                        dead_code: true
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
        new PurgecssWebpackPlugin({
            // 匹配规则
            paths: glob.sync(`${resolveApp("./src/**/*")}`, {nodir: true}),
            safelist: function () {
                return {
                    standard: ["body", "html"]
                }
            } // 表示安全不删除
        }),
        new CompressionPlugin({
            threshold: 0, // 大于这个值才进行压缩
            test: /\.(css|js)$/i,
            minRatio: 0.8, // 最小压缩比例，
            algorithm: "gzip", // 压缩算法
        })
        // new webpack.optimize.ModuleConcatenationPlugin()
    ]
}