import React from "react";
import { render } from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import { Provider } from "react-redux";
import store from "./redux/store";

render(
    // Wrapping up the App to make it aware of the store
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
