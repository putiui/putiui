<template>
    <component :is="iTag" :class="['pt-box', iTag ? 'pt-html-'+iTag : '']">
        <slot></slot>
    </component>
</template>
<script>
import options from './options';
export default {
    name: 'PtBox',
    ptTag: 'PtBox',
    props: {
        tag: {
            type: String,
            validator(val) {
                return options.allowTags.indexOf(val) !== -1;
            }
        }
    },
    computed: {
        iTag() {
            return this.tag || options.defaultTag || 'div';
        }
    }
}
</script>
