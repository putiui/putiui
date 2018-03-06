import { FlexAlign, FlexJustify } from '../enum';
import { isFunction, isObject } from '../utils/is';
export default (className = '', propName = 'flex', defaultVal = false) => {
    var { flex = 'flex', align = 'align', justify = 'justify', classProp = 'flexClassName' } = isObject(propName) ? propName : {
        flex: propName + ''
    };
    var { flexVal, alignVal = FlexAlign.top, justifyVal = FlexJustify.start } = isObject(defaultVal) ? defaultVal : {
        flex: defaultVal
    };
    var computeClassName = () => {
        return className ? className + '' : 'pt-flex';
    }
    var { flexClass = 'pt-flex', alignClass, justifyClass } = isObject(className) ? className : {
        flexClass: computeClassName() + '',
        alignClass(val) {
            return computeClassName() + '-' + val;
        },
        justifyClass(val) {
            return computeClassName() + '-' + val;
        }
    };
    return {
        props: {
            [flex]: {
                type: Boolean,
                default: flexVal
            },
            [align]: {
                type: String,
                default: alignVal,
                validator(val) {
                    return FlexAlign[val];
                }
            },
            [justify]: {
                type: String,
                default: justifyVal,
                validator(val) {
                    return FlexJustify[val];
                }
            }
        },
        computed: {
            [classProp]() {
                var result = [];
                if (this[flex]) {
                    if (flexClass) {
                        result.push(isFunction(flexClass) ? flexClass() : (flexClass + ''));
                    }
                    if (this[align] && alignClass) {
                        result.push(isFunction(alignClass) ? alignClass(this[align]) : (alignClass + ''));
                    }
                    if (this[justify] && justifyClass) {
                        result.push(isFunction(justifyClass) ? justifyClass(this[justify]) : (justifyClass + ''));
                    }
                }
                return result;
            },
            [classProp + 'String']() {
                var result = '';
                this[classProp].forEach((item) => {
                    if (item) {
                        if (result) {
                            result += ` ${item}`
                        } else {
                            result += item;
                        }
                    }
                });
                return result;
            }
        }
    }
}