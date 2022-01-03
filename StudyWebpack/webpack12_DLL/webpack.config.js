const path = require("path");
const webpack = require("webpack")
module.exports = {
    entry: ["react", "react-dom"],
    output: {
        filename: "[name].[hash:6].js",
        path: path.resolve(__dirname, "./dll"),
        library: "dll_[name]" // 打包库添加
    },
    plugins: [
        new webpack.DllPlugin({
            name: "dll_[name]", // 和libraray名字相同
            path: path.resolve(__dirname, "./dll/[name].manifest.json")
        })
    ]
}