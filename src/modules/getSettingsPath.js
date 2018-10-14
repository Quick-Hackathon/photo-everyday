import path from "path";
import getUserPath from "./getUserPath";

/**
 * @return {string}
 */
export default function getSettingsPath() {
    return path.join(getUserPath(), "settings.json");
}
