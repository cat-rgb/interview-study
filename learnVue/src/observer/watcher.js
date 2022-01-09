import {popTarget, pushTarget} from "./dep";
import {nextTick} from "../utils";

let id = 0

class Watcher {
    constructor(vm, exprOrFn, cb, options) {
        this.vm = vm
        this.exprOrFn = exprOrFn
        this.cb = cb
        this.options = options
        this.user = options.user // 用户watcher
        this.isWatcher = typeof options == "boolean"// 渲染watcher


        this.id = id++ // watcher的唯一标识
        this.deps = [] // 记录有多少dep被依赖
        this.depsId = new Set()
        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn
        } else {
            this.getter = function () {
                // exprOrFn 可能传的是a
                let path = exprOrFn.split('.')
                let obj = vm
                for (let i = 0; i < path.length; i++) {
                    obj = obj[path[i]]
                }
                return obj
            }
        }
        // 默认会先调用一次 进行取值 将结果保留下来
        this.value = this.get()
    }

    get() {
        // Dep.target = watcher
        pushTarget(this) // 当前watcher实例
        let result = this.getter() // 默认调用exprOrFn  渲染页面
        popTarget()

        return result
    }

    update() {
        // 不要每次都调用渲染 异步缓存
        queueWatcher(this)
        // this.get() // 重新渲染
    }

    run() {
        let newValue = this.get()
        let oldValue = this.value
        if (this.user) {
            this.cb.call(this.vm, newValue, oldValue)
        }
    }

    addDep(dep) {
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.deps.push(dep)
            this.depsId.add(id)
            dep.addSub(this) // 双向记忆
        }
    }
}

let queue = [] // 需要更新的watcher队列
let has = {}
let pending = false


function flushSchedulerQueue() {
    queue.forEach(watcher => {
        watcher.run()
        // 用户的时候判断
        if (!watcher.user) {
            watcher.cb()
        }
    })
    queue = [] // 调用完后清空队列
    has = {} // 清空has
    pending = false
}

function queueWatcher(watcher) {
    const id = watcher.id
    if (has[id] == null) {
        queue.push(watcher)
        has[id] = true
        // 等所有同步代码执行完再处理
        if (!pending) {
            nextTick(flushSchedulerQueue)
            pending = true
        }
    }
}


export default Watcher

/**
 * 1  把渲染watcher 放到Dep.target属性上
 * 2  开始渲染取值会调用get方法 需要让这个属性的dep 存储当前的watcher
 * 3  页面上所需要的属性都会把这个watcher存在自己的dep中
 * 4  等属性更新了 重新调用渲染逻辑 通知自己存储的watcher来更新
 */