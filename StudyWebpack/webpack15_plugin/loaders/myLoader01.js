/**
 * loder接受参数   npm i loader-utils -D
 * @param content
 *
 * 验证
 * schema-utils
 *
 * marked
 * highlight.js
 */

const {getLoaderConfig} = require("loader-utils")
// normal Loader  3 -> 2 -> 1
module.exports = function (content) {
    console.log("loader1")
    /**
     * 同步loader 两种返回方式
     * return
     * this.callback(err, content)
     */
    // return content + 123
    // this.callback(null, content)
    // const options = getLoaderConfig(this)
    const options = this.getOptions() // webpack5使用this.getOptions获取options参数
    console.log(options)

    /**
     * 异步loader
     */
    const callback = this.async() // 调用这个函数返回callback
    setTimeout(() =>{
        callback(null, content)
    }, 2000)
}

// pitchLoader  1 -> 2 -> 3
module.exports.pitch = function (content) {
    console.log("pitch loader1")
}
