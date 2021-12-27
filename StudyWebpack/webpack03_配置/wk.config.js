const path = require('path')

module.exports = {
    entry: './src/main',
    output: {
        filename: "wk.js",
        path: path.resolve(__dirname, './build')
    }
}