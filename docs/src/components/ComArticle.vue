<template>
    <Page name="article">
        <article class="article">
            <slot></slot>
        </article>
    </Page>
</template>
<style lang="scss">
@import '../assets/style/markdown.scss';
</style>

<script>
export default {
    name: 'ComArticle',
    props: ['meta', 'demo']
}
</script>
