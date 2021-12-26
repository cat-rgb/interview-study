import './css/index.css'
import './css/component.less'

const divEl = document.createElement("div")
const image =  new Image()
image.src = require("./img/lu.jpeg").default //加defalut是因为file-loader版本问题
divEl.appendChild(image)
document.body.appendChild(divEl)