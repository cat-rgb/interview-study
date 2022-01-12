let id = 0

class Dep {
    constructor() {
        this.subs = []
        this.id = id++
    }

    depend() {
        // watcher 存放dep
        Dep.target.addDep(this)
        // this.subs.push(Dep.target)
    }

    addSub(watcher) {
        this.subs.push(watcher) // 记录watcher
    }

    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}

Dep.target = null
let stack = []
export function pushTarget(watcher) {
    Dep.target = watcher
    stack.push(watcher)
}

export function popTarget(watcher) {
    stack.pop()
    Dep.target = stack[stack.length - 1]
}

// 多对多的关系  一个属性有一个dep用来收集watcher
// dep 可以存在多个watcher
// 一个watcher可以对应多个dep

export default Dep

