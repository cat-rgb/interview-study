module.exports = {
    presets: [
        ["@babel/preset-env",
            {
                // false  不使用任何的polyfill
                // usage  引入使用的polyfill
                // entry
                // 使用usage  core-js 不指定版本默认是使用2  推荐安装使用3
                // useBuiltIns: "usage",
                // corejs: 3,
                // useBuiltIns: "entry",
                // corejs: 3,

            }
        ],
        ["@babel/preset-react"]
    ],
    plugins: [
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: 3
            }
        ]
    ]
}