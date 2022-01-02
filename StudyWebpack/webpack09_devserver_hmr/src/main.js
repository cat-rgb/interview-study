import React from "react";
import ReactDOM from "react-dom";
import App from "./react_main.jsx"
import Vue from 'vue'
import VueApp from "./App.vue";

function sum(sum1, sum2) {
    return sum1 + sum2
}

sum(100, 200)
console.log(sum(100, 310))

// if(module.hot) {
//     module.hot.accept()
// }

ReactDOM.render(<App/>, document.getElementById('app'))


new Vue({
    render: h => h(VueApp)
}).$mount('#vueapp')