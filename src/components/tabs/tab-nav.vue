<template>
    <div class="pt-tabs-nav">
        <div class="pt-tabs-labels-top">
            <slot name="top"></slot>
        </div>
        <div class="pt-tabs-labels">
            <div class="pt-tabs-labels-left">
                <div class="pt-tabs-slot">
                    <slot name="left"></slot>
                </div>
            </div>
            <div class="pt-tabs-labels-center" :style="{width: centerWidthVal}">
                <div class="pt-tabs-overflow">
                    <div v-if="isOverflow && showPrev" class="pt-tabs-overflow-prev">
                        <div class="pt-tabs-slot">
                            <slot name="prev"></slot>
                        </div>
                    </div>
                    <div class="pt-tabs-overflow-content">
                        <div class="pt-tabs-labels-core">
                            <div class="pt-tabs-slider" :style="sliderStyle">
                                <slot name="slider"></slot>
                            </div>
                            <div class="pt-tabs-labels-begin">
                                <div class="pt-tabs-slot">
                                    <slot name="begin"></slot>
                                </div>
                            </div>
                            <div class="pt-tabs-labels-body" :style="{maxWidth:centerWidthVal,width:centerWidth}">
                                <slot></slot>
                            </div>
                            <div class="pt-tabs-labels-end">
                                <div class="pt-tabs-slot">
                                    <slot name="end"></slot>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="isOverflow && showNext" class="pt-tabs-overflow-next">
                        <div class="pt-tabs-slot">
                            <slot name="next"></slot>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pt-tabs-labels-right">
                <div class="pt-tabs-slot">
                    <slot name="right"></slot>
                </div>
            </div>
        </div>
        <div class="pt-tabs-labels-bottom">
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
    props: {
    },
    data() {
        return {
            isOverflow: false,
            showPrev: false,
            showNext: false,
            totalWidth: 0,

            leftWidth: 0,
            rightWidth: 0,

            prevWidth: 0,
            nextWidth: 0,

            beginWidth: 0,
            endWidth: 0,

            bodyWidth: 0,
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
        centerWidth() {
            var val = this.totalWidth - (this.leftWidth + this.rightWidth);
            return val;
        },
        centerWidthVal() {
            var val = this.centerWidth;
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
                console.log(this.totalWidth, this.centerWidth)
            }, 300)
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

