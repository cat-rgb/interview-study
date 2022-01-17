import {observer, proxy} from "../observer/index";


export function initState(vm) {
    const ops = vm.$options;

    if(ops.props) {
        initProps(ops);
    } else if (ops.data) {
        initData(vm)
    }

}

function initProps() {}
function initData(vm) {
    let data = vm.$options.data
    // 判断data是否是一个函数
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}

    // if(!data.__ob__) {
        for(let key in data) {
            proxy(vm, '_data', key)
        }
    // }

    observer(data)

}
