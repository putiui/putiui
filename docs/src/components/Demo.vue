<template>
    <section class="demo-container">
        <header class="demo-header">
            <slot name="header"></slot>
        </header>
        <div class="demo-run">
            <slot></slot>
        </div>
        <footer class="demo-footer">
            <slot name="footer"></slot>
        </footer>
    </section>
</template>

<style lang="scss">
@import '../assets/style/markdown.scss';
.demo-container{
    margin-bottom: 20px;
}
</style>

<script>
export default {
    name: 'Demo',
    props: ['data'],
    data() {
        return {}
    }
}
</script>
