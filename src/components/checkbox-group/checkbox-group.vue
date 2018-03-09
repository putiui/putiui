<template>
    <PtBox :class="['pt-checkbox-group', disabled ? 'disabled' : '']">
        <template v-if="isValidOptions">
            <Checkbox v-for="(item, index) in options" :value="getValueOptVal(item, index)" :key="getOptItemKey(item, index)">
                {{getLabelOptVal(item, index)}}
            </Checkbox>
        </template>
        <slot></slot>
    </PtBox>
</template>
<script>
import { uniqueID } from '../../utils/index.js';
import baseMixin from '../../mixins/base.js';
import optionsMixin from '../../mixins/options.js';
import Checkbox from '../checkbox/index.js';
import asyncCheckMixin from '../../mixins/async-check.js';
export default {
    name: 'PtCheckboxGroup',
    ptTag: 'PtCheckboxGroup',
    mixins: [
        baseMixin,
        optionsMixin,
        asyncCheckMixin({
            name: 'beforeCheck',
            type: Function
        }, function (checkVal) {
            this.wait = false
            this.$emit('input', checkVal);
        }, function (checkVal) {
            this.wait = true
        })
    ],
    props: {
        value: Array,
        disabled: Boolean,
        name: String
    },
    data() {
        return {
            name_: uniqueID() + '',
            wait: false
        }
    },
    computed: {
        iName() {
            return this.name !== '' && typeof this.name !== 'undefined' ? this.name : this.name_;
        },
        model: {
            get() {
                return this.value
            },
            set(val) {
                console.log(`want set val=` + JSON.stringify(val));
                if (this.wait) return
                this.asyncCheck(val);
            }
        }
    },
    components: {
        Checkbox
    }
}
</script>
