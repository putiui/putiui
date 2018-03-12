export const isFunction = (obj) => {
    return typeof obj === 'function' || obj instanceof Function;
}
export const isObject = (obj) => {
    return typeof obj === 'object';
}
export const isBoolean = (obj) => {
    return typeof obj === 'boolean';
}
export const isObjectBoolean = (obj) => {
    return Object.prototype.toString.call(this.model) === '[object Boolean]';
}
export const isEmptyObject = obj => {
    for (var prop in obj) {
        return false;
    }
    return true;
}
export const isString = (obj) => {
    return typeof obj === 'string';
}
export const isArray = obj => {
    return Array.isArray(obj);
}
export const isTypeArray = (obj, type) => {
    if (!isArray(obj)) return false;
    return obj.every(item => {
        return typeof item === type || (isFunction(type) && item instanceof type);
    });
}
export const isValidColSpan = val => {
    return val > 0 && val < 25 && Number.isInteger(val);
}

export const isPromise = obj => {
    return isObject(obj) && isFunction(obj.then);
}
