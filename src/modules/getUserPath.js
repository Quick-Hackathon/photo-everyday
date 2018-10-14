import path from "path";
import Electron from "./Electron";
import isElectronDev from "electron-is-dev";
import getAppPath from "./getAppPath";

/**
 * @return {string}
 */
export default function getUserPath() {
    if (isElectronDev) {
        return path.join(getAppPath(), "data");
    } else {
        return Electron.app.getPath("userData");
    }
}
