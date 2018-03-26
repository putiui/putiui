<template>
    <PtBox tag="nav" :class="{
        'pt-menu':true,
        ['pt-menu-'+iDirection]:true,
        ['pt-menu-'+iAlign]:true,
        ['is-collapsed']:collapsed
    }">
        <slot></slot>
    </PtBox>
</template>

<script>
import { has, isObjectBoolean, isBoolean, isObject, isString } from '../../utils/index.js';
import { hasProp } from '../../utils/vnode.js';
import baseMixin from '../../mixins/base.js';
import vqueryMixin from '../../mixins/vquery.js';
import { PtMenuDirection, PtMenuAlign, PtMenuPlacement, options } from './options.js';
export default {
    name: 'PtMenu',
    ptTag: 'PtMenu',
    mixins: [baseMixin, vqueryMixin],
    props: {
        placement: {
            type: String,
            default() {
                return options.placement || PtMenuPlacement.auto;
            }
        },
        direction: {
            type: String,
            default() {
                return options.direction || PtMenuDirection.horizontal;
            },
            validator(val) {
                return has(PtMenuDirection, val);
            }
        },
        value: {
            type: [String, Object]
        },
        collapsed: {
            type: Boolean,
            default() {
                return options.collapsed;
            }
        },
        trigger: {
            type: String,
            default() {
                return options.trigger || 'hover';
            }
        },
        route: {
            type: Boolean
        },
        'route-replace': {
            type: Boolean
        },
        align: {
            type: String,
            default() {
                return options.align || 'left';
            }
        }
    },
    data() {
        return {
            privateOpenedSubMenus: [],
            privateActiveSign: ''
        }
    },
    computed: {
        iTrigger() {
            return this.trigger || options.trigger || 'hover';
        },
        iPlacement() {
            return this.placement || options.placement || PtMenuPlacement.auto
        },
        iDirection() {
            return this.direction || options.direction || PtMenuDirection.horizontal;
        },
        iAlign() {
            return this.align || options.align || PtMenuAlign.left;
        },
        iRoute() {
            if (hasProp(this, 'route') && (isBoolean(this.route) || isObjectBoolean(this.route))) {
                return this.route.valueOf();
            }
            return options.route;
        },
        iRouterReplace() {
            var prop = 'route-replace';
            if (hasProp(this, prop) && (isBoolean(this[prop]) || isObjectBoolean(this[prop]))) {
                return this[prop].valueOf();
            }
            return options[prop];
        },
        openedSubMenus: {
            get() {
                if (hasProp(this, 'value') && isObject(this.value)) {
                    return this.value.opened;
                } else {
                    return this.privateOpenedSubMenus;
                }
            },
            set(val) {
                if (hasProp(this, 'value') && isObject(this.value)) {
                    this.$emit('input', Object.assign({}, this.value, {
                        opened: val || []
                    }))
                } else {
                    this.$set(this, 'privateOpenedSubMenus', val || []);
                }
            }
        },
        activeSign: {
            get() {
                if (hasProp(this, 'value') && isObject(this.value)) {
                    return this.value.active;
                } else if (hasProp(this, 'value') && isString(this.value)) {
                    return this.value;
                } else {
                    return this.privateActiveSign;
                }
            },
            set(val) {
                if (hasProp(this, 'value') && isObject(this.value)) {
                    this.$emit('input', Object.assign({}, this.value, {
                        opened: val
                    }));
                } else if (hasProp(this, 'value') && isString(this.value)) {
                    this.$emit('input', val);
                } else {
                    this.$set(this, 'privateActiveSign', val);
                }
            }
        },
        hasSelectListener() {
            return this.$listeners && this.$listeners['select'];
        }
    },
    methods: {
        open(sign) {
            this.$vqFind('PtSubMenu').forEach(item => {
                if (item.sign === sign) {
                    item.open();
                    return false;
                }
            })
        },
        close(sign) {
            this.$vqFind('PtSubMenu').forEach(item => {
                if (item.sign === sign) {
                    item.close();
                    return false;
                }
            })
        }
    }
}
</script>
