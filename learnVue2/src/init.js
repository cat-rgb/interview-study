import {initState} from "./state";
import {compilerToFunctions} from "./compiler/index";
import {callHook, mountComponent} from "./lifecycle";
import {mergeOptions} from "./utils";

function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        // 初始化的时候进行options合并
        // vm.$options = options
        vm.$options = mergeOptions(vm.constructor.options, options)

        callHook(vm, 'beforeCreate')
        initState(vm) // 初始化状态
        callHook(vm, 'created')

        // 如果有el属性，渲染模板
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }


    Vue.prototype.$mount = function (el) {
        const vm = this
        const options = vm.$options
        el = document.querySelector(el)
        // vm.$el = el

        if(!options.render) {
            let template = options.template
            if(!template && el) {
                template = el.outerHTML
            }
            // 编译原理 将模板编译成render 函数
            const render = compilerToFunctions(template)
            options.render = render
        }

        mountComponent(vm, el)
    }
}


export {
    initMixin
}


