<template>     <ComArticle :meta="meta" :demo="demo ? demo : undefined">         <section class="article-core art-GuideQuickstart">             <header class="art-header">                 <h1>{{meta.title}}</h1>                 <h2>引入PtUI</h2>
<p>你可以完整引入，或是根据需要仅引入部分组件。</p>
<h3>完整引入</h3>
<pre><code class="language-js">import Vue from 'vue';
import PutiUI from 'putiui';
import 'putiui/lib/css/putiui.css';

Vue.use(PutiUI);
</code></pre>
<h3>按需引入</h3>
<pre><code class="language-js">import { PtButton } from 'putiui';
import 'putiui/lib/css/button.css';

// 全局可使用组件
Vue.use(PtButton)

// 组件内部可使用
Vue.component('user-component',{
    template:`
    &lt;div class=&quot;user-component&quot;&gt;
        &lt;pt-button&gt;Submit&lt;/pt-button&gt;
    &lt;/div&gt;
    `,
    components: {
        PtButton
    }
})
</code></pre>
<h2>修改默认配置</h2>
<p>PutiUI 中的一些样式和功能受到配置影响，你可以在引入PtUI时修改这些默认配置。</p>
<h3>完整引入时</h3>
<pre><code class="language-js">import Vue from 'vue';
import PutiUI from 'putiui';
Vue.use(PutiUI, {
    prefix: 'pt-'
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
<pre><code class="language-js">import Vue from 'vue';
import { PtButton } from 'putiui';
Vue.use(PtButton, {
    size: 'large'
})
</code></pre>
<p>组件的详细配置选项请在组件的说明中查找。</p>
<h3>配置读取优先级</h3>
<ul>
<li>如果组件本身存在的配置项与PtUI全局的配置项名称一致时，优先获取组件本身的配置</li>
</ul>
             </header>             <div class="art-demo">                          </div>             <div class="art-spec">                          </div>         </section>     </ComArticle> </template>  <script> /* eslint-disable */ import ComArticle from '../../../components/ComArticle';   export default {     name: 'GuideQuickstart',     data() {         return {             name: 'GuideQuickstart',             meta: {"category":"Guide","order":"1","title":"快速上手"},             demo:null         }     },     components:{         ComArticle,                       } } </script> 