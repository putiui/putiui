<template>
    <PtBox :class="{
        'pt-btn-group': true,
        ['pt-btn-group-'+sizeVal]: sizeVal,
        ['pt-btn-group-'+iDirection]: iDirection,
        'pt-btn-group-equal-width': iDirection === 'horizontal' && equalWidth
    }">
        <slot></slot>
    </PtBox>
</template>

<script>
import baseMixin from '../../mixins/base.js';
import sizeMixin from '../../mixins/size.js';
import { has } from '../../utils/index.js';
import { PtButtonGroupSize, PtButtonGroupNumberSize, options, PtButtonGroupDirection } from './options.js';
export default {
    name: 'PtButtonGroup',
    ptTag: 'PtButtonGroup',
    mixins: [
        baseMixin,
        sizeMixin(PtButtonGroupSize, PtButtonGroupNumberSize, () => {
            return options.size;
        })
    ],
    props: {
        direction: {
            type: String,
            validator(val) {
                return has(PtButtonGroupDirection, val)
            }
        },
        equalWidth: {
            type: Boolean,
            default() {
                return options.equalWidth || false;
            }
        }
    },
    computed: {
        iDirection() {
            return this.direction || options.direction || PtButtonGroupDirection.horizontal;
        }
    }
}
</script>
