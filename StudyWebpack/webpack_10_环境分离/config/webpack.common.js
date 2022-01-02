const resolveApp = require("./paths")

const {merge} = require("webpack-merge")
const dev = require("./webpack.dev")
const prod = require("./webpack.prod")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const commitConfig = {
    // 绝对路径
    // context: path.resolve(__dirname, "../"),  // 设置上下文环境  设置到config一级目录
    entry: "./src/main.js",
    output: {
        filename: '[name].[hash:6].js',
        path: resolveApp('./build')
    },
    resolve: {
        extensions: ['wasm', '.mjs', 'js', 'json', 'jsx', 'ts', 'vue'], // 扩展名查找顺序
        alias: {
            "@": resolveApp("./src"),
            // "views": resolveApp("./src/views")
        }
    },
    module: {
        rules: [
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
            template: "./index.html"
        }),
        new VueLoaderPlugin()
    ]
}

module.exports = function (env) {

    const isProduction = env.production
    // babel.config.js 无法获取到环境变量 在这里设置让babel配置文件访问
    process.env.production = isProduction ? 'production' : 'development'
    console.log(isProduction)
    const config = isProduction ? prod : dev
    const mergeConfig = merge(config, commitConfig)
    console.log(mergeConfig)
    return mergeConfig
}