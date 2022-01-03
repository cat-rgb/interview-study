const resolveApp = require("./paths")
const {merge} = require("webpack-merge")
const dev = require("./webpack.dev")
const prod = require("./webpack.prod")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
let isProduction = false

const commitConfig = (isProduction) => {
    return {
        // 绝对路径
        // context: path.resolve(__dirname, "../"),  // 设置上下文环境  设置到config一级目录
        entry: "./src/main",
        output: {
            filename: '[name].[hash:6].js',
            path: resolveApp('./build'),
            chunkFilename: "[name].chunk.js",  // 针对chunk的名字
            libraryTarget: "umd", // 库打包方式
            library: "mylib_utils",
            globalObject: "slef" // this self
            // publicPath: "https://coderwhy.com/cdn" //cdn地址  将打包的后的资源统一加上src = "cdn"
        },

        resolve: {
            mainFields: ["browser", "module", "main"], // 默认 从npm包总导入模块 在pack.json中使用哪个字段导入模块
            extensions: ['wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.vue'], // 扩展名查找顺序
            alias: {
                "@": resolveApp("./src"),
                // "views": resolveApp("./src/views")
            }
        },

        optimization: {
            // 生成chunk算法
            chunkIds: "deterministic",  // natural 自然数  named   deterministic  生成id
            minimizer: [
                new TerserPlugin({
                    extractComments: false
                })
            ],
            splitChunks: {
                // async  异步导入处理    initial  同步导入处理    all
                chunks: "all",
                minSize: 0, // 默认值20000  最小尺寸 拆分出来最小的包是20000
                // maxSize: 30000, // 将大于maxSize的包拆分成不小于minSize的包
                minChunks: 2, // 最少导入的包的次数
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        filename: "[id]_vendors.js", // 可变名字
                        // name: "verdor_chunks", // 固定的名字
                        priority: -10 // 权重优先级
                    },
                    default: {
                        minChunks: 2,
                        filename: "common_[id].js",
                        priority: -10
                    }
                } // 缓存组
            },
            // true/ multiple  / single  / object {}
            // runtime 运行时import加载的文件
            runtimeChunk: {
                // name: "runtime-why"
                name: function (entry) {
                    return `why-${entry}`
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        "css-loader"
                    ],
                    sideEffects: true
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader"
                        }
                    ]
                },
                {
                    test: /\.vue?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "vue-loader"
                        }
                    ]
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./index.html",
                inject: true, // 注入静态资源到html "body"  注入到body中
                cache: true, // 当文件没发生改变使用之前的缓存
                minify: isProduction ? {
                    removeComments: true, // 是否移除注释
                    removeRedundantAttributes: true, // 是否移除多余的属性
                    removeEmptyAttributes: true, // 是否移除空属性
                } : false
            }),
            new VueLoaderPlugin()
        ]
    }
}

module.exports = function (env) {

    isProduction = env.production
    // babel.config.js 无法获取到环境变量 在这里设置让babel配置文件访问
    process.env.production = isProduction ? 'production' : 'development'
    console.log(isProduction)
    const config = isProduction ? prod : dev
    const mergeConfig = merge(config, commitConfig(isProduction))
    console.log(mergeConfig)
    return mergeConfig
}