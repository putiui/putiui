<template>        <ComArticle :meta="meta" :demo="demo ? demo : undefined">          <template slot="header">              <p>标签页</p>
          </template> <template slot="demo">                                <Demo :data="demo[0]">                                            <ComponentTabsBasic></ComponentTabsBasic>                                        </Demo>                        </template><template slot="spec">              <h2>Tabs <code>&lt;PtTabs&gt;</code></h2>
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
                    "path": "D:\\MyProject\\putiui\\docs\\posts\\data\\component\\tabs\\demo\\basic.md",
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
                    "template": "<div style=\"margin-bottom:20px;\">\r\n    <PtButton @click=\"add\">add</PtButton>\r\n    <PtButton @click=\"reduce\">reduce</PtButton>\r\n    <PtButton @click=\"changeMsg\">msg</PtButton>\r\n    <PtButton @click=\"placement='top'\">top</PtButton>\r\n    <PtButton @click=\"placement='right'\">right</PtButton>\r\n    <PtButton @click=\"placement='bottom'\">bottom</PtButton>\r\n    <PtButton @click=\"placement='left'\">left</PtButton>\r\n    <PtButton @click=\"sd=1\">sd</PtButton>\r\n    <h6>tabVal={{tabVal}}</h6>\r\n</div>\r\n<PtTabs v-if=\"count>0\" v-model=\"tabVal\" :placement=\"placement\">\r\n    <h5 slot=\"labelsLeft\">labelsLeft</h5>\r\n    <h5 slot=\"labelsRight\">labelsRight</h5>\r\n    <PtTab v-for=\"n in bc\" :key=\"n\" :sign=\"n\">\r\n        <span slot=\"label\">{{n+msg}}</span> tab-{{n}}\r\n    </PtTab>\r\n\r\n    <PtTab v-if=\"sd==1\">\r\n        <span slot=\"label\">{{'custom2'+msg}}</span> tab-custom2\r\n    </PtTab>\r\n    <keep-alive>\r\n        <PtTab>\r\n            <span slot=\"label\">{{'custom'+msg}}</span> tab-custom\r\n            <hk></hk>\r\n        </PtTab>\r\n    </keep-alive>\r\n\r\n    <PtTab v-if=\"count>2\" v-for=\"n in bc2\" :key=\"n+2\" :sign=\"n+2\">\r\n        <span slot=\"label\">{{(n+2)+msg}}</span> tab-{{(n+2)}}\r\n    </PtTab>\r\n</PtTabs>\r\n",
                    "script": "import Vue from 'vue';\r\nVue.component('hk', {\r\n    template: `\r\n        <div class=\"hk\">hk=>{{msg}}</div>\r\n    `,\r\n    data() {\r\n        return {\r\n            msg: ''\r\n        }\r\n    },\r\n    created() {\r\n        this.msg = Math.random();\r\n    }\r\n})\r\nexport default {\r\n    name: 'demo',\r\n    data() {\r\n        return {\r\n            count: 2,\r\n            msg: '',\r\n            placement: 'top',\r\n            sd: 2,\r\n            tabVal: ''\r\n        }\r\n    },\r\n    computed: {\r\n        bc() {\r\n            return this.count > 2 ? 2 : this.count;\r\n        },\r\n        bc2() {\r\n            return this.count > 2 ? (this.count - 2) : 0;\r\n        }\r\n    },\r\n    methods: {\r\n        add() {\r\n            window.tt = this;\r\n            this.count++;\r\n        },\r\n        reduce() {\r\n            this.count--\r\n        },\r\n        changeMsg() {\r\n            this.msg = 'msg-' + Math.random() + '  ';\r\n        }\r\n    }\r\n}"
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
