
export function initState(options) {
    if(options.props) {
        initProps()
    }

    if(options.methods) {
        initMethods()
    }

    if(options.data) {
        initData(options.data)
    }

    if(options.computed) {
        initComputed()
    }

    if(options.watch) {
        initWatch()
    }
}


function initProps() {}
function initMethods() {}
function initData(options) {
    console.log(options)
}
function initComputed() {}
function initWatch() {}
