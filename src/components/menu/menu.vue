<template>
    <div class="pt-menu">
    </div>
</template>

<script>
import { has } from '../../utils/index.js';
import baseMixin from '../../mixins/base.js';
import { PtMenuDirection, PtMenuJustify, options } from './options.js';
export default {
    name: 'PtMenu',
    ptTag: 'PtMenu',
    mixins: [baseMixin],
    props: {
        direction: {
            type: String,
            default() {
                return options.direction || PtMenuDirection.horizontal;
            },
            validator(val) {
                return has(PtMenuDirection, val);
            }
        }
    }
}
</script>
