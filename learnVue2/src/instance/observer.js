

class Observer {
    constructor(value) {

        // defineReactive(value, '__ob__', this)

        this.walk(value)
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
