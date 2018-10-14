import path from "path";
import getUserPath from "../modules/getUserPath";
import { PAGE__MAIN } from "./page";

export const defaultSettings = {
    saveDirPath: path.join(getUserPath(), "photos"),
    guidePath: "./assets/guide.png"
};

export default {
    settings: defaultSettings,
    page: PAGE__MAIN
};
