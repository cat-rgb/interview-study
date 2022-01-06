const MyPlugin = require("./plugins/myPlugin")

module.exports = {
    entry: "./src/main",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            }
        ]
    },
    plugins: [
        new MyPlugin({
            host: "",
            username: "root",
            password: "",
            remotePath: "/root/test"
        })
    ]
}