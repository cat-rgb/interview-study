const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //匹配花括号 {{  }} 捕获花括号里面的内容


// 生成 attr属性
function genProps(attrs) {
    let str = ''
    for(let i =0;i<attrs.length;i++) {
        let attr = attrs[i]
        if(attr.name == 'style') {
            let obj = {}
            attr.value.split(';').forEach(item => {
                let [key, value] = item.split(':')
                obj[key] = value
            })
            attr.value = obj  // 给value重新赋值  字符串转换成obj
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    return `{${str.slice(0, -1)}}`
}

function gen(node) {
    if(node.type == 1) {
        // 标签类型 重新调用标签生成函数
        return generate(node) // 生成元素节点的字符串
    } else {
        // 文本类型  普通文本  {{}}  插值文本
         let text = node.text
        if(!defaultTagRE.test(text)) {
            return `_v(${JSON.stringify(text)})`
        }
        let tokens = []
        let lastIndex = defaultTagRE.lastIndex = 0 // 如果正则是全局匹配模式， 需要每次使用前置为0
        let match, index ; // 每次匹配到的结果

        while (match = defaultTagRE.exec(text)) {
            index = match.index // 保存匹配到的索引
            if(index > lastIndex) {
                tokens.push(JSON.stringify(text.slice(lastIndex, index)))
            }
            tokens.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length
        }

        if(lastIndex < text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)))
        }

        return `_v(${tokens.join('+')})`

     }
}

function genChildren(el) {
    const children = el.children
    if(children) {
        return children.map(child => gen(child)).join(',')
    }
}

// // 生成元素节点的字符串
export function generate (el) {
    let children = genChildren(el)
    let code = `_c('${el.tag}',${
        el.attrs.length? `${genProps(el.attrs)}`: 'undefined'
    }${
        children?`,${children}`: ''
    })`
    return code
}
