export * from './object';
export * from './dom';
export * from './check';
export * from './date';

export var copy = (() => {
    var deselectCurrent = function () {
        var selection = document.getSelection();
        if (!selection.rangeCount) {
            return function () { };
        }
        var active = document.activeElement;

        var ranges = [];
        for (var i = 0; i < selection.rangeCount; i++) {
            ranges.push(selection.getRangeAt(i));
        }

        /* eslint-disable */
        switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
            case 'INPUT':
            case 'TEXTAREA':
                active.blur();
                break;
            default:
                active = null;
                break;
        }

        selection.removeAllRanges();
        return function () {
            selection.type === 'Caret' &&
                selection.removeAllRanges();

            if (!selection.rangeCount) {
                ranges.forEach(function (range) {
                    selection.addRange(range);
                });
            }

            active &&
                active.focus();
        };
    };

    function copy(text, options) {
        var debug, cb, reselectPrevious, range, selection, mark;
        if (!options) { options = {}; }
        debug = options.debug || false;
        cb = options.cb || Function.prototype;
        try {
            reselectPrevious = deselectCurrent();

            range = document.createRange();
            selection = document.getSelection();

            mark = document.createElement('mark');
            mark.textContent = text;
            // used to conserve newline, etc
            mark.style.whiteSpace = 'pre';
            document.body.appendChild(mark);

            range.selectNode(mark);
            selection.addRange(range);

            var successful = document.execCommand('copy');
            if (!successful) {
                throw new Error('copy command was unsuccessful');
            } else {
                // alert('链接地址已经复制！');
            }
        } catch (err) {
            debug && console.error('unable to copy, trying IE specific stuff');
            try {
                window.clipboardData.setData('text', text);
            } catch (err) {
                debug && console.error('unable to copy, falling back to prompt');
                // window.prompt(message, text);
            }
        } finally {
            cb(null);
            if (selection) {
                if (typeof selection.removeRange == 'function') {
                    selection.removeRange(range);
                } else {
                    selection.removeAllRanges();
                }
            }

            if (mark) {
                document.body.removeChild(mark);
            }
            reselectPrevious();
        }
    }
    return text => {
        try {
            copy(text);
            return true;
        } catch (error) {
            return false;
        }
    }
})();

// jQuery版extend函数
export var extend = function () {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false,
        toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty,
        class2type = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regexp',
            '[object Object]': 'object'
        },
        jQuery = {
            isFunction: function (obj) {
                return jQuery.type(obj) === 'function'
            },
            isArray: Array.isArray ||
                function (obj) {
                    return jQuery.type(obj) === 'array'
                },
            isWindow: function (obj) {
                return obj != null && obj == obj.window
            },
            isNumeric: function (obj) {
                return !isNaN(parseFloat(obj)) && isFinite(obj)
            },
            type: function (obj) {
                return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object'
            },
            isPlainObject: function (obj) {
                if (!obj || jQuery.type(obj) !== 'object' || obj.nodeType) {
                    return false
                }
                try {
                    if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
                        return false
                    }
                } catch (e) {
                    return false
                }
                var key;
                for (key in obj) { }
                return key === undefined || hasOwn.call(obj, key)
            }
        };
    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        i = 2;
    }
    if (typeof target !== 'object' && !jQuery.isFunction(target)) {
        target = {}
    }
    if (length === i) {
        target = this;
        --i;
    }
    for (i; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) {
                    continue
                }
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : []
                    } else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }
                    // WARNING: RECURSION
                    target[name] = extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}

export var uniqueID = () => {
    return (Math.random() + '').replace('0.', '');
}
export function formatNumber(num, precision, separator) {
    var parts;
    // 判断是否为数字
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
        // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
        // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
        // 的值变成了 12312312.123456713
        num = Number(num);
        // 处理小数点位数
        num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
        // 分离数字的小数部分和整数部分
        parts = num.split('.');
        // 整数部分加[separator]分隔, 借用一个著名的正则表达式
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

        return parts.join('.');
    }
    return NaN;
}

var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
export const colorRgb = function (str) {
    var sColor = str.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = '#';
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
        }
        return sColorChange.join(',');
    } else {
        return sColor;
    }
};
