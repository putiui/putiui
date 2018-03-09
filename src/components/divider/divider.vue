<template>
    <PtBox :class="{
        'pt-divider':true,
        ['pt-divider-'+direction]:true,
        ['pt-divider-'+align]:true,
        ['pt-divider-'+justify]:true
    }">
        <PtBox class="pt-divider-outer">
            <PtText tag="i" class="pt-divider-line"></PtText>
        </PtBox>
        <PtBox class="pt-divider-inner">
            <PtBox class="pt-divider-content">
                <slot></slot>
            </PtBox>
        </PtBox>
        <PtBox class="pt-divider-outer">
            <PtText tag="i" class="pt-divider-line"></PtText>
        </PtBox>
    </PtBox>
</template>

<script>
import { has } from '../../utils/index.js';
import baseMixin from '../../mixins/base.js';
import { PtDividerDirection, PtDividerAlign, PtDividerJustify, options } from './options.js';
export default {
    name: 'PtDivider',
    ptTag: 'PtDivider',
    mixins: [baseMixin],
    props: {
        direction: {
            type: String,
            default() {
                return options.direction || PtDividerDirection.horizontal;
            },
            validator(val) {
                return has(PtDividerDirection, val);
            }
        },
        align: {
            type: String,
            default() {
                return options.align || PtDividerAlign.middle;
            },
            validator(val) {
                return PtDividerAlign[val];
            }
        },
        justify: {
            type: String,
            default() {
                return options.justify || PtDividerJustify.start;
            },
            validator(val) {
                return PtDividerJustify[val];
            }
        }
    }
}
</script>
