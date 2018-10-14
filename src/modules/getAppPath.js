import isElectronDev from "electron-is-dev";
import { remote } from "electron";

/**
 * @return {string}
 */
export default function getAppPath() {
    if (isElectronDev) {
        return remote.app
            .getAppPath()
            .replace(/^(.*)\/node_modules.*default_app\.asar$/, "$1");
    } else {
        return remote.app.getAppPath();
    }
}
