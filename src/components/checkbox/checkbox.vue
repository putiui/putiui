<template>
    <label :class="['pt-checkbox', iDisabled ? 'disabled' : '', iChecked ? 'checked' : '', focus ? 'focus' : '']">
        <input type="checkbox" class="pt-checkbox-real" :value="value" :autofocus="autofocus ? autofocus : undefined" :name="iName" :disabled="iDisabled ? iDisabled : undefined" v-model="model" @focus="focus=true" @blur="focus=false" @change="nativeChange" @keydown="nativeKeydown">
        <PtText tag="span" class="pt-checkbox-control"></PtText>
        <PtText tag="span" class="pt-checkbox-content">
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
import asyncCheckMixin from '../../mixins/async-check.js';
export default {
    name: 'PtCheckbox',
    mixins: [
        baseMixin,
        vqueryMixin,
        asyncCheckMixin({
            name: 'beforeCheck',
            type: Function
        }, function (checkVal) {
            if (this.isGroupChild) {
                this.parentGroup.model = checkVal;
            } else {
                this.emitModel(checkVal);
            }
        })
    ],
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
            return this.$vqClosest('pt-checkbox-group');
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
        iChecked() {
            if (Array.isArray(this.model)) {
                return this.model.indexOf(this.selfOnValue) !== -1;
            } else if (Object.prototype.toString.call(this.model) === '[object Boolean]') {
                return this.model.valueOf();
            } else {
                return false;
            }
        },
        model: {
            get() {
                if (this.isGroupChild) {
                    return this.groupValue;
                } else {
                    return this.checked;
                }
            },
            set(val) {
                this.asyncCheck(val);
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
        if (this.isGroupChild) {
            if (hasProp(this, 'checked')) {
                throw new Error('警告：当<pt-checkbox>组件是<pt-checkbox-group>子组件时，不接受checked prop，且本身的v-model将不再起作用！它的checked值会跟随<pt-checkbox-group>的value值而定')
            }
            if (hasProp(this, 'beforeCheck')) {
                throw new Error('警告：当<pt-checkbox>组件是<pt-checkbox-group>子组件时，不接受beforeCheck prop！')
            }
        }
    }
}
</script>
