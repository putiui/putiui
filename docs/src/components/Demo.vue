<template>
    <section class="demo-container">
        <header class="demo-header">
            <h3 class="demo-title" v-if="data && data.meta && data.meta.title">{{data.meta.title}}</h3>
            <slot name="header"></slot>
        </header>
        <div class="demo-run">
            <PtTabs v-model="tabValue">
                <PtTab label="Result">
                    <slot></slot>
                </PtTab>
                <PtTab v-if="data && data.template" label="Template">
                    <code class="code-box" v-html="html"></code>
                </PtTab>
                <PtTab v-if="data && data.css" label="CSS">
                    <code class="code-box" v-html="css"></code>
                </PtTab>
                <PtTab v-if="data && data.script" label="JavaScript">
                    <code class="code-box" v-html="script"></code>
                </PtTab>
            </PtTabs>
        </div>
        <footer class="demo-footer">
            <slot name="footer"></slot>
        </footer>
    </section>
</template>

<style lang="scss">
@import "../assets/style/mixin.scss";
.demo-container {
  margin-bottom: 20px;
  .demo-title {
    font-size: 16px;
  }
  .demo-run {
    .pt-tab {
      padding-left: 0;
      padding-right: 0;
    }
    .code-box {
      margin: -14px 0;
    }
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
            html: '',
            css: '',
            script: '',
            tabValue: ''
        }
    },
    methods: {
        addLineNumber(code) {
            return `<ul class="ul-line-num"><li class="line-num-item">${code.replace(/\n/g, "\n</li><li class='line-num-item'>")}</li></ul>`
        }
    },
    created() {
        if (this.data) {
            if (this.data.template) {
                var html = `<span class="hljs-tag hljs-tag-template">&lt;<span class="hljs-name">template</span>&gt;</span>\n` + hljs.highlight('html', this.data.template).value + `<span class="hljs-tag hljs-tag-template">&lt;/<span class="hljs-name">template</span>&gt;</span>`;
                this.html = this.addLineNumber(html);
            }
            if (this.data.style) {
                var css = hljs.highlight('html', `<style lang="scss">\n` + this.data.style + `\n<\/style>`).value;
                this.css = this.addLineNumber(css);
            }
            if (this.data.script) {
                var script = hljs.highlight('html', `<script>\n` + this.data.script + `\n<\/script>`).value;
                this.script = this.addLineNumber(script)
            }
        }
    }
}
</script>
