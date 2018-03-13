import { isObjectBoolean, isBoolean } from '../utils/is.js';
import { uniqueID } from '../utils/index.js';
import { hasProp } from '../utils/vnode.js';
export default (parentTag) => {
    return {
        props: {
            sign: {
                type: String,
                required: true
            },
            title: {
                type: String
            },
            router: {
                type: Boolean
            },
            'router-replace': Boolean,
            to: {
                type: String
            },
            target: {
                type: String
            },
            align: {
                type: String
            },
            disabled: Boolean
        },
        data() {
            return {
                focus: false
            }
        },
        computed: {
            hasRouter() {
                return this.$router
            },
            parentMenuBox() {
                return this.$vqClosest(parentTag);
            },
            href() {
                if (this.iRouter) {
                    if (this.to) {
                        if (this.to.indexOf('#') !== -1) {
                            return this.to;
                        } else {
                            return '#' + this.to;
                        }
                    } else {
                        return undefined;
                    }
                } else {
                    return this.to;
                }
            },
            iAlign() {
                return this.align || (this.parentMenuBox && this.parentMenuBox.iAlign)
            },
            iRouter() {
                if (hasProp(this, 'router') && (isBoolean(this.router) || isObjectBoolean(this.router))) {
                    return this.router.valueOf();
                }
                return this.parentMenuBox && this.parentMenuBox.iRouter;
            },
            iRouterReplace() {
                var prop = 'router-replace';
                if (hasProp(this, prop) && (isBoolean(this[prop]) || isObjectBoolean(this[prop]))) {
                    return this[prop].valueOf();
                }
                return this.parentMenuBox && this.parentMenuBox.iRouterReplace;
            }
        },
        methods: {
            userClickCore(event) {
                if (this.iTrigger === 'click') {
                    this.userExec(event);
                }
            },
            userKeydownCore(e) {
                if (!e) return;
                if (e.keyCode == 13) {
                    this.userExec(e);
                }
            }
        }
    }
}
