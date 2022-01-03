// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./react_main.jsx"
// ReactDOM.render(<App/>, document.getElementById('app'))

import Vue from 'vue'
import VueApp from "./App.vue";

new Vue({
    render: h => h(VueApp)
}).$mount('#vueapp')
