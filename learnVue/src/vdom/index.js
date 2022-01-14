import {isReservedTag} from "../utils";

export function renderMixin(Vue) {

    Vue.prototype._render = function () {
        const vm = this
        const render = vm.$options.render
        let vnode = render.call(vm)
        return vnode
    }

    Vue.prototype._c = function () { // 创建元素
        return createElement(this, ...arguments)
    }

    Vue.prototype._s = function (val) { // stringify
        return val == null ? '' : (typeof val == 'object') ? JSON.stringify(val) : val
    }

    Vue.prototype._v = function (text) { // 创建文本元素
        return createTextVnode(text)
    }


}


function createElement(vm, tag, data = {}, ...children) {
    if (isReservedTag(tag)) {
        return vnode(tag, data, data.key, children)
    } else {
        let Ctor = vm.$options.components[tag]
        return createComponent(vm, tag, data, data.key, children, Ctor)
    }
}

export function createComponent(vm, tag, data, key, children, Ctor) {
    const baseCtor = vm.$options._base
    if (typeof Ctor == 'object') {
        Ctor = baseCtor.extend(Ctor)
    }

    // 给组件添加生命周期
    data.hook = { // 稍后组件初始化 会调用init方法
        init(vnode) {
            let child = vnode.componentInstance = new Ctor({})
            child.$mount()
        }
    }

    return vnode(`vue-component-${Ctor.name}-${Ctor.cid}`, data, key, undefined, undefined, {Ctor, children})
}

function createTextVnode(text) {
    return vnode(undefined, undefined, undefined, undefined, text)
}

// 用来产生虚拟dom
function vnode(tag, data, key, children, text) {
    return {
        tag, data, key, children, text
    }
}