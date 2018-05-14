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
            <div class="demo-code" v-html="code"></div>
            <slot name="footer"></slot>
        </footer>
    </section>
</template>

<style lang="scss">
@import '../assets/style/mixin.scss';
@import '../assets/style/markdown.scss';
@import 'highlight.js/styles/vs.css';
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
    .demo-code{
        white-space: pre-wrap;
        background: #eee;
        border: 0;
        font-family: "Consulas" , "Courier New" ,Courier,mono,serif;
        font-size: 14px;
        margin: 0;
        width: 100%;
        font-weight: 200;
        color: #333;
        margin: 10px auto;
        .css{
            [class*="hljs-selector-"]{
                margin-right: 3px;
            }
            .hljs-attribute{
                margin-right: 1px;
            }
        }
    }
    .ul-line-num {
        list-style: decimal;
        background-color: #fff;
        margin: 0px 0px 0 40px !important;
        padding: 0px;
    }
    .ul-line-num .line-num-item {
        list-style: decimal-leading-zero;
        border-left: 1px solid #ddd;
        background: #fff;
        padding: 3px;
        margin: 0;
        line-height: 14px;
        word-break: break-all;
        word-wrap: break-word;
    }
    .ul-line-num .line-num-item:nth-of-type(even) {
        background-color: #fcfcfc;
        color: inherit;
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
                var html = hljs.highlight('html', `<template>\n` + this.data.template + `<\/template>`).value;
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
