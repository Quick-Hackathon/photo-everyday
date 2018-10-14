import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./css/font-awesome.css";
import App from "./components/App/App";
import { Provider } from "react-redux";
import Electron from "./modules/Electron";
import getStore from "./store/getStore";

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

const store = getStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
