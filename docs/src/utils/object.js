export var readOnly = (obj, prop, value) => {
    if (Object.defineProperty) {
        Object.defineProperty(obj, prop, {
            value: value
        })
    } else {
        obj[prop] = value;
    }
}

export var getValue = (propExp, obj) => {
    try {
        var fun = new Function('obj', 'var result;try{result=obj.' + propExp + ';}catch(error){};return result;');
        return fun(obj);
    } catch (error) {
    }
};

export var setValue = (propExp, value, obj) => {
    try {
        var fun = new Function('obj', 'val', 'try{obj.' + propExp + '=val;}catch(error){};');
        fun(obj, value);
    } catch (error) {
    }
}
