// 数据代理
function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[data][key]
        },
        set(newValue) {
            vm[data][key] = newValue
        }
    })
}

// 为某个对象的某个属性设置某个值
function defineProperty(target, key, value) {
    Object.defineProperty(target, key, {
        enumerable: false,
        configurable: false,
        value: value
    })
}

export {
    proxy,
    defineProperty
}