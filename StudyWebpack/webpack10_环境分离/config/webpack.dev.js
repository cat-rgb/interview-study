const isProduction = false
// const  ReactReFreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin") ;

module.exports = {
    mode: "development",
    devServer: {
        hot: true,
        // hotOnly: true, // 只更新修改的模块
        // host: "0.0.0.0", // 0.0.0.0监听ipv4上的所有地址
        // port: "8080",
        open: false,
        // compress: true, // 压缩相关
        proxy: { // 代理
            '/api': {
                target: "http://localhost:3000",
                secure: false, // 默认不支持https 设置成false不去验证
                changeOrigin: true, // 修改origin来源
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        // historyApiFallback: true,
        // historyApiFallback: {
        //     rewrites: [
        //         {
        //             form: /abc/, to: 'view.html'
        //         }
        //     ]
        // }, // history模式匹配路由重定向到html文件
        // publicPath: "./",  // 开环环境下
        // contentBase: path.resolve(__dirname, "./public"), // 依赖其他资源的路径  index.html -> script src="./abc/abc.js"
        // 建议使用绝对路径
        // watchContentBase: true,  监听contentbase中的资源发生变化
    },
    // plugins: [
    //     // new ReactReFreshWebpackPlugin(), // 生产环境不能使用
    // ]
}