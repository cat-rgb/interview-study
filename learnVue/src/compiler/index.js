// <div id="app">
//     {{abc}}
//     <div>{{aaa}}</div>
// </div>

// 模板编译正则
import {parseHTML} from "./parse";
import {generate} from "./generate";

export function compilerToFunctions(template) {
    // html模板 -> render 函数
    // 1. 需要将html代码转成 ast 语法树
    let ast = parseHTML(template)

    // 2 ast 重新生成render函数字符串代码
    let code = generate(ast)

    // 字符串转换成函数
    let render = new Function(`with(this) {return ${code}}`)

    return render
}