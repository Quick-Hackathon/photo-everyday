import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { createStore, compose } from "redux";
import rootReducer from "./store/rootReducer";
import { Provider } from "react-redux";
import path from "path";
import getUserPath from "./modules/getUserPath";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultSettings = {
    saveDirPath: path.join(getUserPath(), "photos"),
    guidePath: "./assets/guide.png"
};

const defaultState = {
    settings: defaultSettings
};

const store = createStore(rootReducer, defaultState, composeEnhancers());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
