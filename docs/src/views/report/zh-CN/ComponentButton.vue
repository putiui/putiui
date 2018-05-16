<template>        <ComArticle :meta="meta" :demo="demo ? demo : undefined">          <template slot="header">              <p>按钮</p>
          </template> <template slot="demo">                                <Demo :data="demo[0]">                                            <ComponentButtonBasic></ComponentButtonBasic>                                        </Demo>                                <Demo :data="demo[1]">                                            <ComponentButtonType></ComponentButtonType>                                        </Demo>                        </template><template slot="spec">              <h2>配置</h2>
<p><code>button</code> 组件的默认配置及可接受的配置选项如下：</p>
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
<td>type</td>
<td>string</td>
<td>primary</td>
<td>设置按钮默认类型，可选值：primary,secondary,info,success,warning,danger,light,dark</td>
</tr>
<tr>
<td>size</td>
<td>string</td>
<td>medium</td>
<td>设置按钮默认尺寸，可选值：mini,tiny,small,medium,large,big,huge,massive</td>
</tr>
<tr>
<td>hollow</td>
<td>boolean</td>
<td>false</td>
<td>默认设置按钮镂空</td>
</tr>
<tr>
<td>outline</td>
<td>string</td>
<td></td>
<td>默认设置按钮<code>hover/active</code>状态时的样式表现，可选值为<code>空值</code>和<code>type</code>选项的所有可选值；<br>当值为<code>空值</code>时，按钮<code>hover/active</code>状态下的样式与设置的<code>type</code>值一致；<br>当值为具体值时，按钮<code>hover/active</code>状态下的样式将于<code>outline</code>值一致，如：设置<code>type=&quot;primary&quot;</code>，<code>outline=&quot;danger&quot;</code>，则<code>button</code>将表现为<code>primary</code>类型，鼠标<code>hover/active</code>时将表现为<code>danger</code>类型</td>
</tr>
<tr>
<td>target</td>
<td>string</td>
<td></td>
<td>设置按钮默认target</td>
</tr>
<tr>
<td>nativeType</td>
<td>string</td>
<td>button</td>
<td>设置按钮按钮默认的原生 <code>type</code> 值，可选值： button,submit,reset</td>
</tr>
<tr>
<td>shape</td>
<td>string|[string]</td>
<td></td>
<td>设置按钮默认形状，值可多选，但不保证相互不冲突；可选值包括：<br><code>corner</code>：存在较大程度的圆角；<br><code>round</code>：使左右两侧呈现半圆；<br><code>circle</code>：圆形；<br><code>triangle-x</code>：使左右两侧呈现为三角形，拐角微量圆润；<br><code>triangle-y</code>：使上下两侧呈现为三角形，拐角微量圆润</td>
</tr>
<tr>
<td>widthMap</td>
<td>object</td>
<td></td>
<td>设置按钮<code>width</code>值映射的class</td>
</tr>
<tr>
<td>width</td>
<td>string</td>
<td></td>
<td>设置按钮的默认宽度；<br>当 <code>width</code> 值可在 <code>widthMap</code> 中找到时，则为<code>button</code>组件添加对应的<code>class</code>，如<code>widthMap</code>配置中含有属性<code>action=&quot;btn-action&quot;</code>，那么当<code>width=&quot;action&quot;</code>时，将为<code>button</code>组件添加class <code>btn-action</code>；<br>当<code>width</code> 值无法在 <code>widthMap</code> 中找到时，将设置<code>button</code>组件的<code>css width</code>值</td>
</tr>
</tbody>
</table>
<blockquote>
<p>下文中 <code>options</code> 代表 <code>button</code> 组件use 后的配置选项</p>
</blockquote>
<h2>属性</h2>
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
<td>type</td>
<td>string</td>
<td><code>options.type</code></td>
<td>设置按钮类型，可选值：同<code>options.type</code></td>
</tr>
<tr>
<td>size</td>
<td>string</td>
<td><code>options.size</code></td>
<td>设置按钮尺寸，可选值：同<code>options.size</code></td>
</tr>
<tr>
<td>disabled</td>
<td>boolean</td>
<td>false</td>
<td>设置按钮禁用</td>
</tr>
<tr>
<td>loading</td>
<td>boolean</td>
<td>false</td>
<td>设置按钮加载状态，当值为<code>true</code>时，按钮将临时<code>disabled</code>，同时内部显示<code>loading</code> icon</td>
</tr>
<tr>
<td>active</td>
<td>boolean</td>
<td>false</td>
<td>设置按钮激活</td>
</tr>
<tr>
<td>block</td>
<td>boolean</td>
<td>false</td>
<td>设置按钮铺满父容器，变为块级元素</td>
</tr>
<tr>
<td>hollow</td>
<td>boolean</td>
<td><code>options.hollow</code></td>
<td>设置按钮镂空</td>
</tr>
<tr>
<td>outline</td>
<td>string</td>
<td><code>options.outline</code></td>
<td>设置按钮<code>hover/active</code>时状态时的样式表现，可选值：同<code>options.outline</code></td>
</tr>
<tr>
<td>href</td>
<td>string</td>
<td></td>
<td>点击跳转的地址，指定此属性 <code>button</code> 的行为和 <code>a</code> 链接一致；当<code>disabled</code>时，不会进行跳转</td>
</tr>
<tr>
<td>target</td>
<td>string</td>
<td><code>options.target</code></td>
<td>相当于 <code>a</code> 链接的 <code>target</code> 属性，<code>href</code> 存在时生效</td>
</tr>
<tr>
<td>icon</td>
<td>string</td>
<td></td>
<td>设置按钮图标</td>
</tr>
<tr>
<td>nativeType</td>
<td>string</td>
<td><code>options.nativeType</code></td>
<td>设置按钮的原生 <code>type</code> 值，可选值：同<code>options.nativeType</code></td>
</tr>
<tr>
<td>shape</td>
<td>string|[string]</td>
<td><code>options.shape</code></td>
<td>设置按钮形状，值可多选，但不保证相互不冲突；可选值：同<code>options.shape</code></td>
</tr>
<tr>
<td>height</td>
<td>string</td>
<td></td>
<td>设置按钮的高度，当<code>height</code>值是有效的<code>css height</code>值且<code>button</code>组件本身的<code>shap</code>值等于<code>circle</code>时，将会强制设置<code>width</code>值与<code>height</code>值一致以保证形状是圆形</td>
</tr>
<tr>
<td>width</td>
<td>string</td>
<td></td>
<td>设置按钮的宽度，备注同<code>options.width</code></td>
</tr>
</tbody>
</table>
          </template> </ComArticle>
