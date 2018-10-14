import { compose, createStore } from "redux";
import rootReducer from "./rootReducer";
import defaultState from "./defaultState";
import getSettingsPath from "../modules/getSettingsPath";
import fse from "fs-extra";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const settingsPath = getSettingsPath();

let settings = {};
try {
    settings = fse.readJsonSync(settingsPath) || {};
} catch (error) {
    console.log("Not existing or invalid settings file", error);
    settings = {};
}

const state = {
    ...defaultState,
    settings: {
        ...defaultState.settings,
        ...settings,
    },
};

export default () => createStore(rootReducer, state, composeEnhancers());
