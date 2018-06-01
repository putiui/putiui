<template>
    <div class="pt-tabs-nav">
        <div v-if="$scopedSlots.top" class="pt-tabs-labels-top">
            <slot name="top"></slot>
        </div>
        <div class="pt-tabs-labels">
            <div v-if="$scopedSlots.left" class="pt-tabs-labels-left">
                <div class="pt-tabs-slot">
                    <slot name="left"></slot>
                </div>
            </div>
            <div class="pt-tabs-labels-center" :style="{[styleSizeProp]: centerSizeVal,[styleMaxSizeProp]:centerSizeVal}">
                <div :class="['pt-tabs-overflow', parentPlacement==='left' || parentPlacement==='right' ? 'pt-tabs-overflow-vertical' : '']">
                    <div v-if="!sizeCalcing && showPrev" class="pt-tabs-overflow-prev">
                        <div class="pt-tabs-slot">
                            <button class="pt-tabs-btn-prev" type="button" @click="prev"></button>
                            <slot name="prev" :handler="prev"></slot>
                        </div>
                    </div>
                    <div class="pt-tabs-overflow-content" :style="{[styleSizeProp]:contentSizeVal,[styleMaxSizeProp]:contentSizeVal}">
                        <div class="pt-tabs-labels-core" :style="{transform:!isOverflow ? undefined : (translateProp+'(-'+contentTranslate+'px)')}">
                            <div class="pt-tabs-slider" :style="sliderStyle">
                                <slot name="slider"></slot>
                            </div>
                            <div class="pt-tabs-labels-begin">
                                <div class="pt-tabs-slot">
                                    <slot name="begin"></slot>
                                </div>
                            </div>
                            <div class="pt-tabs-labels-body">
                                <slot></slot>
                            </div>
                            <div class="pt-tabs-labels-end">
                                <div class="pt-tabs-slot">
                                    <slot name="end"></slot>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!sizeCalcing && showNext" class="pt-tabs-overflow-next">
                        <div class="pt-tabs-slot">
                            <button class="pt-tabs-btn-next" type="button" @click="next"></button>
                            <slot name="next" :handler="next"></slot>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="$scopedSlots.right" class="pt-tabs-labels-right">
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
import debounce from 'lodash.debounce';
export default {
    name: 'PtTabNav',
    ptTag: 'PtTabNav',
    mixins: [
        baseMixin,
        vqueryMixin,
        viewMixin
    ],
    props: {
        forwardCount: {
            type: [Number, String],
            default: 1
        },
        backCount: {
            type: [Number, String],
            default: 1
        }
    },
    data() {
        return {
            totalSize: 0,

            leftSize: 0,
            rightSize: 0,
            topSize: 0,
            bottomSize: 0,

            sizeCalcing: false,
            prevSize: 0,
            nextSize: 0,

            coreSize: 0,

            contentTranslate: 0,
            activeSliderLabelIndex: 0,

            $lastSizeRender: []
        }
    },
    computed: {
        parentTabs() {
            return this.$vqClosest('PtTabs');
        },
        parentPlacement() {
            return this.parentTabs ? this.parentTabs.placement : 'top';
        },
        maxLabelIndex() {
            return this.parentTabs.labelComponents.length - 1;
        },
        activeLabelIndex() {
            return this.parentTabs.activeLabelIndex;
        },
        activeLabelSize() {
            var item = this.parentTabs.labelMeta[this.activeLabelIndex];
            return item ? (item[this.styleSizeProp] || 0) : 0;
        },
        isHorizontal() {
            return this.parentPlacement === 'top' || this.parentPlacement === 'bottom';
        },
        sizeProp() {
            return this.isHorizontal ? 'clientWidth' : 'clientHeight';
        },
        styleSizeProp() {
            return this.isHorizontal ? 'width' : 'height';
        },
        styleMaxSizeProp() {
            return this.isHorizontal ? 'maxWidth' : 'maxHeight';
        },
        translateProp() {
            return this.isHorizontal ? 'translateX' : 'translateY';
        },
        horizontalSizeProp() {
            return this.isHorizontal ? 'clientWidth' : 'clientHeight';
        },
        sliderStyle() {
            if (!this.parentTabs) return;
            var size = 0;
            var translateVal = 0;
            var max = this.activeLabelIndex;
            var labelMeta = this.parentTabs.labelMeta;
            var sizeProp = 'width';
            if (!this.isHorizontal) {
                sizeProp = 'height';
            }

            for (let i = 0; i <= max; i++) {
                var sizeItem = labelMeta[i];
                if (sizeItem) {
                    if (i === max) {
                        size = sizeItem[sizeProp];
                    } else {
                        translateVal += sizeItem[sizeProp];
                    }
                }
            }
            var transformVal = '';
            if (this.isHorizontal) {
                transformVal = `translateX(${translateVal}px)`;
            } else {
                transformVal = `translateY(${translateVal}px)`;
            }

            return prefixeTransform(transformVal, {
                [sizeProp]: size + 'px'
            })
        },
        centerSize() {
            if (this.sizeCalcing) return undefined;
            if (this.isHorizontal) {
                return this.totalSize ? (this.totalSize - (this.leftSize + this.rightSize)) : undefined;
            } else {
                return this.totalSize ? (this.totalSize - (this.topSize + this.bottomSize)) : undefined;
            }
        },
        centerSizeVal() {
            var val = this.centerSize;
            if (typeof val === 'undefined' || val === this.totalSize) {
                return undefined;
            }
            return val <= 0 ? 0 : (val > 0 ? (val + 'px') : undefined);
        },
        contentSize() {
            if (typeof this.centerSize === 'undefined' || !this.sizeCalcing) {
                return undefined;
            }
            return this.centerSize - (this.prevSize + this.nextSize);
        },
        contentSizeVal() {
            var val = this.contentSize;
            if (typeof val === 'undefined' || val === this.centerSize) {
                return undefined;
            }
            console.log(`contentSize=>`, this.contentSize, this.coreSize, this.centerSize, this.prevSize, this.nextSize);
            return val <= 0 ? 0 : (val > 0 ? (val + 'px') : undefined);
        },
        isOverflow() {
            return this.coreSize > this.centerSize;
        },
        showPrev() {
            return this.isOverflow && this.contentTranslate > 0;
        },
        showNext() {
            return this.isOverflow && this.contentTranslate < this.centerSize;
        }
    },
    methods: {
        getSize(selector, prop = 'clientWidth') {
            var el = typeof selector === 'object' ? [selector] : (this.$el ? this.$el.querySelectorAll(selector) : null);
            if (el && el.length > 0) {
                el = el[0];
            } else {
                el = null;
            }
            return el ? el[prop] : 0;
        },
        renderSize() {
            if (this.$data.$lastSizeRender[1]) {
                clearTimeout(this.$data.$lastSizeRender[0]);
                this.$data.$lastSizeRender[1]();
            }
            return new Promise((resolve, reject) => {
                this.$data.$lastSizeRender[1] = reject;
                this.$data.$lastSizeRender[0] = setTimeout(() => {
                    console.log(`tab-nav calcSize`);
                    this.sizeCalcing = true;

                    ['left', 'right', 'top', 'bottom'].forEach(item => {
                        if (this.$scopedSlots[item]) {
                            this[item + 'Size'] = this.getSize('.pt-tabs-labels-' + item + '>.pt-tabs-slot', item === 'top' || item === 'bottom' ? 'clientHeight' : 'clientWidth');
                        } else {
                            this[item + 'Size'] = 0;
                        }
                    });
                    this.coreSize = this.getSize('.pt-tabs-labels-core', this.sizeProp);
                    this.prevSize = 0;
                    this.nextSize = 0;
                    console.log(`this.coreSize=${this.coreSize}`)
                    this.$nextTick(() => {
                        this.totalSize = this.getSize(this.$el);
                        console.log(`this.totalSize=${this.totalSize}`)
                        this.$nextTick(() => {
                            this.sizeCalcing = false;
                            this.$nextTick(() => {
                                this.prevSize = this.getSize('.pt-tabs-overflow-prev>.pt-tabs-slot', this.sizeProp);
                                this.nextSize = this.getSize('.pt-tabs-overflow-next>.pt-tabs-slot', this.sizeProp);
                                console.log(`prevSize=>`, this.centerSize, this.prevSize, this.nextSize);
                                this.$data.$lastSizeRender = [];
                                resolve();
                            })
                        })
                    })
                }, 300)
            });
        },
        goto(count) {
            if (typeof count === 'number') {
                var labelMeta = this.parentTabs.labelMeta;
                var index = this.activeSliderLabelIndex + count;
                index = index < 0 ? 0 : index;
                var sum = (Object.keys(labelMeta).reduce((sum, key) => {
                    key = parseInt(key);
                    if (key < index) {
                        sum += labelMeta[key][this.styleSizeProp];
                    }
                    return sum;
                }, 0));
                this.activeSliderLabelIndex = index;
                this.contentTranslate = sum;
            } else {
                count = count || '0px';
                var oldValue = this.contentTranslate;
                if (count.endsWith('%')) {
                    count = parseFloat(count) / 100;
                    count = this.contentSize * count;
                } else {
                    count = parseFloat(count)
                }
                var val = oldValue + count;
                if (val < 0) {
                    this.contentTranslate = 0;
                } else if (val > this.contentSize) {
                    this.contentTranslate = this.contentSize;
                } else {
                    this.contentTranslate = val;
                }
            }
        },
        prev() {
            if (this.contentTranslate <= 0) return;
            this.goto(typeof this.backCount === 'number' ? (-1 * this.backCount) : ('-' + this.backCount));
        },
        next() {
            if (this.contentTranslate >= this.contentSize) return;
            this.goto(this.forwardCount);
        }
    },
    created() {
        this.parentTabs.$data.$updatedQueue.tabNav = [this.renderSize, this];
        this.$on('viewResize', data => {
            this.renderSize();
        })
    },
    mounted() {
        this.renderSize();
    }
}
</script>

