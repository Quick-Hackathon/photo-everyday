const SET_SETTINGS = "settings/SET_SETTINGS";

/**
 * @param {{}|null} state
 * @param {{
 *  type: string,
 *  payload: {}
 * }} action
 * @return {{}}
 */
export default function settingsReducer(state = null, action) {
    // eslint-disable-next-line
    switch (action.type) {
        case SET_SETTINGS:
            return action.payload;
    }

    return state;
}

/**
 * @param {{}|null} settings
 * @return {{type: string, payload: {}}}
 */
export const setSettings = settings => ({
    type: SET_SETTINGS,
    payload: settings
});
