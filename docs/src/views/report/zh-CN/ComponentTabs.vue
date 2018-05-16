<template>      <ComArticle :meta="meta" :demo="demo ? demo : undefined">         <template slot="header">             <p>标签页</p>
         </template> <template slot="demo">                              <Demo :data="demo[0]">                                          <ComponentTabsBasic></ComponentTabsBasic>                                      </Demo>                      </template><template slot="spec">             <h2>Tabs <code>&lt;PtTabs&gt;</code></h2>
<p>标签页</p>
<h3>属性</h3>
<table>
<thead>
<tr>
<th>名称</th>
<th>类型</th>
<th>默认值</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>value</td>
<td>any</td>
<td></td>
<td>选中值，可使用<code>v-model</code>进行传递</td>
</tr>
<tr>
<td>placement</td>
<td>string</td>
<td>top</td>
<td>切换栏相对于内容区位于那一侧，可选值：auto,top,left,right,bottom；</td>
</tr>
</tbody>
</table>
<h3>Slots</h3>
<table>
<thead>
<tr>
<th>名称</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>default</td>
<td>默认插槽，可填充任意内容</td>
</tr>
<tr>
<td>labelsLeft</td>
<td>标签项标题区左侧插槽</td>
</tr>
<tr>
<td>labelsRight</td>
<td>标签项标题区右侧插槽</td>
</tr>
<tr>
<td>labelsTop</td>
<td>标签项标题区顶部插槽</td>
</tr>
<tr>
<td>labelsBottom</td>
<td>标签项标题区底部插槽</td>
</tr>
</tbody>
</table>
<h2>Tab <code>&lt;PtTab&gt;</code></h2>
<p>标签项</p>
<h3>属性</h3>
<table>
<thead>
<tr>
<th>名称</th>
<th>类型</th>
<th>默认值</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>sign</td>
<td>any</td>
<td></td>
<td>标签项的标识，在父<code>PtTabs</code>组件中，应保证此值唯一，标签页切换时，会将此值对应到<code>value</code></td>
</tr>
<tr>
<td>label</td>
<td>string</td>
<td></td>
<td>标签项标题，如果标题内容较为复杂，可使用slot <code>label</code></td>
</tr>
</tbody>
</table>
         </template> </ComArticle>
</template>
<script>
    /* eslint-disable */
    import ComArticle from '../../../components/ComArticle';
    import Demo from '../../../components/Demo';
    import ComponentTabsBasic from '../demo/zh-CN/ComponentTabsBasic.vue';
    export default {
        name: 'ComponentTabs',
        data() {
            return {
                name: 'ComponentTabs',
                meta: {
                    "category": "Component",
                    "order": "1",
                    "type": "Navigation",
                    "title": "Tabs",
                    "subtitle": "标签页"
                },
                demo: [{
                    "path": "/Users/mingyu/Workspace/Project/putiui/docs/posts/data/component/tabs/demo/basic.md",
                    "exp": "md",
                    "dirName": "demo",
                    "fileName": "basic",
                    "name": "Basic",
                    "lang": "zh-CN",
                    "meta": {
                        "component": "Tabs",
                        "order": "1",
                        "title": "基础"
                    },
                    "template": "<div style=\"margin-bottom:20px;\">\n    <PtButton @click=\"add\">add</PtButton>\n    <PtButton @click=\"reduce\">reduce</PtButton>\n    <PtButton @click=\"changeMsg\">msg</PtButton>\n    <PtButton @click=\"placement='top'\">top</PtButton>\n    <PtButton @click=\"placement='right'\">right</PtButton>\n    <PtButton @click=\"placement='bottom'\">bottom</PtButton>\n    <PtButton @click=\"placement='left'\">left</PtButton>\n    <PtButton @click=\"sd=1\">sd</PtButton>\n    <h6>tabVal={{tabVal}}</h6>\n</div>\n<PtTabs v-if=\"count>0\" v-model=\"tabVal\" :placement=\"placement\">\n    <h5 slot=\"labelsLeft\">labelsLeft</h5>\n    <h5 slot=\"labelsRight\">labelsRight</h5>\n    <PtTab v-for=\"n in bc\" :key=\"n\" :sign=\"n\">\n        <span slot=\"label\">{{n+msg}}</span> tab-{{n}}\n    </PtTab>\n\n    <PtTab v-if=\"sd==1\">\n        <span slot=\"label\">{{'custom2'+msg}}</span> tab-custom2\n    </PtTab>\n    <keep-alive>\n        <PtTab>\n            <span slot=\"label\">{{'custom'+msg}}</span> tab-custom\n            <hk></hk>\n        </PtTab>\n    </keep-alive>\n\n    <PtTab v-if=\"count>2\" v-for=\"n in bc2\" :key=\"n+2\" :sign=\"n+2\">\n        <span slot=\"label\">{{(n+2)+msg}}</span> tab-{{(n+2)}}\n    </PtTab>\n\n    <h1>哈哈哈哈</h1>\n    <h2>哈哈哈22哈</h2>\n</PtTabs>\n",
                    "script": "import Vue from 'vue';\nVue.component('hk', {\n    template: `\n        <div class=\"hk\">hk=>{{msg}}</div>\n    `,\n    data() {\n        return {\n            msg: ''\n        }\n    },\n    created() {\n        this.msg = Math.random();\n    }\n})\nexport default {\n    name: 'demo',\n    data() {\n        return {\n            count: 2,\n            msg: '',\n            placement: 'top',\n            sd: 2,\n            tabVal: ''\n        }\n    },\n    computed: {\n        bc() {\n            return this.count > 2 ? 2 : this.count;\n        },\n        bc2() {\n            return this.count > 2 ? (this.count - 2) : 0;\n        }\n    },\n    methods: {\n        add() {\n            window.tt = this;\n            this.count++;\n        },\n        reduce() {\n            this.count--\n        },\n        changeMsg() {\n            this.msg = 'msg-' + Math.random() + '  ';\n        }\n    }\n}"
                }]
            }
        },
        components: {
            ComArticle,
            Demo,
            ComponentTabsBasic: ComponentTabsBasic
        }
    }

</script>
