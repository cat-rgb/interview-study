/**
 * call apply 利用模拟obj到方式去实现
 */

Array.prototype.call = function (caller, ...args) {
    const obj = caller || window
    obj.fn = this // this指向调用到函数
    let r = obj.fn(...args)
    delete obj.fn
    return r
}

Array.prototype.apply = function (caller, ...args) {
    const obj = caller || window
    obj.fn = this // this指向调用到函数
    let r = obj.fn(args)
    delete obj.fn
    return r
}

Array.prototype.bind = function (caller, ...args) {
    const _this = this
    function Fn() {}
    let fn = function (...msg) {
        const argarr = [...args, ...msg]
        // 如果是bind返回一个函数作为构造函数就看这个函数的原型是不是指向fn
        const _call_this = this instanceof fn ? this : caller
        return _this.call(_call_this, ...argarr)
    }
    // fn1原型上绑定到属性 返回到构造函数也可以拿到 通过new Fn继承
    Fn.prototype = this.prototype
    fn.prototype = new Fn()
    return fn
}

function fn1(name) {
    this.name = name
}

fn1.call(this, 1,2,3)
fn1.bind('obj', 1)(2,3)
const b = {
    name: '1'
}
const  bindFn = fn1.bind(b)
const obj = new bindFn('2')
console.log(obj)
console.log(b)

/**
 * .call两次以上相当于 执行fnb， obj是fnb传入到this
 *
 * 相当于是call函数执行call
 * call.call(fnb) ->  fnb.fn('obj')
 * 因为这个fn是指向当前到this也就是call
 * 所以 执行就是 fnb.call('obj')
 */
fn1.call.call('fnb', 'obj')