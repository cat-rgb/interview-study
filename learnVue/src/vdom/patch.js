export function patch(oldVnode, vnode) {
    // 初始化的时候用虚拟节点创建真实节点
    // 虚拟节点转换成真实节点

    if (oldVnode.nodeType === 1) {
        // 说明是初始化
        let el = createElm(vnode)  // 产生真实的dom
        let parentElm = oldVnode.parentNode // 获取老的app的parent body
        parentElm.insertBefore(el, oldVnode.nextSibling) // 将当前的真实元素插入到app的后面
        parentElm.removeChild(oldVnode) // 删除老的节点
        return el
    } else {
        //  比较标签  直接替换
        if (oldVnode.tag !== vnode.tag) {
            oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el)
        }

        if (!oldVnode.tag) { // undefined 为文本
            if (oldVnode.text !== vnode.text) {
                return oldVnode.el.textContent = vnode.text
            }
        }
        // 标签一样
        let el = vnode.el = oldVnode.el // 复用旧的
        // 更新属性  新老属性对比
        updateProperties(vnode, oldVnode.data)

        // 比较儿子
        // 老的有儿子  新的没有
        // 老的没有 新的有
        let oldChildren = oldVnode.children || {}
        let newChildren = vnode.children || {}
        if (oldChildren.length > 0 && newChildren.length > 0) {
            // 老的有 新的也有 (核心) diff
            updateChildren(oldChildren, newChildren, el)
        } else if (oldChildren.length > 0) {// 新的没有
            el.innerHTML = ''
        } else if (newChildren.length > 0) {// 老的没有

            for (let i = 0; i < newChildren.length; i++) {
                let child = newChildren[i]
                el.appendChild(createElm(child))
            }
        }
    }
}

function updateChildren(oldChildren, newChildren, parent) {
    let oldStartIndex = 0
    let oldStartVnode = oldChildren[0]
    let oldEndIndex = oldChildren.length - 1
    let oldEndVnode = oldChildren[oldEndIndex]

    let newStartIndex = 0
    let newStartVnode = newChildren[0]
    let newEndIndex = newChildren.length - 1
    let newEndVnode = newChildren[newEndIndex]

    function makeIndexByKey(children) {
        let map = {}
        children.forEach((item, index) => {
            if (item.key) {
                map[item.key] = index // {A: 0, B: 1, C:2}
            }
        })
        return map
    }

    let map = makeIndexByKey(oldChildren)

    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if (!oldStartVnode) {
            oldStartVnode = oldChildren[++oldStartIndex]
        } else if (!oldEndVnode) {
            oldEndVnode = oldChildren[--oldEndIndex]
        } else if (isSameVnode(oldStartVnode, newStartVnode)) {  // 头和头对比
            patch(oldStartVnode, newStartVnode)
            oldStartVnode = oldChildren[++oldStartIndex]
            newStartVnode = newChildren[++newStartIndex]
        } else if (isSameVnode(oldEndVnode, newEndVnode)) { // 尾和尾对比
            patch(oldEndVnode, newEndVnode)
            oldEndVnode = oldChildren[--oldEndIndex]
            newEndVnode = newChildren[--newEndIndex]
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
            patch(oldEndVnode, newStartVnode)
            parent.insertBefore(oldEndVnode.el, oldStartVnode.el)

            oldEndVnode = oldChildren[--oldEndIndex]
            newStartVnode = newChildren[++newStartIndex]
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
            patch(oldStartVnode, newEndVnode)
            parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
            oldStartVnode = oldChildren[++oldStartIndex]
            newEndVnode = newChildren[--newEndIndex]
        } else {
            // 无规律 暴力对比
            console.log(newStartVnode)
            let moveIndex = map[newStartVnode.key]  // 去旧的key映射表中查找
            if (moveIndex == undefined) {
                parent.insertBefore(createElm(newStartVnode), oldStartVnode.el)
            } else {
                let moveVnode = oldChildren[moveIndex] // 旧节点需要移动
                oldChildren[moveIndex] = null;
                parent.insertBefore(moveVnode.el, oldStartVnode.el)
                patch(moveVnode, newStartVnode) // 递归再次比较儿子和属性
            }
            newStartVnode = newChildren[++newStartIndex]
        }
    }

    if (newStartIndex <= newEndIndex) { // 说明新的多了元素
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            // 向后插入 ele = null
            // 向前插入 当前
            console.log(newChildren)
            let ele = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el
            parent.insertBefore(createElm(newChildren[i]), ele)
            // parent.appendChild(createElm(newChildren[i]))
        }
    }

    if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i < oldEndIndex; i++) {
            let child = oldChildren[i]
            if (child != undefined) {
                parent.removeChild(child.el)
            }
        }
    }

}

function isSameVnode(oldVnode, newVnode) {
    return (oldVnode.tag === newVnode.tag) && (oldVnode.key === newVnode.key)
}


export function createElm(vnode) {
    let {tag, children, key, data, text} = vnode
    if (typeof tag === 'string') { // 创建元素 放到vnode.el上
        vnode.el = document.createElement(tag)
        updateProperties(vnode)
        children.forEach(child => { // 遍历儿子 塞给父亲
            vnode.el.appendChild(createElm(child))
        })
    } else { // 创建文本 放到vnode
        vnode.el = document.createTextNode(text)
    }

    return vnode.el
}

function updateProperties(vnode, oldProps = {}) {
    let newProps = vnode.data || {}
    // 新的有 直接修改
    let el = vnode.el
    // 老的有 新的没有 删除
    for (let key in oldProps) {
        if (!newProps[key]) {
            el.removeAttribute(key)
        }
    }

    // 样式处理
    let newStyle = newProps.style || {}
    let oldStyle = oldProps.style || {}
    for (let key in oldStyle) {
        if (!newStyle[key]) {
            el.style[key] = ''
        }
    }


    for (let key in newProps) {
        if (key == 'style') {
            for (let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName]
            }
        } else if (key === 'class') {
            el.className = el.class
        } else {
            el.setAttribute(key, newProps[key])
        }
    }
}
