export const prefixeTransform = (val, otherCss) => {
    return Object.assign({
        transform: val,
        msTransform: val,
        oTransform: val,
        mozTransform: val,
        webkitTransform: val
    }, otherCss || {})
}
