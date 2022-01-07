import Vue from './main'
import {initState} from "./state";

Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    initState(options)

}


