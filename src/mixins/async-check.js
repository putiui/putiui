import { isFunction, isPromise } from '../utils/is.js';
export default (beforeProp, setCheckVal, execBefore) => {
    var beforeName = beforeProp.name;
    return {
        props: {
            [beforeName]: beforeProp
        },
        data() {
            return {
                _checkQueue: [],
                _asyncCheckPromise: null,
                lastCheckVal: undefined
            }
        },
        methods: {
            fireCheckQueue() {
                this.$data._checkQueue.forEach(item => {
                    item();
                })
                this.$data._checkQueue = [];
            },
            asyncCheck(checkVal, append = false) {
                this.lastCheckVal = checkVal
                if (!isFunction(this[beforeName])) {
                    return setCheckVal.call(this, checkVal);
                }
                if (!append) {
                    this.$data._checkQueue = [];
                }
                this.$data._checkQueue.push(() => {
                    setCheckVal.call(this, checkVal);
                });
                if (!this.$data._asyncCheckPromise) {
                    execBefore && execBefore.call(this, checkVal)
                    this.$data._asyncCheckPromise = new Promise((resolve, reject) => {
                        var res = this[beforeName](checkVal);
                        if (res === true) {
                            resolve();
                            this.$data._asyncCheckPromise = null;
                            this.fireCheckQueue();
                        } else if (isPromise(res)) {
                            res.then(() => {
                                resolve();
                                this.$data._asyncCheckPromise = null;
                                this.fireCheckQueue();
                            }).catch(err => {
                                reject(err);
                                this.$data._asyncCheckPromise = null;
                                this.$data._checkQueue = [];
                            })
                        } else {
                            reject();
                            this.$data._asyncCheckPromise = null;
                            this.$data._checkQueue = [];
                        }
                    })
                }
                return this.$data._asyncCheckPromise;
            }
        },
        created() {
            console.log(this)
        }
    }
}
