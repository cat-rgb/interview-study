const path = require('path')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {DefinePlugin} = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: './src/main',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './build'),
        // assetModuleFilename: "img/[name].[hash:6][ext]"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // loader: "css-loader" 简写
                // 加载loader 从上到下 从右到左
                use: [
                    'style-loader',
                    // "css-loader",
                    {
                        loader: "css-loader",
                        options: {
                            // 嵌套引入css时，对内部css重新使用postcss处理
                            importLoaders: 1
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                // type: "asset/resouce", // file-loader的效果
                // generator: {
                //   filename: "img/[name].[hash:6][ext]" // [ext] = .(jpg) 自动带点
                // }
                // type: "asset/inline", // file-loader的效果
                type: "asset", // file-loader的效果
                generator: {
                    filename: "img/[name].[hash:6][ext]" // [ext] = .(jpg) 自动带点
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 1024 * 100
                    }
                }
            },
            {
                test: /\.ttf|eot|woff2?$/i,
                type: "asset/resource",
                generator: {
                    filename: "font/[name].[hash:6][ext]"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "test title",
            template: "./index.html" // 设置入口模板
        }),
        new DefinePlugin({
            BASE_URL: "'./'" // webpack全局变量
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "webpack.config.js", // 从哪里复制  "public"
                    globOptions: {
                        ignore: [
                            "**/index.html",
                            "**/.DS_Store" // mac相关
                        ]
                    }
                }
            ]
        })
    ]
}