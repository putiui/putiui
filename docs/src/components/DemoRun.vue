<template>
    <div class="demo-run-container">
        <iframe :src="link" frameborder="0"></iframe>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'DemoRun',
    props: ['data', 'link'],
    data() {
        return {}
    }
}
</script>
