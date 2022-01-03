import React, {Component} from "react"

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "hello 1112"
        }
    }

    render() {
        return (<h2>{this.state.msg}</h2>)
    }
}

