<template>
    <component :is="tag" :class="{
            'pt-btn':true,
            ['pt-btn-'+itype]: itype,
            ['pt-btn-'+sizeVal]: sizeVal,
            [widthClass]: widthClass,
            [shapeClassName]:shapeClassName,
            'pt-btn-hollow': hollow,
            ['pt-btn-outline-' + outline]: outline,
            'active': active,
            'disabled': disabled,
            'pt-btn-block': block,
            'browser-ie': browserIsIE,
            'has-label':$slots.labelLeft || $slots.labelRight || $slots.labelTop || $slots.labelBottom
        }"
        :type="iNativeType"
        :href="iHref"
        :target="tag!=='a' || disabled ? undefined : target"
        :disabled="tag==='a' ? undefined : disabled"
        :style="style"
        v-bind="$props">

        <slot name="labelTop"></slot>
        <PtText class="pt-btn-inner-center">
            <slot name="labelLeft"></slot>
            <PtText tag="span" class="pt-btn-content">
                <PtText v-if="icon" tag="i" :class="['pt-btn-icon', iIconClass]"></PtText>
                <slot></slot>
            </PtText>
            <slot name="labelRight"></slot>
        </PtText>
        <slot name="labelBottom"></slot>
    </component>
</template>

<script>
import sizeMixin from '../../mixins/size.js';
import shapeMixin from '../../mixins/shape.js';
import baseMixin from '../../mixins/base.js';
import { getComputedStyle } from '../../utils/dom.js';
import { has } from '../../utils/index.js';
import { isObject, isFunction } from '../../utils/is.js';
import { PtButtonSize, PtButtonNumberSize, PtButtonType, PtButtonNativeType, PtButtonShape, options } from './options.js';
const allowTags = ['a', 'input', 'button'];
export default {
    name: 'PtButton',
    ptTag: 'PtButton',
    mixins: [
        baseMixin,
        sizeMixin(PtButtonSize, PtButtonNumberSize, PtButtonSize.medium),
        shapeMixin(PtButtonShape, function () {
            return options.shape;
        })
    ],
    props: {
        tag: {
            type: String,
            default() {
                return options.tag || 'button';
            },
            validator(val) {
                return allowTags.indexOf(val) !== -1;
            }
        },
        href: {
            type: String,
            default() {
                return options.href || '';
            }
        },
        target: {
            type: String
        },
        nativeType: {
            type: String,
            validator(val) {
                return has(PtButtonNativeType, val);
            }
        },
        type: {
            type: String,
            validator(val) {
                return has(PtButtonType, val);
            }
        },
        width: String,
        height: String,
        icon: {
            type: String,
            default() {
                return options.icon || '';
            }
        },
        disabled: Boolean,
        active: Boolean,
        block: {
            type: Boolean,
            default() {
                return options.block || false;
            }
        },
        hollow: {
            type: Boolean,
            default() {
                return options.hollow || false;
            }
        },
        outline: {
            type: String,
            default() {
                return options.outline || '';
            },
            validator(val) {
                return val === '' || has(PtButtonType, val);
            }
        }
    },
    data() {
        return {
            circleLineHeight: '',
            mgOptions: options
        }
    },
    watch: {
        height() {
            if (this.isValidCircleHeight) {
                this.circleLineHeight = this.getCircleLineHeight();
            }
        }
    },
    computed: {
        iNativeType() {
            return this.tag === 'button' || this.tag === 'input' ? (this.nativeType || options.nativeType || PtButtonNativeType.button) : undefined;
        },
        iHref() {
            if (this.tag !== 'a') {
                return undefined;
            }
            if (this.disabled) {
                return 'javascript:void(0)';
            }
            return this.href;
        },
        itype() {
            return this.type || options.type || PtButtonType.primary;
        },
        iIconClass() {
            if (typeof options.iconPrefix === 'function') {
                return options.iconPrefix(this.icon || options.icon)
            } else {
                return (options.iconPrefix || '') + (this.icon || options.icon);
            }
        },
        isValidCircleHeight() {
            var ht = parseFloat(this.height);
            ht = isNaN(ht) ? 0 : ht;
            return ht ? true : false;
        },
        isPrecutWidth() {
            return isObject(options.width) && options.width[this.width];
        },
        widthClass() {
            if (this.isPrecutWidth) {
                return isFunction(options.width[this.width]) ? options.width[this.width](this) : options.width[this.width];
            }
        },
        borderWidth() {
            var result = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
            if (this.$el) {
                var style = getComputedStyle(this.$el);
                if (style) {
                    Object.keys(result).forEach(key => {
                        var prop = key[0].toUpperCase() + key.substr(1);
                        result[key] = parseFloat(style[`border${prop}Width`]);
                        result[key] = isNaN(result[key]) ? 0 : result[key];
                    });
                }
            }
            return result;
        },
        style() {
            var result = {};
            if (this.width !== '') {
                if (!this.isPrecutWidth) {
                    result.width = this.width;
                }
            }
            if (this.height) {
                result.height = this.height;
                if (this.shapeVal.indexOf('circle') !== -1 && this.isValidCircleHeight) {
                    result.width = result.height;
                    result.padding = 0;
                    result.lineHeight = this.circleLineHeight || this.getCircleLineHeight();
                }
            }

            return result;
        },
        browserIsIE() {
            var userAgent = navigator.userAgent;
            return userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Edge') !== -1 || userAgent.indexOf('Trident') !== -1;
        }
    },
    methods: {
        getCircleLineHeight() {
            var border = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
            if (this.$el) {
                var style = getComputedStyle(this.$el);
                if (style) {
                    Object.keys(border).forEach(key => {
                        var prop = key[0].toUpperCase() + key.substr(1);
                        border[key] = parseFloat(style[`border${prop}Width`]);
                        border[key] = isNaN(border[key]) ? 0 : border[key];
                    });
                }
            }
            var ht = parseFloat(this.height);
            ht = isNaN(ht) ? 0 : ht;
            var lineHeight = (ht - border.top - border.bottom) + 'px';
            return lineHeight;
        }
    },
    mounted() {
        if (this.isValidCircleHeight) {
            this.circleLineHeight = this.getCircleLineHeight();
        }
    }
}
</script>
