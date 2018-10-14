import isElectronDev from "electron-is-dev";
import Electron from "./Electron";

/**
 * @return {string}
 */
export default function getAppPath() {
    if (isElectronDev) {
        return Electron.app
            .getAppPath()
            .replace(/^(.*)\/node_modules.*default_app\.asar$/, "$1");
    } else {
        return Electron.app.getAppPath();
    }
}
