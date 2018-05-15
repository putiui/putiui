<script>
import { PtTabPlacement, options } from './options.js';
import baseMixin from '../../mixins/base.js';
import vqueryMixin from '../../mixins/vquery.js';
import { hasProp } from '../../utils/vnode.js';
export default {
    name: 'PtTabs',
    ptTag: 'PtTabs',
    mixins: [
        baseMixin,
        vqueryMixin
    ],
    props: {
        value: {
            type: null
        },
        placement: {
            type: String,
            default: options.placement,
            validator(val) {
                return !!PtTabPlacement[val]
            }
        }
    },
    data() {
        return {
            labelComponents: [],
            activeLabelSign: null,
            timer: null
        }
    },
    computed: {
        hasInputValue() {
            return hasProp(this, 'value');
        }
    },
    methods: {
        createLabel(h, labelSign, component, tabItem) {
            var isActive = false;
            if (this.hasInputValue) {
                if (tabItem.hasSignProp) {
                    isActive = this.value === tabItem.sign
                } else {
                    isActive = this.activeLabelSign === tabItem.labelSign
                }
            } else {
                isActive = this.activeLabelSign === tabItem.labelSign
            }
            return h('label', {
                'class': {
                    'pt-tab-label': true,
                    active: isActive
                },
                on: {
                    click: this.labelClick(labelSign)
                }
            }, [component]);
        },
        getTabChildren() {
            var arr = [];
            this.$slots.default.map(item => {
                if (item && item.componentOptions && item.componentOptions.Ctor && item.componentOptions.Ctor.options.ptTag === 'PtTab') {
                    arr.push(item.componentInstance)
                }
            });
            return arr;
        },
        getLabelComponents(h) {
            return this.labelComponents.map(item => {
                return this.createLabel(h, item[0], item[1], item[3])
            })
        },
        refreshLabel() {
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(() => {
                this.$set(this, 'labelComponents', this.getTabChildren().map((vm, i) => {
                    if (i == 0) {
                        if (this.activeLabelSign === null) {
                            this.activeLabelSign = vm.labelSign
                        }
                    }
                    return [vm.labelSign, vm.$slots && vm.$slots.label ? vm.$slots.label : vm.label, vm.sign, vm];
                }));
                this.timer = null;
            })
        },
        labelClick(labelSign) {
            var self = this;
            return function (event) {
                console.log(`labelSign=${labelSign}`)
                self.activeLabelSign = labelSign;
                var item = self.labelComponents.find(item => {
                    return item[0] === labelSign;
                });
                self.$emit('input', item[2])
            }
        }
    },
    render(h) {
        var coms = [];
        var slotDefault = h('div', {
            'class': {
                'pt-tab-panels': true
            }
        }, this.$slots.default);
        var labels = h('div', {
            'class': {
                'pt-tab-labels': true
            }
        }, this.getLabelComponents(h));
        if (this.placement === 'top' || this.placement === 'left') {
            coms.push(labels);
            coms.push(slotDefault)
        } else {
            coms.push(slotDefault)
            coms.push(labels);
        }
        return h('div', {
            'class': {
                'pt-tabs': true,
                ['pt-tabs-' + this.placement]: true
            }
        }, coms);
    }
}
</script>
