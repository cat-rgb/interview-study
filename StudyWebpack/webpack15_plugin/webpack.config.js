const MyPlugin = require("./plugins/myPlugin")

module.exports = {
    mode: "development",
    entry: "./src/main",
    module: {
        /**
         *   loader 执行顺序  pitch 顺序  normal 倒序
         *
         *   enforce  改变默认执行顺序
         *   pitch
         *   post inline normal pre
         *   normal
         *   pre normal inline post
         */
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                      loader: "myLoader01",
                        options: {
                          data:1
                        }
                    },
                    "myLoader02",
                    "myLoader03",
                ] // 设置resolveLoader
                // use: "./loaders/myLoader01"  // 根据context路径
            }
        ]
    },
    resolveLoader: {
        modules: ["node_modules", "./loaders"]
    },
    plugins: [
        // 自定义plugin
        // new MyPlugin({
        //     host: "",
        //     username: "root",
        //     password: "",
        //     remotePath: "/root/test"
        // })
    ]
}
