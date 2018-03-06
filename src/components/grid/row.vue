<template>
    <PtBox :class="['pt-row', flexClassNameString]">
        <slot></slot>
    </PtBox>
</template>

<script>
import options from './options';
import baseMixin from '../../mixins/base';
import flexMixin from '../../mixins/flex';
export default {
    name: 'PtRow',
    mixins: [
        baseMixin,
        flexMixin()
    ],
    props: {
        gutter: Number
    },
    computed: {
        iGutter() {
            return typeof this.gutter === 'number' ? this.gutter : options.gutter;
        }
    }
}
</script>
