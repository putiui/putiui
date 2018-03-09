<template>
    <label :class="['pt-radio', iDisabled ? 'disabled' : '', model===selfOnValue ? 'checked' : '', focus ? 'focus' : '']">
        <input type="radio" class="pt-radio-real" :value="value" :autofocus="autofocus ? autofocus : undefined" :name="iName" :disabled="iDisabled ? iDisabled : undefined" v-model="model" @focus="focus=true" @blur="focus=false" @change="nativeChange" @keydown="nativeKeydown">
        <PtText tag="span" class="pt-radio-control"></PtText>
        <PtText tag="span" class="pt-radio-content">
            <slot></slot>
        </PtText>
    </label>
</template>

<script>
import { has } from '../../utils/object.js';
import { uniqueID } from '../../utils/index.js';
import { hasProp } from '../../utils/vnode.js';
import baseMixin from '../../mixins/base.js';
import vqueryMixin from '../../mixins/vquery.js';
export default {
    name: 'PtRadio',
    ptTag: 'PtRadio',
    mixins: [baseMixin, vqueryMixin],
    model: {
        prop: 'checked',
        event: 'input'
    },
    props: {
        value: {
            type: null
        },
        name: String,
        checked: Boolean,
        disabled: Boolean,
        autofocus: Boolean
    },
    data() {
        return {
            focus: false
        }
    },
    computed: {
        iName() {
            return this.isGroupChild ? this.parentGroup.iName : undefined;
        },
        iDisabled() {
            if (hasProp(this, 'disabled')) {
                return this.disabled;
            } else {
                return this.isGroupChild ? this.parentGroup.disabled : false;
            }
        },
        parentGroup() {
            return this.$vqClosest('pt-radio-group');
        },
        isGroupChild() {
            return !!this.parentGroup;
        },
        groupValue() {
            return this.isGroupChild ? this.parentGroup.value : undefined;
        },
        selfOnValue() {
            return this.value;
        },
        selfOffValue() {
            if (hasProp(this, 'value')) {
                if (typeof this.value === 'undefined') {
                    return '';
                } else {
                    return undefined;
                }
            } else {
                return '';
            }
        },
        model: {
            get() {
                if (this.isGroupChild) {
                    return this.groupValue;
                } else {
                    return this.checked ? this.selfOnValue : this.selfOffValue;
                }
            },
            set(val) {
                if (this.isGroupChild) {
                    this.parentGroup.$emit('input', val);
                } else {
                    this.emitModel(val === this.selfOnValue);
                }
            }
        }
    },
    methods: {
        nativeChange(e) {
            if (!e) return;
            this.emitChange(e.target.checked);
        },
        nativeKeydown(e) {
            if (!e) return;
            if (e.keyCode == 13) {
                if (this.model !== this.selfOnValue) {
                    this.model = this.selfOnValue;
                    this.emitChange(true);
                }
            }
        },
        emitChange(checked) {
            this.$nextTick(() => {
                this.$emit('change', checked);
                if (this.isGroupChild) {
                    this.parentGroup.$emit('change', this.groupValue);
                }
            })
        },
        emitModel(val, isNext) {
            this.$emit('input', val);
        }
    },
    created() {
        if (this.isGroupChild && hasProp(this, 'checked')) {
            throw new Error('警告：当<pt-radio>组件是<pt-radio-group>子组件时，不接受checked prop，且本身的v-model将不再起作用！它的checked值会跟随<pt-radio-group>的value值而定')
        }
    }
}
</script>
