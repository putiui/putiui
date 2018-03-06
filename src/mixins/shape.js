import { has, isFunction } from '../utils/index.js';
export default (shapeEnum, defaultVal = '', multi = true) => {
    return {
        props: {
            shape: {
                type: [String, Array],
                validator(val) {
                    return Array.isArray(val) ? val.every(item => item === '' || has(shapeEnum, item)) : (val === '' || has(shapeEnum, val));
                }
            }
        },
        computed: {
            shapeVal() {
                let arr = [];
                if (this.shape && this.shape.length > 0) {
                    if (Array.isArray(this.shape)) {
                        this.shape.forEach(item => {
                            if (item && (item + '').trim() !== '') {
                                arr.push(item + '');
                            }
                        })
                    } else {
                        arr.push(this.shape + '');
                    }
                } else if (defaultVal) {
                    const val = isFunction(defaultVal) ? defaultVal.call(this) : defaultVal + '';
                    val && arr.push(val);
                }
                if (!multi && arr.length > 0) {
                    arr = [arr[0]];
                }
                return arr;
            },
            shapeClassName() {
                return this.shapeVal && this.shapeVal.length > 0 ? this.shapeVal.map(item => {
                    return `pt-shape-${item}`;
                }).join(' ') : '';
            }
        }
    }
}
