import React from "react" // React
import ReactDOM from "react-dom" //

import { Provider } from "react-redux" // for Redux
import store from "./redux/store" //

import { App } from "./App"
import "./assets/style/index.scss"

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)
