import {initMixin} from './init'
import {lifecycleMixin} from "./lifecycle";
import {renderMixin} from "./vdom/index";
import {initGlobalApi} from "./global-api/index";
import {stateMixin} from "./state";

function Vue(options) {
    this._init(options); // 初始化
}

initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
stateMixin(Vue)

initGlobalApi(Vue)


// let vm1 = new Vue({data: {name: 'zf'}})
// let render1 = compilerToFunctions(`<div >
//     <li style="color:blue" key="B">B</li>
//         <li style="color:blue" key="C">C</li>
//             <li style="color:red" key="A">A</li>
//             <li style="color:blue" key="Q">Q</li>
//             <li style="color:red" key="M">M</li>
//
//
//
// </div>`)
// let vnode = render1.call(vm1)
// document.body.appendChild(createElm(vnode))
//
// let vm2 = new Vue({data: {name: 'vm2'}})
// let render2 = compilerToFunctions(`<div >
//     <li style="color:blue" key="C">C</li>
//     <li style="color:red" key="A">A</li>
//     <li style="color:blue" key="B">B</li>
//     <li style="color:red" key="F">F</li>
//     <li style="color:blue" key="E">E</li>
//
// </div>`)
// let vnode2 = render2.call(vm2)
//
// setTimeout(() => {
//     patch(vnode, vnode2)  // 节点对比
//
// }, 1000)


export default Vue
