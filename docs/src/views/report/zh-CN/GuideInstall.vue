<template>      <ComArticle :meta="meta" :demo="demo ? demo : undefined">         <template slot="header">             <h2>Npm安装</h2>
<p>使用Npm方式安装，与打包工具（webpack等）配合使用</p>
<pre><code class="language-bash">npm i putiui -S
</code></pre>
<h2>页面引入</h2>
<p>可以将<code>putiui</code>的js和css文件直接引入到页面中</p>
<pre><code class="language-html">&lt;!--引入样式--&gt;
</code></pre>
         </template> <template slot="demo">                      </template> <template slot="spec">                      </template> </ComArticle>
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
                    "title": "安装"
                },
                demo: null
            }
        },
        components: {
            ComArticle,
        }
    }

</script>
