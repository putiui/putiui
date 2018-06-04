export var getComputedStyle = (() => {
    var handler;
    if (window.getComputedStyle) {
        handler = el => {
            return window.getComputedStyle(el);
        }
    } else if (document.defaultView.getComputedStyle) {
        handler = el => {
            return document.defaultView.getComputedStyle(el);
        }
    } else if (document.body.currentStyle) {
        handler = el => {
            return el.currentStyle;
        }
    } else {
        handler = el => {
            return el.style;
        }
    }
    return el => {
        return handler(el);
    }
})();

export const closest = (el, selector) => {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el;
}
