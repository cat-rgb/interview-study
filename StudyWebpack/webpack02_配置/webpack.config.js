const path = require('path')

module.exports = {
    mode: "production",
    entry: './src/main',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './build')
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
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "img/[name].[hash:6].[ext]",
                            limit: 100 * 1024
                        }
                    }
                ]
                // use: [{
                //   loader: "file-loader",
                //     options: {
                //       name: "img/[name].[hash:6].[ext]",
                //         // outputPath: "img" 指定输出目录
                //     }
                // }]
            }
        ]
    }
}