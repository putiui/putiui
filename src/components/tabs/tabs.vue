<script>
import { PtTabPlacement, options } from './options.js';
import baseMixin from '../../mixins/base.js';
import vqueryMixin from '../../mixins/vquery.js';
import { hasProp } from '../../utils/vnode.js';
import { isInValidModelValue, prefixeTransform } from '../../utils/index.js';
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
            labelSize: {}
        }
    },
    computed: {
        hasInputValue() {
            return hasProp(this, 'value');
        },
        sliderStyle() {
            var size = 0;
            var translateVal = 0;
            var max = this.activeLabelIndex;
            var sizeProp = 'width';
            if (this.placement === 'left' || this.placement === 'right') {
                sizeProp = 'height';
            }

            for (let i = 0; i <= max; i++) {
                var sizeItem = this.labelSize[i];
                if (sizeItem) {
                    if (i === max) {
                        size = sizeItem[sizeProp];
                    } else {
                        translateVal += sizeItem[sizeProp];
                    }
                }
            }
            var transformVal = '';
            if (this.placement === 'top' || this.placement === 'bottom') {
                transformVal = `translateX(${translateVal}px)`;
            } else if (this.placement === 'left' || this.placement === 'right') {
                transformVal = `translateY(${translateVal}px)`;
            }

            return prefixeTransform(transformVal, {
                [sizeProp]: size + 'px'
            })
        }
    },
    methods: {
        onLabelSizeChange(labelCom) {
            var index = labelCom.index;
            if (!this.labelSize[index] || this.labelSize[index].width !== labelCom.width || this.labelSize[index].height !== labelCom.height) {
                this.$set(this.labelSize, index, {
                    width: labelCom.width,
                    height: labelCom.height
                });
            }
        },
        createLabel(h, component, tabItem, index) {
            console.log(index);
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
        }
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
    created() {
        window.ss = this;
    }
}
</script>