</template>
<script>
    /* eslint-disable */
    import ComArticle from '../../../components/ComArticle';
    import Demo from '../../../components/Demo';
    import ComponentButtonBasic from '../demo/zh-CN/ComponentButtonBasic.vue';
    import ComponentButtonType from '../demo/zh-CN/ComponentButtonType.vue';
    export default {
        name: 'ComponentButton',
        data() {
            return {
                name: 'ComponentButton',
                meta: {
                    "category": "Component",
                    "order": "1",
                    "type": "General",
                    "title": "Button",
                    "subtitle": "按钮"
                },
                demo: [{
                    "path": "D:\\MyProject\\putiui\\docs\\posts\\data\\component\\button\\demo\\basic.md",
                    "exp": "md",
                    "dirName": "demo",
                    "fileName": "basic",
                    "name": "Basic",
                    "lang": "zh-CN",
                    "meta": {
                        "component": "Button",
                        "order": "1",
                        "title": "基础"
                    },
                    "template": "<PtButton>Button</PtButton>\n"
                }, {
                    "path": "D:\\MyProject\\putiui\\docs\\posts\\data\\component\\button\\demo\\type.md",
                    "exp": "md",
                    "dirName": "demo",
                    "fileName": "type",
                    "name": "Type",
                    "lang": "zh-CN",
                    "meta": {
                        "component": "Button",
                        "order": "1",
                        "title": "类型"
                    },
                    "template": "<div class=\"btn-demo-type\">\r\n    <PtRow>\r\n        <PtCol :span=\"24\">\r\n            <PtButton type=\"primary\">primary</PtButton>\r\n            <PtButton type=\"success\">success</PtButton>\r\n            <PtButton type=\"warning\">warning</PtButton>\r\n            <PtButton type=\"danger\">danger</PtButton>\r\n        </PtCol>\r\n    </PtRow>\r\n    <PtRow>\r\n        <PtCol :span=\"24\">\r\n            <PtButton type=\"secondary\">secondary</PtButton>\r\n            <PtButton type=\"light\">light</PtButton>\r\n            <PtButton type=\"dark\">dark</PtButton>\r\n            <PtButton type=\"text\">text</PtButton>\r\n        </PtCol>\r\n    </PtRow>\r\n</div>\r\n",
                    "style": ".btn-demo-type {\r\n    .pt-btn {\r\n        width: 190px;\r\n        margin: 0 10px 10px 0;\r\n    }\r\n}"
                }]
            }
        },
        components: {
            ComArticle,
            Demo,
            ComponentButtonBasic: ComponentButtonBasic,
            ComponentButtonType: ComponentButtonType
        }
    }

</script>
