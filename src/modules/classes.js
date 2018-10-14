/**
 * @param {Array<string|Array>} classes
 * @return {string}
 */
export const classes = classes =>
    classes
        .map(cssClass => {
            if (Array.isArray(cssClass)) {
                if (Boolean(cssClass[0])) {
                    return cssClass[1];
                } else {
                    return false;
                }
            }

            return cssClass;
        })
        .filter(cssClass => Boolean(cssClass))
        .join(" ");
