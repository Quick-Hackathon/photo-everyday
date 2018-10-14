const SET_CONFIG = "config/SET_CONFIG";

/**
 * @param {{}|null} state
 * @param {{
 *  type: string,
 *  payload: {}
 * }} action
 * @return {{}}
 */
export default function configReducer(state = null, action) {
    // eslint-disable-next-line
    switch (action.type) {
        case SET_CONFIG:
            return action.payload;
    }

    return state;
}

/**
 * @param {{}|null} config
 * @return {{type: string, payload: {}}}
 */
export const setConfig = config => ({
    type: SET_CONFIG,
    payload: config
});
