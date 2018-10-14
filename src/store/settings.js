/* eslint-disable default-case */
const SET_SETTINGS = "settings/SET_SETTINGS";

/**
 * @param {{}|null} state
 * @param {{
 *  type: string,
 *  payload: {},
 * }} action
 * @return {{}}
 */
export default function settingsReducer(state = null, action) {
    switch (action.type) {
        case SET_SETTINGS:
            return { ...state, ...action.payload };
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
