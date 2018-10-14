import electron from "electron";
import isElectronRenderer from "is-electron-renderer";

export default (isElectronRenderer ? electron.remote : electron);
