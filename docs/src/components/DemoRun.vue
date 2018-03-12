<template>
    <div class="demo-run-container">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.demo-run-container{
    padding: 15px;
}
</style>

<script>
export default {
    name: 'DemoRun',
    props: ['data'],
    data() {
        return {}
    }
}
</script>
