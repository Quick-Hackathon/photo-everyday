import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, compose } from "redux";
import rootReducer from "./store/rootReducer";
import { Provider } from "react-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultConfig = {
    test: "ok"
};

const defaultState = {
    config: defaultConfig
};

const store = createStore(rootReducer, defaultState, composeEnhancers());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
