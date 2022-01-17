

const oldArrayPrototypeMethods = Array.prototype

const newArrayMethods = Object.create(oldArrayPrototypeMethods)

const arrayMethods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'splice',
    'reverse'
]

arrayMethods.forEach((method) => {
    newArrayMethods[method] = function(...args) {
        const result = oldArrayPrototypeMethods[method].apply(this, args)
        console.log('array ')

        let inserted
        const ob = this.__ob__
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.splice(2)
                break;
            default:
                break;
        }

        if(inserted) ob.observerArray(inserted) // 如果修改的数据中有对象或者数组继续检测

        return result
    }
})

export default newArrayMethods
