import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { createStore, compose } from "redux";
import rootReducer from "./store/rootReducer";
import { Provider } from "react-redux";
import defaultState from "./store/defaultState";
import Electron from "./modules/Electron";

const mainWindow = Electron.getCurrentWindow();

// Adjust window height to the toolbar
const bounds = mainWindow.getBounds();
const desiredHeight = bounds.height;
const realHeight = window.innerHeight;
const heightDiff = desiredHeight - realHeight;
if (heightDiff > 0) {
    bounds.height = bounds.height + heightDiff;
    mainWindow.setBounds(bounds);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, defaultState, composeEnhancers());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
