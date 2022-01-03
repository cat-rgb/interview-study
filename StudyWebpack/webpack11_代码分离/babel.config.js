let plugins = []

const isProduction = process.env.production === 'production'
if (!isProduction) {
    plugins.push(["react-refresh/babel"])
} else {

}


module.exports = {
    presets: [
        ["@babel/preset-env"],
        ["@babel/preset-react"]
    ],
    plugins: plugins
}