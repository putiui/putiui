<template>
    <div class="pt-tabs-nav">
        {{leftWidth}} {{rightWidth}}
        <div v-if="$scopedSlots.top" class="pt-tabs-labels-top">
            <slot name="top"></slot>
        </div>
        <div class="pt-tabs-labels">
            <div ref="left" v-if="$scopedSlots.left" class="pt-tabs-labels-left">
                <div class="pt-tabs-slot">
                    <slot name="left"></slot>
                </div>
            </div>
            <div class="pt-tabs-labels-center" :style="{width: labelsCenterWidthVal}">
                <div class="pt-tabs-overflow">
                    <div ref="begin" v-if="isOverflow && showBegin" class="pt-tabs-overflow-begin">
                        <div class="pt-tabs-slot">
                            <slot name="begin"></slot>
                        </div>
                    </div>
                    <div class="pt-tabs-overflow-body">
                        <div class="pt-tabs-labels-core" :style="{maxWidth:labelsCenterWidthVal,width:labelsCoreWidth}">
                            <div class="pt-tabs-slider" :style="sliderStyle">
                                <slot name="slider"></slot>
                            </div>
                            <slot></slot>
                        </div>
                    </div>
                    <div ref="end" v-if="isOverflow && showEnd" class="pt-tabs-overflow-end">
                        <div class="pt-tabs-slot">
                            <slot name="end"></slot>
                        </div>
                    </div>
                </div>
            </div>
            <div ref="right" v-if="$scopedSlots.right" class="pt-tabs-labels-right">
                <div class="pt-tabs-slot">
                    <slot name="right"></slot>
                </div>
            </div>
        </div>
        <div v-if="$scopedSlots.bottom" class="pt-tabs-labels-bottom">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>

<script>
import baseMixin from '../../mixins/base.js';
import vqueryMixin from '../../mixins/vquery.js';
import viewMixin from '../../mixins/view.js';
import { prefixeTransform } from '../../utils/index.js';
export default {
    name: 'PtTabNav',
    ptTag: 'PtTabNav',
    mixins: [
        baseMixin,
        vqueryMixin,
        viewMixin
    ],
    data() {
        return {
            isOverflow: false,
            showBegin: false,
            showEnd: false,
            totalWidth: 0,
            leftWidth: 0,
            rightWidth: 0,
            labelsCoreWidth: null,
            calcSizeTimer: null
        }
    },
    computed: {
        parentTabs() {
            return this.$vqClosest('PtTabs');
        },
        sliderStyle() {
            if (!this.parentTabs) return;
            var size = 0;
            var translateVal = 0;
            var max = this.parentTabs.activeLabelIndex;
            var placement = this.parentTabs.placement;
            var labelSize = this.parentTabs.labelSize;
            var sizeProp = 'width';
            if (placement === 'left' || placement === 'right') {
                sizeProp = 'height';
            }

            for (let i = 0; i <= max; i++) {
                var sizeItem = labelSize[i];
                if (sizeItem) {
                    if (i === max) {
                        size = sizeItem[sizeProp];
                    } else {
                        translateVal += sizeItem[sizeProp];
                    }
                }
            }
            var transformVal = '';
            if (placement === 'top' || placement === 'bottom') {
                transformVal = `translateX(${translateVal}px)`;
            } else if (placement === 'left' || placement === 'right') {
                transformVal = `translateY(${translateVal}px)`;
            }

            return prefixeTransform(transformVal, {
                [sizeProp]: size + 'px'
            })
        },
        labelsCenterWidth() {
            var val = this.totalWidth - (this.leftWidth + this.rightWidth);
            return val;
        },
        labelsCenterWidthVal() {
            var val = this.labelsCenterWidth;
            return val <= 0 ? 0 : (val > 0 ? (val + 'px') : undefined);
        }
    },
    methods: {
        getTotalWidth() {
            return this.$el ? this.$el.clientWidth : 0;
        },
        getLeftWidth() {
            var el = this.$el ? this.$el.querySelectorAll('.pt-tabs-labels-left>.pt-tabs-slot') : null;
            if (el && el.length > 0) {
                el = el[0];
            }
            return el ? el.clientWidth : 0;
        },
        getRightWidth() {
            var el = this.$el ? this.$el.querySelectorAll('.pt-tabs-labels-right>.pt-tabs-slot') : null;
            if (el && el.length > 0) {
                el = el[0];
            }
            return el ? el.clientWidth : 0;
        },
        calcSize() {
            if (this.calcSizeTimer) {
                clearTimeout(this.calcSizeTimer)
            }
            this.calcSizeTimer = setTimeout(() => {
                this.totalWidth = this.getTotalWidth();
                this.leftWidth = this.getLeftWidth();
                this.rightWidth = this.getRightWidth();
                this.calcSizeTimer = null;
                console.log(this.totalWidth, this.labelsCenterWidth)
            })
        }
    },
    created() {
        this.$on('viewResize', data => {
            this.calcSize();
        })
    },
    mounted() {
        this.calcSize();
    },
    updated() {
        this.calcSize();
    }
}
</script>

