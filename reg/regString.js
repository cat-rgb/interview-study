// 正则表达式是匹配模式，要么匹配字符，要么匹配位置。
function test(reg, str) {
    console.log('test',reg.test(str))
}

function match(reg, str) {
    console.log(str.match(reg))
}

const hello = 'hello'
const reghello = /hello/ // 精确匹配
test(reghello, hello)

// 横向模糊匹配  纵向模糊匹配
const rowReg = /ab{2,5}c/g   // 匹配2-5个b
const row = 'abc abbc abbbc accc abcd'
match(rowReg, row)

// 纵向
const colReg = /a[abc]d/  // 匹配abc中的一个
const col = 'abcd abc aad'
match(colReg, col)


// 字符组  [abc]  只是其中一个字符
const strReg = /[abc]/
const noAbcReg = /[^abc]/ // 取反


const numberReg = /(?=.*[0-9])^[0-9A-Za-z]{6,12}$/
const numberStr = 'aa12345'
match(numberReg, numberStr)

var regex = /^((\d)(\d(\d)))\1\2\3\4$/;
var string = "1231231233";
match(regex, string)


