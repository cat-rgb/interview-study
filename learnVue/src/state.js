import {observer} from "./observer/index";
import {nextTick, proxy} from "./utils";
import Watcher from "./observer/watcher";

export function initState(vm) {
    const opts = vm.$options
    if (opts.props) {
        initProps(vm)
    }

    if (opts.methods) {
        initMethods(vm)
    }

    if (opts.data) {
        initData(vm)
    }

    if (opts.computed) {
        initComputed(vm)
    }

    if (opts.watch) {
        initWatch(vm)
    }
}


function initProps() {
}

function initMethods() {
}

function initData(vm) {
    let data = vm.$options.data
    vm._data = data = typeof data === 'function' ? data.call(vm) : data


    // 当从vm上去取数据的时候,将 属性代理到vm._data上
    for (let key in data) {
        proxy(vm, '_data', key)
    }

    // 进行数据劫持
    observer(data)
}

function initComputed() {
}

function initWatch(vm) {
    let watch = vm.$options.watch

    for (let key in watch) {
        // handler 可能是数组 字符串 对象 函数
        const handler = watch[key]

        if (Array.isArray(handler)) {
            handler.forEach(handle => createWatcher(vm, key, handle))
        } else {
            createWatcher(vm, key, handler)
        }
    }
}

function createWatcher(vm, exprOrFn, handler, options = {}) {
    // options 可以用来标识是用户watcher
    if (typeof handler == 'object') {
        options = handler
        handler = handler.handler
    }
    if (typeof handler == 'string') {
        handler = vm[handler]
    }

    return vm.$watch(exprOrFn, handler, options)
}

export function stateMixin(Vue) {
    Vue.prototype.$nextTick = function (cb) {
        nextTick(cb)
    }

    Vue.prototype.$watch = function (exprOrFn, cb, options) {
        // 数据应该依赖这个watcher 数据变化后应该让watcher重新执行
        let watcher = new Watcher(this, exprOrFn, cb, {...options, user: true})
        if (options.immediate) {
            cb()
        }
    }
}
