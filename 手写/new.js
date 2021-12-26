function MyNew(fn, ...args) {
    const obj = Object.create(fn)
    fn.call(obj, ...args)
    return obj
}

function Fn(name, age) {
    this.name = name
    this.age = age
}

MyNew(Fn, "zhangsan", "18")