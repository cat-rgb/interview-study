import {observer} from "./observer/index";
import {nextTick, proxy} from "./utils";

export function initState(vm) {
    const opts = vm.$options
    if(opts.props) {
        initProps(vm)
    }

    if(opts.methods) {
        initMethods(vm)
    }

    if(opts.data) {
        initData(vm)
    }

    if(opts.computed) {
        initComputed(vm)
    }

    if(opts.watch) {
        initWatch(vm)
    }
}



function initProps() {}
function initMethods() {}
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

function initWatch() {
}


export function stateMixin(Vue) {
    Vue.prototype.$nextTick = function (cb) {
        nextTick(cb)
    }
}
