//引入一些插件
const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
function resolve (dir) {
    return path.join(__dirname, dir)
}

/**
 * 判断是否是生产环境
 * @returns {boolean}
 */
function isProd () {
    return process.env.NODE_ENV === 'production'
}

// 定义一些必须的静态资源库，当是生产环境的时候，使加载速度更快，也减小自己服务器的压力
const assetsCDN = {
    css: [],
    js: [
        '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
        '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
        '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
        '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
        '//cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js'
    ]
}

// 定义一些必须的静态资源库，当是生产环境的时候，使加载速度更快，也减小自己服务器的压力
const prodExternals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'echarts': 'echarts',
    'lodash': {
        commonjs: 'lodash',
        amd: 'lodash',
        root: '_'
    }
}
// 更多配置 https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE
module.exports = {
    filenameHashing: true,
    lintOnSave: true,
    productionSourceMap: false,
    transpileDependencies: [],

    devServer: {
        // 更多配置查看 https://www.jianshu.com/p/f489e7764cb8
        port: 8080 // 端口号
        // ,
        // proxy: {
        //   '/api': {
        //     target: 'http://localhost:3000',
        //     pathRewrite: {'^/api' : ''},
        //     ws: true, // 是否代理websockets
        //     changeOrigin: true
        //   }
        // }
    },

    configureWebpack: config => {
        config.plugins = [
            ...config.plugins,
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]

        if (isProd()) {
            config.externals = prodExternals

            config.plugins = [
                ...config.plugins,
                new webpack.HashedModuleIdsPlugin(),
                new CompressionPlugin({
                    algorithm: 'gzip',
                    test: /\.js$|\.html$|\.css/,
                    threshold: 1024,
                    minRatio: 0.8
                }),
                new UglifyJsPlugin({
                    exclude: /\.min\.js$/,
                    cache: true,
                    parallel: true,
                    sourceMap: false,
                    extractComments: false, // 移除注释
                    uglifyOptions: {
                        warnings: false,
                        compress: {
                            unused: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log'] // 移除console
                        }
                    }
                })
            ]
        }
        // 当使用npm run build --report 或者 npm run build:prod --report 的时候生成分析文件
        if (process.argv.includes('--report')) {
            config.plugins.push(new BundleAnalyzerPlugin(
                {
                    analyzerMode: 'server',
                    analyzerHost: '127.0.0.1',
                    analyzerPort: 8881,
                    reportFilename: 'report.html',
                    defaultSizes: 'parsed',
                    openAnalyzer: true,
                    generateStatsFile: false,
                    statsFilename: 'stats.json',
                    statsOptions: null,
                    logLevel: 'info'
                }
            ))
        }
    },

    chainWebpack: config => {
        config.resolve.alias
            .set('@$', resolve('src'))

        config.optimization
            .splitChunks({
                cacheGroups: {}
            })

        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .oneOf('inline')
            .resourceQuery(/inline/)
            .use('vue-svg-icon-loader')
            .loader('vue-svg-icon-loader')
            .end()
            .end()
            .oneOf('external')
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'assets/[name].[hash:8].[ext]'
            })

        // if prod is on
        // assets require on cdn
        if (isProd()) {
            config.plugin('html').tap(args => {
                args[0].cdn = assetsCDN
                return args
            })
        }
    },

    css: {
        requireModuleExtension: false,
        extract: true,
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    parallel: require('os').cpus().length > 1,
    pluginOptions: {}
}
