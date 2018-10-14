import path from "path";
import { remote } from "electron";
import isElectronDev from "electron-is-dev";
import getAppPath from "./getAppPath";

/**
 * @return {string}
 */
export default function getUserPath() {
    if (isElectronDev) {
        return path.join(getAppPath(), "data");
    } else {
        return remote.app.getPath("userData");
    }
}
