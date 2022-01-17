const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; //匹配标签名 形如 abc-123
// ?: 匹配不捕获
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //匹配特殊标签 形如 abc:234 前面的abc:可有可无
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配标签开始 形如 <abc-123 捕获里面的标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`, 'g'); // 匹配标签结尾 如 </abc-123> 捕获里面的标签名
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性  形如 id="app"
//   aaa="aaa" | aaa='aaa' | aaa=aaa
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束  >   <div></div>  <br/>
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //匹配花括号 {{  }} 捕获花括号里面的内容

export function parseHTML(html) {

    function createASTElement(tagName, attrs) {
        return {
            tag: tagName,
            type: 1,
            children: [],
            attrs,
            parent: null
        }
    }

    let root;
    let currentParent;
    let stack = []

    function start(tagName, attrs) {
        let element = createASTElement(tagName, attrs)
        if(!root) {
            root = element
        }
        currentParent = element // 当前解析的标签
        stack.push(element)
    }
    function end(tagName) {
        // 判断闭合标签  结尾标签处 创建父子关系
        let element = stack.pop()
        currentParent = stack[stack.length -1]
        if(currentParent) {
            element.parent = currentParent
            currentParent.children.push(element)
        }
    }

    function chars(text) {
        // text = text.replace(/\s/g, '')
        if(text) {
            currentParent.children.push({
                type:3,
                text: text
            })
        }
    }

    while (html) {
        const textEnd = html.indexOf('<') // 返回匹配到<的第一次索引

        // < 索引是0， 肯定是标签
        if(textEnd == 0) {
            // 标签开始
            const startTagMatch = parseStartTag()
            if(startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }

            // 处理结束
            const endTagMatch = html.match(endTag)

            if(endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue
            }
        }

        // 处理文本
        let text
        if(textEnd>0) {
            text = html.substring(0, textEnd)
        }
        if(text) {
            advance(text.length)
            chars(text)
        }
    }


    // 将匹配放入match的字符串截取剔除
    function advance(n) {
        html = html.substring(n)
    }

    function parseStartTag() {
        // 匹配标签开始
        const start = html.match(startTagOpen)
        if(start) {
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length) // 删除开始标签
            // 如果直接是闭合标签了 说明没有属性 />
            let end
            let attr
            //  匹配属性  没有匹配到结尾 并且 匹配属性有值  截取属性
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute)) ) {
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                })
                advance(attr[0].length)
            }
            // 匹配结尾
            if(end) {
                advance(end[0].length)
                return match
            }
        }
    }
    return root
}
