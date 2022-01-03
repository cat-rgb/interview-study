import dayjs from "dayjs";
import "./foo.css"

dayjs()
console.log("hello wrold")

console.log("hello index")

function sum(sum1, sum2) {
    return sum1 + sum2
}


// 只要是异步加载 即使设置了initial同步 也会进行分离
// 魔法注释修改打包后的名字
// prefetch 预加载  闲置时间下载n
// preload  跟随父文件下载 并行加载 立即下载
import(/* webpackChunkName: "foo" */
    /* webpackPrefetch: true */
    "./foo").then(res => {
    console.log(res)
})