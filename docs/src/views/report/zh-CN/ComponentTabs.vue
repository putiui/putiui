<template>      <ComArticle :meta="meta" :demo="demo ? demo : undefined">         <template slot="header">             <p>菜单</p>
         </template> <template slot="demo">                              <Demo :data="demo[0]">                                          <ComponentTabsBasic></ComponentTabsBasic>                                      </Demo>                      </template><template slot="spec">                      </template> </ComArticle>
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
                    "template": "<PtButton @click=\"add\">add</PtButton>\n<PtButton @click=\"reduce\">reduce</PtButton>\n<PtButton @click=\"changeMsg\">msg</PtButton>\n<PtButton @click=\"placement='top'\">top</PtButton>\n<PtButton @click=\"placement='right'\">right</PtButton>\n<PtButton @click=\"placement='bottom'\">bottom</PtButton>\n<PtButton @click=\"placement='left'\">left</PtButton>\n<PtButton @click=\"sd=1\">sd</PtButton>\n{{sd}} {{tabVal}}\n<PtTabs v-if=\"count>0\" v-model=\"tabVal\" :placement=\"placement\">\n    <PtTab v-for=\"n in bc\" :key=\"n\" :sign=\"n\">\n        <span slot=\"label\">{{n+msg}}</span> tab-{{n}}\n    </PtTab>\n\n    <PtTab v-if=\"sd==1\">\n        <span slot=\"label\">{{'custom2'+msg}}</span> tab-custom2\n    </PtTab>\n\n    <PtTab>\n        <span slot=\"label\">{{'custom'+msg}}</span> tab-custom\n    </PtTab>\n\n    <PtTab v-if=\"count>2\" v-for=\"n in bc2\" :key=\"n+2\" :sign=\"n+2\">\n        <span slot=\"label\">{{(n+2)+msg}}</span> tab-{{(n+2)}}\n    </PtTab>\n</PtTabs>\n",
                    "script": "export default {\n    name: 'demo',\n    data() {\n        return {\n            count: 2,\n            msg: '',\n            placement: 'top',\n            sd: 2,\n            tabVal: ''\n        }\n    },\n    computed: {\n        bc() {\n            return this.count > 2 ? 2 : this.count;\n        },\n        bc2() {\n            return this.count > 2 ? (this.count - 2) : 0;\n        }\n    },\n    methods: {\n        add() {\n            window.tt = this;\n            this.count++;\n        },\n        reduce() {\n            this.count--\n        },\n        changeMsg() {\n            this.msg = 'msg-' + Math.random() + '  ';\n        }\n    }\n}"
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
