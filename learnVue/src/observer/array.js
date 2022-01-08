// 拿到数组的原型的方法

let oldArrayProtoMethods = Array.prototype

let arrayMethods = Object.create(oldArrayProtoMethods)

let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
]

methods.forEach(method => {
    //  重写原型的方法
    arrayMethods[method] = function(...args) {
        const result = oldArrayProtoMethods[method].apply(this, args)

        let inserted  // 添加或者修改的 需要观测的参数
        const ob = this.__ob__ // this 是指 调用方法的arr数组
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice': // vue set 原理
                /**
                 * arr.splice(0, 1, {a:1})   args = [0,1, {a: 1}]  第三个值用于替换
                 * 如果替换的第三个值是个对象 就进行观测 将第三个值截取出来
                 */
                inserted = args.splice(2)
            default:
                break
        }

        if(inserted) ob.observerArray(inserted)  // 数组调用方法时如果push({a: 1}) 传的是对象类型还要继续观测

        return result  // 返回array原有的方法进行调用
    }
})

export {arrayMethods}