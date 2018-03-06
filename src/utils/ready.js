import * as browser from './browser.js';
let fireQueue;

window.___READY_STORE___ = typeof window.___READY_STORE___ === 'undefined' ? {
    readyBound: false,
    isReady: false,
    queue: new Promise((resolve, reject) => {
        fireQueue = resolve;
    })
} : window.___READY_STORE___;
let readyStore = window.___READY_STORE___;

const fire = () => {
    if (readyStore.isReady) return;
    readyStore.isReady = true;
    fireQueue();
}

const bindReady = () => {
    if (readyStore.readyBound) return;
    readyStore.readyBound = true;
    if (document.addEventListener && !browser.opera) {
        document.addEventListener("DOMContentLoaded", fire, false);
    }
    if (browser.msie && window == top) (function () {
        if (readyStore.isReady) return;
        try {
            document.documentElement.doScroll("left");
        } catch (error) {
            setTimeout(fire, 0);
            return;
        }
    })();
    if (browser.opera)
        document.addEventListener("DOMContentLoaded", function () {
            if (readyStore.isReady) return;
            for (var i = 0; i < document.styleSheets.length; i++) {
                if (document.styleSheets[i].disabled) {
                    setTimeout(fire, 0);
                    return;
                }
            }
        }, false);
    if (browser.safari) {
        var numStyles;
        (function () {
            if (readyStore.isReady) return;
            if (document.readyState != "loaded" && document.readyState != "complete") {
                setTimeout(fire, 0);
                return;
            }
        })();
    }
    window.addEventListener && window.addEventListener('load', fire, false);
}
export default (...handlers) => {
    bindReady();
    handlers.forEach(item => {
        if (readyStore.isReady) {
            item()
        } else {
            readyStore.queue.then(() => {
                try {
                    item();
                } catch (error) {
                }
            });
        }
    });
}