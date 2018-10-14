import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { createStore, compose } from "redux";
import rootReducer from "./store/rootReducer";
import { Provider } from "react-redux";
import path from "path";
import getUserPath from "./modules/getUserPath";
import { PAGE__MAIN } from "./store/page";
import { remote } from "electron";

const mainWindow = remote.getCurrentWindow();

// Adjust window height to the toolbar
const bounds = mainWindow.getBounds();
const desiredHeight = bounds.height;
const realHeight = window.innerHeight;
const heightDiff = desiredHeight - realHeight;
if (heightDiff > 0) {
    bounds.height = bounds.height + heightDiff;
    mainWindow.setBounds(bounds);
}

const composeEnhancers =
    mainWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultSettings = {
    saveDirPath: path.join(getUserPath(), "photos"),
    guidePath: "./assets/guide.png"
};

const defaultState = {
    settings: defaultSettings,
    page: PAGE__MAIN
};

const store = createStore(rootReducer, defaultState, composeEnhancers());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
