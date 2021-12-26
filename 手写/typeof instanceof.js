/**
 * typeof用来检测基本数据类型
 * instanceof 查看是否属于自己原型
 */
typeof 0
typeof true
typeof '1'
typeof new Reg()
typeof {}
typeof []
typeof function() {}
typeof undefined
typeof null

function Fn() {}
const a = new Fn()
a instanceof Fn
[] instanceof Array