import React, {Component} from "react"
import ReactDOM from "react-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "hello world"
        }
    }

    render() {
        return (<h2>{this.state.msg}</h2>)
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))