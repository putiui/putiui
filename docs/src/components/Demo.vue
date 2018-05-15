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
            <code class="code-box" v-html="code"></code>
            <slot name="footer"></slot>
        </footer>
    </section>
</template>

<style lang="scss">
@import '../assets/style/mixin.scss';
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
import hljs from 'highlight.js/lib/highlight';
import LangJS from 'highlight.js/lib/languages/javascript';
import LangCSS from 'highlight.js/lib/languages/scss';
import LangXML from 'highlight.js/lib/languages/xml';
hljs.configure({
    tabReplace: '    '
});
hljs.registerLanguage('javascript', LangJS);
hljs.registerLanguage('css', LangCSS);
hljs.registerLanguage('scss', LangCSS);
hljs.registerLanguage('html', LangXML);
hljs.registerLanguage('xml', LangXML);

export default {
    name: 'Demo',
    props: ['data'],
    data() {
        return {
            code: ''
        }
    },
    methods: {
        addLineNumber(code) {
            return `<ul class="ul-line-num"><li class="line-num-item">${code.replace(/\n/g, "\n</li><li class='line-num-item'>")}</li></ul>`
        }
    },
    created() {
        if (this.data) {
            var code = '';
            if (this.data.template) {
                var html = `<span class="hljs-tag hljs-tag-template">&lt;<span class="hljs-name">template</span>&gt;</span>\n` + hljs.highlight('html', this.data.template).value + `<span class="hljs-tag hljs-tag-template">&lt;/<span class="hljs-name">template</span>&gt;</span>`;
                code += html + '\n\n';
            }
            if (this.data.style) {
                var css = hljs.highlight('html', `<style lang="scss">\n` + this.data.style + `\n<\/style>`).value;
                code += css + '\n\n';
            }
            if (this.data.script) {
                var script = hljs.highlight('html', `<script>\n` + this.data.script + `\n<\/script>`).value;
                this.script = this.addLineNumber(script)
                code += script;
            }
            this.code = this.addLineNumber(code.trim());
        }
    }
}
</script>
