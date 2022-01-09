import {arrayMethods} from "./array";
import {defineProperty} from "../utils";
import Dep from "./dep";

class Observer {
    constructor(data) {
        this.dep = new Dep()
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

// 定义响应式
function defineReactive(data, key, value) {
    // childObserver用于 记录数据返回的observer
    let childObserver = observer(value) // 递归调用

    // 给对象添加dep
    let dep = new Dep() // 每个属性都有一个dep

    Object.defineProperty(data, key, {
        get() {
            // 依赖收集  让这个属性记住这个watcher
            if (Dep.target) {
                dep.depend()
                if (childObserver) {
                    childObserver.dep.depend()
                }
            }
            return value
        },
        set(newValue) {
            // 依赖更新
            // 不使用data[key] 会造成死循环 data[key]会一直触发set
            if (value === newValue) return
            observer(newValue) // 如果重新set值还是对象继续观测
            value = newValue

            dep.notify()
        }
    })
}

export function observer(data) {
    if (typeof data !== 'object' || data == null) return
    // 标识对象是否有这个属性, 有这个属性就不在观测
    if(data.__ob__) return data
    return new Observer(data)
}