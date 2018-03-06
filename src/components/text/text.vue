<template>
    <component :is="tag" :class="['pt-text', 'pt-html-' + tag]">
        <slot></slot>
    </component>
</template>
<script>
import options from './options';
export default {
    name: 'PtText',
    props: {
        tag: {
            type: String,
            default: 'span',
            validator(val) {
                return options.allowTags.indexOf(val) !== -1;
            }
        }
    }
}
</script>
