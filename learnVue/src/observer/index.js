
import {arrayMethods} from "./array";
import {defineProperty} from "../utils";

class Observer {
    constructor(data) {
        // 给data添加不可修改 __ob__ 属性  代表已经被观测过了，不用重复观测
        // 数组中可以通过__ob__  拿到this 调用observerArray 方法
        defineProperty(data, '__ob__', this)

        // 使用definedProperty 重新定义属性
        if(Array.isArray(data)) {
            data.__proto__ = arrayMethods  // 给data原型赋值重写后的arrayMethods方法
            this.observerArray(data)
        } else {
            this.walk(data)
        }
    }

     observerArray(value) {
        value.forEach(item => {
            observer(item) // 观测数组中的每一项， 如果是对象就去观测
        })
    }

    walk(data) {
        const keys = Object.keys(data)
        keys.forEach(key => defineReactive(data, key, data[key]))
    }
}


function defineReactive(data, key, value) {
    observer(value) // 递归调用
    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newValue) {
            // 不使用data[key] 会造成死循环 data[key]会一直触发set
            if(value === newValue) return
            observer(newValue) // 如果重新set值还是对象继续观测
            value = newValue
        }
    })
}

export function observer(data) {
    if(typeof data !== 'object' || data == null) return data
    // 标识对象是否有这个属性, 有这个属性就不在观测
    if(data.__ob__) return data
    return new Observer(data)
}