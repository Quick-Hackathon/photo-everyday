/* eslint-disable default-case */
const SET_SETTINGS = "settings/SET_SETTINGS";
const SET_SAVE_DIR_PATH = "settings/SET_SAVE_DIR_PATH";

/**
 * @param {{}|null} state
 * @param {{
 *  type: string,
 *  payload: *
 * }} action
 * @return {{}}
 */
export default function settingsReducer(state = null, action) {
    switch (action.type) {
        case SET_SETTINGS:
            return action.payload;
        case SET_SAVE_DIR_PATH:
            return {
                ...state,
                saveDirPath: action.payload
            };
    }

    return state;
}

/**
 * @param {{}} settings
 * @return {{type: string, payload: {}}}
 */
export const setSettings = settings => ({
    type: SET_SETTINGS,
    payload: settings
});

/**
 * @param {string} saveDirPath
 * @return {{type: string, payload: string}}
 */
export const setSaveDirPath = saveDirPath => ({
    type: SET_SAVE_DIR_PATH,
    payload: saveDirPath
});
