import {mergeOptions} from "../utils";

export default function initExtend(Vue) {

    let cid = 0
    // 返回一个构造函数
    Vue.extend = function (extendOptions) {
        const Super = this
        const Sub = function VueComponent(options) {
            this._init(options)
        }
        Sub.cid = cid++
        Sub.prototype = Object.create(Super.prototype)
        Sub.prototype.constructor = Sub
        Sub.options = mergeOptions(Sub.options, extendOptions)
        Sub.components = Super.components

        return Sub

    }


    // 组件渲染过程
    /**
     * 1 调用vue.component
     * 2 内部用的是Vue.extend  产生一个子类继承父类
     * 3 子类创建实例时会调用父类的_init方法 然后$mount
     * 4 new 组件的构造函数
     * 5 组件属性中多了一个hook 包含着组件的生命周期
     *
     */
}