
const animationNames = ['animation', 'WebkitAnimation', 'OAnimation', 'msAnimation', 'MozAnimation']
const animationTypes = {
    animation: [
        'animationstart',
        'animationend',
        'animationiteration'
    ],
    WebkitAnimation: [
        'webkitAnimationStart',
        'webkitAnimationEnd',
        'webkitAnimationIteration'
    ],
    OAnimation: [
        'oAnimationStart',
        'oAnimationEnd',
        'oAnimationIteration'
    ],
    msAnimation: [
        'MSAnimationStart',
        'MSAnimationEnd',
        'MSAnimationIteration'
    ],
    MozAnimation: [
        'mozAnimationStart',
        'mozAnimationEnd',
        'mozAnimationIteration'
    ]
}
const getAnimationType = el => {
    return animationNames.find(name => {
        return !!(('length' in el ? el[0] : el).style[name]);
    })
}
export const on = (el, eventName, handler, useCapture = false) => {
    if (!el || el.length === 0) return;
    var index = eventName.indexOf('.');
    var type = eventName;
    if (index !== -1) {
        type = eventName.substr(0, index);
    }
    var ai = animationTypes.animation.indexOf(type);
    if (ai !== -1) {
        var name = getAnimationType(el) || 'animation'
        type = animationTypes[name][ai];
    }

    const exec = el => {
        el.___listener = el.___listener || {};
        el.___listener[eventName] = el.___listener[eventName] || [];
        el.___listener[eventName].push(handler);

        el.addEventListener(type, handler, useCapture)
    }

    if ('length' in el) {
        Array.prototype.forEach.call(el, item => {
            exec(item)
        })
    } else {
        exec(el)
    }
}

export const off = (el, eventName, handler) => {
    if (!handler || !el.___listener) {
        return;
    }
    var index = eventName.indexOf('.');
    var type = eventName;
    if (index !== -1) {
        type = eventName.substr(0, index);
    }
    var ai = animationTypes.animation.indexOf(type);
    if (ai !== -1) {
        var name = getAnimationType(el) || 'animation'
        type = animationTypes[name][ai];
    }
    const exec = el => {
        handler = handler || el.___listener[eventName];
        if (Array.isArray(handler)) {
            handler.forEach(item => {
                el.removeEventListener(type, item)
            })
        } else {
            el.removeEventListener(type, handler)
        }
    }
    if ('length' in el) {
        Array.prototype.forEach.call(el, item => {
            exec(item)
        })
    } else {
        exec(el)
    }
}
