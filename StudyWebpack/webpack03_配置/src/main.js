import './css/index.css'
import './css/component.less'
import lu from "./img/lu.jpeg"

const divEl = document.createElement("div")
const image = new Image()
image.src = lu //加defalut是因为file-loader版本问题
divEl.appendChild(image)
document.body.appendChild(divEl)