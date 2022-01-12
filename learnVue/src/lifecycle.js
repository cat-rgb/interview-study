import {patch} from "./vdom/patch";
import Watcher from "./observer/watcher";

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this

        const preVnode = vm._vnode
        if (!preVnode) {
            vm.$el = patch(vm.$el, vnode)
        } else {
            vm.$el = patch(preVnode, vnode)
        }
        vm._vnode = vnode
    }
}

// 挂载组件函数
export function mountComponent(vm, el) {
    // 调用render方法去渲染el属性
    vm.$el = el

    callHook(vm, 'beforeMount')
    // 先调用render方法创建虚拟节点，在将虚拟节点渲染到页面上
    const updateComponent = () => {
        vm._update(vm._render())
    }
    // 用来渲染的
    let watcher = new Watcher(vm, updateComponent, () => {
        callHook(vm, 'updated')
    }, true)

    // 要把属性 绑定到watcher


    callHook(vm, 'mounted')
}

export function callHook(vm, hook) {
    const handlers = vm.$options[hook] // vm.$options.created = [a1, a2, a3]
    if (handlers) {
        for (let i = 0; i < handlers.length; i++) {
            handlers[i].call(vm) // 调用更改声明周期中的this
        }
    }
}