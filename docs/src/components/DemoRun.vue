<template>
    <div class="demo-run-container">
        <iframe :src="link" frameborder="0"></iframe>
        <slot></slot>
    </div>
</template>

<style lang="scss">
.demo-run-container{
    padding: 15px;
    >iframe{
        border:none;
        box-shadow: none;
        background: none;
        padding: 0;
        margin: 0;
    }
}
</style>

<script>
export default {
    name: 'DemoRun',
    props: ['data', 'link'],
    data() {
        return {}
    }
}
</script>
