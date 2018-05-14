<template>
    <section class="demo-container">
        <header class="demo-header">
            <h3 class="demo-title" v-if="data && data.meta && data.meta.title">{{data.meta.title}}</h3>
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
@import '../assets/style/mixin.scss';
@import '../assets/style/markdown.scss';
.demo-container{
    margin-bottom: 20px;
    .demo-title{
        font-size: 16px;
    }
    .demo-run{
        border-radius: 3px;
        border:1px solid $clr-border;
        padding: 15px;
    }
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
