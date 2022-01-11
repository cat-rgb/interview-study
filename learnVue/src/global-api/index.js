import {mergeOptions} from "../utils";

export function initGlobalApi(Vue) {
    Vue.options = {}  // Vue.components  Vue.diretive
    Vue.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin)
    }
}
