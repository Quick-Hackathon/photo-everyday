/* eslint-disable default-case */
const SET_PAGE = "page/SET_PAGE";

export const PAGE__MAIN = "PAGE__MAIN";
export const PAGE__SETTINGS = "PAGE__SETTINGS";

/**
 * @param {string|null} state
 * @param {{
 *  type: string,
 *  payload: string
 * }} action
 * @return {{}}
 */
export default function pageReducer(state = null, action) {
    switch (action.type) {
        case SET_PAGE:
            return action.payload;
    }

    return state;
}

/**
 * @param {string} page
 * @return {{type: string, payload: string}}
 */
export const setPage = page => ({
    type: SET_PAGE,
    payload: page
});
