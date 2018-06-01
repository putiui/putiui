<template>
    <label :class="['pt-tab-label', active?'active':'']">
        {{sign}}<br>
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
                this.emitSize({
                    width: this.$el.clientWidth,
                    height: this.$el.clientHeight
                })
            } else {
                this.$nextTick(() => {
                    this.emitSize({
                        width: this.$el.clientWidth,
                        height: this.$el.clientHeight
                    })
                })
            }
        },
        emitSize(obj) {
            var { width, height } = obj;
            if (this.width !== width || this.height !== height) {
                this.width = width;
                this.height = height;
                console.log(this.sign + ' size change.')
                this.$emit('size', this)
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

