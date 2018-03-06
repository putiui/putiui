<template>
    <PtBox :class="['pt-radio-group', disabled ? 'disabled' : '']">
        <template v-if="isValidOptions">
            <PtRadio v-for="(item, index) in options" :value="getValueOptVal(item, index)" :key="getOptItemKey(item, index)">
                {{getLabelOptVal(item, index)}}
            </PtRadio>
        </template>
        <slot></slot>
    </PtBox>
</template>
<script>
import { uniqueID } from '../../utils/index.js';
import baseMixin from '../../mixins/base.js';
import optionsMixin from '../../mixins/options.js';
import Radio from '../radio/index.js';
export default {
    name: 'PtRadioGroup',
    mixins: [baseMixin, optionsMixin],
    props: {
        value: null,
        disabled: Boolean,
        name: String
    },
    data() {
        return {
            name_: uniqueID() + ''
        }
    },
    computed: {
        iName() {
            return this.name !== '' && typeof this.name !== 'undefined' ? this.name : this.name_;
        }
    },
    components: {
        Radio
    }
}
</script>
