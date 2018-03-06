import { has, isFunction } from '../utils/index.js';
export default (sizeEnum, numberEnum, defaultVal = '') => {
    return {
        props: {
            size: {
                type: [String, Number],
                validator(val) {
                    return has(sizeEnum, val) || has(numberEnum, val)
                }
            }
        },
        computed: {
            sizeVal() {
                return this.size || (isFunction(defaultVal) ? defaultVal() : defaultVal);
            }
        }
    }
}
