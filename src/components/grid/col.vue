<template>
    <PtBox :class="['pt-col', 'pt-col-' + iSpan, iOffset && iOffset!=='0' ? 'pt-col-offset-'+iOffset : '']" :style="style">
        <slot></slot>
    </PtBox>
</template>

<script>
import options from './options';
import baseMixin from '../../mixins/base';
import vqueryMixin from '../../mixins/vquery';
import { isValidColSpan } from '../../utils/is';
export default {
    name: 'PtCol',
    ptTag: 'PtCol',
    mixins: [baseMixin, vqueryMixin],
    props: {
        span: {
            type: Number,
            validator: isValidColSpan
        },
        offset: {
            type: Number,
            validator: isValidColSpan
        }
    },
    computed: {
        iSpan() {
            return (this.span || options.span || 24).toFixed(0);
        },
        iOffset() {
            return (this.offset || options.offset || 0).toFixed(0);
        },
        iGutter() {
            let parent = this.$vqClosest('pt-row');
            return parent ? parent.iGutter : 0;
        },
        style() {
            var result = {};
            if (this.iGutter > 0) {
                const value = this.iGutter / 2;
                result.paddingLeft = result.paddingRight = value + 'px';
            }
            return result;
        }
    }
}
</script>
