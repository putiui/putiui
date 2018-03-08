<template>      <Page name="GuideInstall">          <div class="art-header">              <h2>Npm安装</h2>
<p>使用Npm方式安装，与打包工具（webpack等）配合使用</p>
<pre><code class="language-bash">npm i putiui -S
</code></pre>
<h2>页面引入</h2>
<p>可以将<code>putiui</code>的js和css文件直接引入到页面中</p>
<pre><code class="language-html">&lt;!--引入样式--&gt;
</code></pre>
          </div>          <div class="art-demo">                    </div>          <div class="art-spec">                    </div>      </Page>  </template>    <script>  /* eslint-disable */    export default {      name: 'GuideInstall',      data() {          return {              name: 'GuideInstall',              meta: {"category":"Guide","order":"1","title":"安装"}          }      },      components:{                }  }  </script>  