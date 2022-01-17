import {observer} from "./observer/index";
import {nextTick, proxy} from "./utils";
import Watcher from "./observer/watcher";
import Dep from "./observer/dep";

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

function initComputed(vm) {
    const computed = vm.$options.computed
    // 1 需要有wacther 2 通过Object.define  3  dirty
    const watchers = vm._computedWatchers = {} // 用来稍后存放计算属性的watcher

    for (let key in computed) {
        const userDef = computed[key]  // 取出对应的值来
        const getter = typeof userDef == 'function' ? userDef : userDef.get
        watchers[key] = new Watcher(vm, getter, () => {
        }, {lazy: true})
        defineComputed(vm, key, userDef)
    }
}


function defineComputed(target, key, userDef) {
    const sharedPropertyDefinition = {
        enumerable: true,
        configurable: true,
        get: () => {
        },
        set: () => {
        }
    }
    if (typeof userDef == 'function') {
        sharedPropertyDefinition.get = createComputedGetter(key)
    } else {
        sharedPropertyDefinition.get = createComputedGetter(key)
        sharedPropertyDefinition.set = userDef.set
    }

    Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter(key) {
    return function () {
        const watcher = this._computedWatchers[key] // 拿到这个属性对应watcher
        if (watcher) {
            if (watcher.dirty) { // 默认肯定是脏的
                watcher.evaluate() //
            }

            if (Dep.target) {
                watcher.depend()
            }

            return watcher.value
        }
    }
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
