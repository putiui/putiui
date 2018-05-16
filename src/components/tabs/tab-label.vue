<template>
    <label :class="['pt-tab-label', active?'active':'']">
        <slot></slot>
    </label>
</template>
<script>
export default {
    name: 'PtTabLabel',
    ptTag: 'PtTabLabel',
    props: {
        active: Boolean,
        index: Number,
        sign: null
    },
    data() {
        return {
            width: 0,
            height: 0
        }
    },
    methods: {
        calcSize() {
            if (this.$el) {
                this.width = this.$el.clientWidth;
                this.height = this.$el.clientHeight;
                this.$emit('size', this)
            } else {
                this.$nextTick(() => {
                    this.width = this.$el.clientWidth;
                    this.height = this.$el.clientHeight;
                    this.$emit('size', this)
                })
            }
        }
    },
    mounted() {
        this.calcSize();
    },
    updated() {
        this.calcSize();
    }
}
</script>

