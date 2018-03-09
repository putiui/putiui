<template>
    <label :class="{
        'pt-btn-label': true,
        ['pt-btn-label-'+iType]: iType,
        ['pt-btn-label-' + position]: position
    }">
        <PtText v-if="arrow" tag="i" class="pt-btn-label-arrow"></PtText>
        <slot></slot>
    </label>
</template>
<script>
import { has } from '../../utils/index.js';
import baseMixin from '../../mixins/base.js';
import { PtButtonLabelPosition, PtButtonLabelType, options } from './options.js';
export default {
    name: 'PtButtonLabel',
    ptTag: 'PtButtonLabel',
    mixins: [baseMixin],
    props: {
        position: {
            type: String,
            default() {
                return PtButtonLabelPosition.left;
            },
            validator(val) {
                return has(PtButtonLabelPosition, val);
            }
        },
        arrow: {
            type: Boolean,
            default() {
                return options.arrow;
            }
        },
        type: {
            type: String,
            validator(val) {
                return has(PtButtonLabelType, val);
            }
        }
    },
    computed: {
        iType() {
            return this.type || options.type || PtButtonLabelType.none;
        }
    }
}
</script>
