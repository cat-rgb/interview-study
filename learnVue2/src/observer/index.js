import newArrayMethods from "./array";


class Observer {
    constructor(value) {

        defineProperty(value, '__ob__', this)  // 给对象或者数据本身绑定一个ob 代表Observer对象
        if(Array.isArray(value)) {
            value.__proto__ = newArrayMethods // 更改对象原型方法
            this.observerArray(value)
        } else {
            this.walk(value)
        }
    }

    observerArray(data) {
        data.forEach(item => {
            observer(item)
        })
    }

    walk(data) {
        const keys = Object.keys(data)
        keys.forEach((key) => defineReactive(data, key, data[key]))
    }
}

function defineReactive(data, key, value) {
    observer(value)
    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newValue) {
            if(newValue === value) return
            observer(newValue)
            value = newValue
        }
    })
}

function defineProperty(data, key, value) {
    Object.defineProperty(data, key, {
        value: value,
        configurable: false,
        enumerable: false
    })
}


export function observer(value) {
    if(value == null || typeof value !== 'object') return

    const ob = new Observer(value)
}

export function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
        get: function() {
            return vm[data][key]
        },
        set(v) {
            vm[data][key] =v
        }
    })
}
