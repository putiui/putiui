<template>        <ComArticle :meta="meta" :demo="demo ? demo : undefined">          <template slot="header">              <h2>引入PtUI</h2>
<p>你可以完整引入，或是根据需要仅引入部分组件。</p>
<h3>完整引入</h3>
<pre class="hljs"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> PutiUI <span class="hljs-keyword">from</span> <span class="hljs-string">'putiui'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'putiui/lib/css/putiui.css'</span>;

Vue.use(PutiUI);
</code></pre>
<h3>按需引入</h3>
<pre class="hljs"><code><span class="hljs-keyword">import</span> { PtButton } <span class="hljs-keyword">from</span> <span class="hljs-string">'putiui'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'putiui/lib/css/button.css'</span>;

<span class="hljs-comment">// 全局可使用组件</span>
Vue.use(PtButton)

<span class="hljs-comment">// 组件内部可使用</span>
Vue.component(<span class="hljs-string">'user-component'</span>,{
    <span class="hljs-attr">template</span>:<span class="hljs-string">`
    &lt;div class="user-component"&gt;
        &lt;pt-button&gt;Submit&lt;/pt-button&gt;
    &lt;/div&gt;
    `</span>,
    <span class="hljs-attr">components</span>: {
        PtButton
    }
})
</code></pre>
<h2>修改默认配置</h2>
<p>PutiUI 中的一些样式和功能受到配置影响，你可以在引入PtUI时修改这些默认配置。</p>
<h3>完整引入时</h3>
<pre class="hljs"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> PutiUI <span class="hljs-keyword">from</span> <span class="hljs-string">'putiui'</span>;
Vue.use(PutiUI, {
    <span class="hljs-attr">prefix</span>: <span class="hljs-string">'pt-'</span>
});
</code></pre>
<p>上面的设置代表：使用组件时以<code>pt-</code>为前缀作为标签名，如<code>pt-button</code>；</p>
<p>PutiUI 还可以进行下列配置：</p>
<table>
<thead>
<tr>
<th>配置项</th>
<th>类型</th>
<th>默认值</th>
<th>可选值</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>prefix</td>
<td>string</td>
<td>pt-</td>
<td></td>
<td>为所以组件设置标签名前缀</td>
</tr>
<tr>
<td>size</td>
<td>string</td>
<td></td>
<td>mini, tiny, small, medium, large, big, huge, massive</td>
<td>设置所有包含<code>size</code>选项的组件设置默认值</td>
</tr>
<tr>
<td>组件名称</td>
<td>object</td>
<td>组件默认配置</td>
<td></td>
<td>如要修改<code>pt-button</code>组件的默认配置，可使用<code>Vue.use(PutiUI,{ PtButton: {...}})</code>的方式进行配置，其他组件类似</td>
</tr>
</tbody>
</table>
<h3>按需引入时</h3>
<p>PutiUI 中的每个组件几乎都存在默认配置，你可以在引入这些组件时进行修改。</p>
<pre class="hljs"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> { PtButton } <span class="hljs-keyword">from</span> <span class="hljs-string">'putiui'</span>;
Vue.use(PtButton, {
    <span class="hljs-attr">size</span>: <span class="hljs-string">'large'</span>
})
</code></pre>
<p>组件的详细配置选项请在组件的说明中查找。</p>
<h3>配置读取优先级</h3>
<ul>
<li>如果组件本身存在的配置项与PtUI全局的配置项名称一致时，优先获取组件本身的配置</li>
</ul>
          </template> <template slot="demo">                        </template> <template slot="spec">                        </template> </ComArticle>
</template>
<script>
    /* eslint-disable */
    import ComArticle from '../../../components/ComArticle';
    export default {
        name: 'GuideQuickstart',
        data() {
            return {
                name: 'GuideQuickstart',
                meta: {
                    "category": "Guide",
                    "order": "1",
                    "title": "快速上手"
                },
                demo: null
            }
        },
        components: {
            ComArticle,
        }
    }

</script>
