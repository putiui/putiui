<template>        <ComArticle :meta="meta" :demo="demo ? demo : undefined">          <template slot="header">              <h2>Npm安装</h2>
<p>使用Npm方式安装，与打包工具（<code>webpack</code>等）配合使用</p>
<pre class="hljs"><code>npm i putiui -S
</code></pre>
<h2>页面引入</h2>
<p>可以将<code>putiui</code>的js和css文件直接引入到页面中</p>
<pre class="hljs"><code><span class="hljs-comment">&lt;!--完整引入--&gt;</span>
<span class="hljs-comment">&lt;!--引入样式--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"~/putiui/lib/css/putiui.css"</span>&gt;</span>
<span class="hljs-comment">&lt;!--引入脚本--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"~/putiui/lib/putiui.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!--引入单个组件--&gt;</span>
<span class="hljs-comment">&lt;!--引入基础样式--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"~/putiui/lib/css/base.css"</span>&gt;</span>
<span class="hljs-comment">&lt;!--引入组件样式--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"~/putiui/lib/css/button.css"</span>&gt;</span>
<span class="hljs-comment">&lt;!--引入脚本--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"~/putiui/lib/components/button.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
          </template> <template slot="demo">                        </template> <template slot="spec">                        </template> </ComArticle>
</template>
<script>
    /* eslint-disable */
    import ComArticle from '../../../components/ComArticle';
    export default {
        name: 'GuideInstall',
        data() {
            return {
                name: 'GuideInstall',
                meta: {
                    "category": "Guide",
                    "order": "1",
                    "title": "安装",
                    "demo": "无",
                    "spec": "无"
                },
                demo: null
            }
        },
        components: {
            ComArticle,
        }
    }

</script>
