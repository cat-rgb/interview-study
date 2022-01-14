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

export const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
]

// 状态模式
const strats = {}

strats.components = function (parentVal, childVal) {
    const res = Object.create(parentVal)
    if (childVal) {
        for (let key in childVal) {
            res[key] = childVal[key]
        }
    }
    return res
}

// strats.data = function (parentVal, childVal) {
//     return childVal
// }
// strats.computed = function () {
// }
// strats.watch = function () {
// }

function mergeHook(parentVal, childVal) {
    if (childVal) { // 儿子有值
        // 再根据父亲状态返回值
        if (parentVal) {
            return parentVal.concat(childVal)
        } else {
            return [childVal] // 这里给儿子赋值成数组 第一次进入 parent是undefiend 对儿子进行合并下一次入参会变成parent
        }
    } else {
        // 儿子没值 直接返回父亲的
        return parentVal
    }

}

LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
})

export function mergeOptions(parent, child) {
    const options = {}

    for (let key in parent) { // 父亲 儿子都有，
        mergeField(key)
    }

    for (let key in child) { // 儿子有，父亲没有  将儿子多的给到父亲
        if (!parent.hasOwnProperty(key)) {
            mergeField(key)
        }
    }

    function mergeField(key) { // 合并字段
        // 根据不同的策略进行不同的模式
        if (strats[key]) {
            options[key] = strats[key](parent[key], child[key])
        } else {
            // 判断组件子类有没有值
            if (child[key]) {
                options[key] = child[key]
            } else {
                options[key] = parent[key]

            }

        }
    }

    return options
}

const callbacks = []
let timerFunc
let pending = false

function flushCallbacks() {
    while (callbacks.length) {
        let cb = callbacks.pop()
        cb()
    }
    pending = false // 标识已经更新完毕
}

if (Promise) {
    timerFunc = () => {
        Promise.resolve().then(flushCallbacks)
    }
} else if (MutationObserver) {
    // 监控dom变化 监控完是异步更新
    let observe = new MutationObserver(flushCallbacks)
    let textNode = document.createTextNode(1)
    observe.observe(textNode, {characterData: true})
    timerFunc = () => {
        textNode.textContent = 2
    }
} else if (setImmediate) {
    timerFunc = () => {
        setImmediate(flushCallbacks)
    }
} else {
    timerFunc = () => {
        setTimeout(flushCallbacks)
    }
}

export function nextTick(cb) {
    // 内部会调用nextTick  用户也会调动 但是异步只需要一次
    callbacks.push(cb)
    timerFunc()
    if (!pending) {
        timerFunc()
        pending = true
    }
}

function makeMap(str) {
    const mapping = {}
    const list = str.split(',')
    for (let i = 0; i < list.length; i++) {
        mapping[list[i]] = true
    }

    return (key) => {
        return mapping[key]
    }
}

// 判断是否是原生标签
export const isReservedTag = makeMap(
    'a, div, p, ul, li'
)

export {
    proxy,
    defineProperty
}