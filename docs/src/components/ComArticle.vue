<template>
    <Page name="article">
        <article class="article">
            <header class="art-header">
                <h1>{{meta.title}}</h1>
                <slot name="header"></slot>
            </header>
            <section v-if="meta.demo!=='无'" class="art-demo">
                <h2>实例</h2>
                <div class="art-demo-content">
                    <slot name="demo"></slot>
                </div>
            </section>
            <section v-if="meta.spec!=='无'" class="art-spec">
                <h2>组件说明</h2>
                <div class="art-spec-content">
                    <slot name="spec"></slot>
                </div>
            </section>
        </article>
    </Page>
</template>
<style lang="scss">
@import '../assets/style/markdown.scss';
.art-demo-content{
    padding-left: 20px;
}
.art-spec-content{
    padding-left: 40px;
    >h2,
    >h2+p{
        margin-left: -20px;
    }
}
</style>

<script>
export default {
    name: 'ComArticle',
    props: ['meta', 'demo']
}
</script>
