export var isPromise = obj => {
    return obj && obj.then && obj.catch;
}

export var isMobilePhone = phone => {
    return /^1[34578]\d{9}$/.test(phone)
}

export const isVNode = (obj) => {
    return obj && obj.constructor && obj.constructor.name === 'VNode';
}
