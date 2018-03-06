import { uniqueID, isObject, isFunction, isString, isEmptyObject, isTypeArray, isArray } from '../utils/index.js';
export default {
    props: {
        options: [Array, Object],
        labelOption: [String, Function],
        valueOption: [String, Function],
        valueType: Function,
        optionKey: Function
    },
    computed: {
        iOptions() {
            return this.options;
        },
        optionsType() {
            if (isObject(this.iOptions)) {
                return isArray(this.iOptions) ? 'array' : 'object';
            } else {
                return '';
            }
        },
        isValidOptions() {
            var opsType = this.optionsType;
            if (!opsType) {
                return false;
            } else if (opsType === 'array') {
                return this.iOptions.length > 0;
            } else {
                return !isEmptyObject(this.iOptions);
            }
        },
        opsIsStringArray() {
            return isTypeArray(this.iOptions, 'string');
        },
        opsIsObjectArray() {
            return isTypeArray(this.iOptions, 'object');
        },
        labelOptionPrecut() {
            var opsType = this.optionsType;
            if (opsType === 'array') {
                if (this.opsIsStringArray) {
                    return '$value';
                } else if (this.opsIsObjectArray) {
                    return 'label';
                } else {
                    return '$value';
                }
            } else {
                return '$value';
            }
        },
        valueOptionPrecut() {
            var opsType = this.optionsType;
            if (opsType === 'array') {
                if (this.opsIsStringArray) {
                    return '$value';
                } else if (this.opsIsObjectArray) {
                    return 'value';
                } else {
                    return '$value';
                }
            } else if (opsType === 'object') {
                return '$prop';
            } else {
                return '$value';
            }
        }
    },
    methods: {
        getValForString(target, item, index) {
            if (target === '$prop') {
                return index;
            }
            if (target === '$value') {
                return item;
            }
            return target === '' ? item : item[target];
        },
        getLabelOptVal(item, index) {
            if (isFunction(this.labelOption)) {
                return this.labelOption(item, index);
            } else if (isString(this.labelOption)) {
                return this.getValForString(this.labelOption, item, index);
            } else {
                return this.getValForString(this.labelOptionPrecut, item, index);
            }
        },
        getValueOptVal(item, index) {
            var val;
            if (isFunction(this.valueOption)) {
                val = this.valueOption(item, index);
            } else if (isString(this.valueOption)) {
                val = this.getValForString(this.valueOption, item, index);
            } else {
                val = this.getValForString(this.valueOptionPrecut, item, index);
            }
            if (isFunction(this.valueType)) {
                return this.valueType(val);
            } else {
                return val;
            }
        },
        getOptItemKey(item, index) {
            if (isFunction(this.optionKey)) {
                return this.optionKey(item, index);
            } else {
                return uniqueID();
            }
        }
    }
}