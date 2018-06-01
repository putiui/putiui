<script>
import { PtTabPlacement, options } from './options.js';
import baseMixin from '../../mixins/base.js';
import vqueryMixin from '../../mixins/vquery.js';
import { hasProp } from '../../utils/vnode.js';
import { isInValidModelValue, prefixeTransform } from '../../utils/index.js';
import debounce from 'lodash.debounce';
import PtTabLabel from './tab-label';
import PtTabNav from './tab-nav';
const navSlots = {
    top: 'labelsTop',
    right: 'labelsRight',
    bottom: 'labelsBottom',
    left: 'labelsLeft',
    begin: 'overflowBegin',
    end: 'overflowEnd',
    slider: 'slider'
}
export default {
    name: 'PtTabs',
    ptTag: 'PtTabs',
    mixins: [
        baseMixin,
        vqueryMixin
    ],
    components: {
        PtTabLabel,
        PtTabNav
    },
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
            timer: null,
            activeLabelIndex: 0,
            labelMeta: {},
            $updatedQueue: {}
        }
    },
    computed: {
        hasInputValue() {
            return hasProp(this, 'value');
        }
    },
    methods: {
        onLabelSizeChange(labelCom) {
            var index = labelCom.index;
            if (!this.labelMeta[index] || this.labelMeta[index].width !== labelCom.width || this.labelMeta[index].height !== labelCom.height) {
                this.$set(this.labelMeta, index, {
                    width: labelCom.width,
                    height: labelCom.height,
                    sign: labelCom.sign
                });
            }
        },
        createLabel(h, component, tabItem, index) {
            return h('PtTabLabel', {
                key: 'PtTabLabel' + index,
                props: {
                    active: tabItem.isActive,
                    index,
                    sign: tabItem.labelSign
                },
                nativeOn: {
                    click: this.labelClick(tabItem.labelSign, index)
                },
                on: {
                    // label size变化后
                    size: this.onLabelSizeChange
                }
            }, [component]);
        },
        getTabChildren(childs) {
            var arr = [];
            childs.forEach(item => {
                if (item.componentOptions) {
                    if (item.componentOptions.Ctor && item.componentOptions.Ctor.options.ptTag === 'PtTab') {
                        arr.push(item.componentInstance)
                    } else if (item.componentOptions.tag === 'keep-alive') {
                        if (item.componentInstance && item.componentInstance.$slots && item.componentInstance.$slots.default) {
                            arr = arr.concat(this.getTabChildren(item.componentInstance.$slots.default))
                        }
                    }
                }
            });
            return arr;
        },
        getLabelComponents(h) {
            return this.labelComponents.map((item, index) => {
                return this.createLabel(h, item[1], item[3], index)
            })
        },
        refreshLabel() {
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(() => {
                this.$nextTick(() => {
                    this.$set(this, 'labelComponents', this.getTabChildren(this.$slots.default).map((vm, i) => {
                        if (i == 0) {
                            if (isInValidModelValue(this.value) || this.value === '') {
                                this.$emit('input', vm.iSign)
                            }
                        }
                        vm.inParentIndex = i;
                        if (vm.isActive) {
                            this.activeLabelIndex = i;
                        }
                        return [vm.labelSign, vm.$slots && vm.$slots.label ? vm.$slots.label : vm.label, vm.sign, vm];
                    }));
                    this.timer = null;
                })
            })
        },
        labelClick(labelSign, index) {
            var self = this;
            return function (event) {
                var item = self.labelComponents.find(item => {
                    return item[0] === labelSign;
                });
                self.$emit('input', item[3].iSign);
            }
        },
        setTabForIndex(index) {
            var self = this;
            var labelSign = this.labelMeta[index].sign;
            var item = self.labelComponents.find(item => {
                return item[0] === labelSign;
            });
            if (item) {
                self.$emit('input', item[3].iSign);
            }
            // item可能为空，是因为用户可能动态删除了某个tab
        },
        execUpdatedQueue: debounce(function () {
            console.log(`tabs update queue.`);
            Object.keys(this.$data.$updatedQueue).forEach(key => {
                var item = this.$data.$updatedQueue[key];
                item[0].call(item[1]);
            })
        }, 300)
    },
    render(h) {
        var self = this;
        var coms = [];
        var slotDefault = h('div', {
            'class': {
                'pt-tabs-panels': true
            }
        }, this.$slots.default);
        var scopedSlots = {};
        Object.keys(navSlots).forEach(key => {
            var val = navSlots[key];
            if (this.$slots[val]) {
                scopedSlots[key] = function (props) {
                    return self.$slots[val]
                };
            }
        });
        var labels = h('PtTabNav', {
            scopedSlots
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
    },
    updated() {
        console.log(`tabs updated`)
        this.execUpdatedQueue();
    }
}
</script>
