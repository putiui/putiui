import { isObjectBoolean, isBoolean } from '../utils/is.js';
import { uniqueID } from '../utils/index.js';
import { hasProp } from '../utils/vnode.js';
export default (parentTag) => {
    return {
        props: {
            sign: {
                type: [Number, String],
                required: true
            },
            title: {
                type: String
            },
            route: {
                type: Boolean
            },
            'route-replace': Boolean,
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
            rootMenu() {
                return this.$vqClosest('PtMenu');
            },
            parentMenuBox() {
                return this.$vqClosest(parentTag);
            },
            href() {
                if (this.iRoute) {
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
            iRoute() {
                if (hasProp(this, 'route') && (isBoolean(this.route) || isObjectBoolean(this.route))) {
                    return this.route.valueOf();
                }
                return this.parentMenuBox && this.parentMenuBox.iRoute;
            },
            iRouteReplace() {
                var prop = 'router-replace';
                if (hasProp(this, prop) && (isBoolean(this[prop]) || isObjectBoolean(this[prop]))) {
                    return this[prop].valueOf();
                }
                return this.parentMenuBox && this.parentMenuBox.iRouteReplace;
            }
        }
    }
}
