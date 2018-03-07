| category   | order | type    | title  | subtitle |
|------------|-------|---------|--------|----------|
| Components | 1     | General | Button | 按钮     |
[comment]: meta

## 配置
`button` 组件的默认配置及可接受的配置选项如下：
| 名称 | 类型 | 默认值 | 描述 |
| - | - | - | - |
| type | string | primary | 设置按钮默认类型，可选值：primary,secondary,info,success,warning,danger,light,dark |
| size | string | medium | 设置按钮默认尺寸，可选值：mini,tiny,small,medium,large,big,huge,massive |
| hollow | boolean | false | 默认设置按钮镂空 |
| outline | string |  | 默认设置按钮`hover/active`状态时的样式表现，可选值为`空值`和`type`选项的所有可选值；<br>当值为`空值`时，按钮`hover/active`状态下的样式与设置的`type`值一致；<br>当值为具体值时，按钮`hover/active`状态下的样式将于`outline`值一致，如：设置`type="primary"`，`outline="danger"`，则`button`将表现为`primary`类型，鼠标`hover/active`时将表现为`danger`类型 |
| target | string | | 设置按钮默认target |
| nativeType | string | button | 设置按钮按钮默认的原生 `type` 值，可选值： button,submit,reset |
| shape | string&#124;[string] | | 设置按钮默认形状，值可多选，但不保证相互不冲突；可选值包括：<br>`corner`：存在较大程度的圆角；<br>`round`：使左右两侧呈现半圆；<br>`circle`：圆形；<br>`triangle-x`：使左右两侧呈现为三角形，拐角微量圆润；<br>`triangle-y`：使上下两侧呈现为三角形，拐角微量圆润 |
| widthMap | object | | 设置按钮`width`值映射的class |
| width | string | | 设置按钮的默认宽度；<br>当 `width` 值可在 `widthMap` 中找到时，则为`button`组件添加对应的`class`，如`widthMap`配置中含有属性`action="btn-action"`，那么当`width="action"`时，将为`button`组件添加class `btn-action`；<br>当`width` 值无法在 `widthMap` 中找到时，将设置`button`组件的`css width`值 |

> 下文中 `options` 代表 `button` 组件use 后的配置选项

## 属性
| 名称 | 类型 | 默认值  | 描述 |
| - | - | - | - |
| type | string | `options.type` | 设置按钮类型，可选值：同`options.type` |
| size | string | `options.size` | 设置按钮尺寸，可选值：同`options.size` |
| disabled | boolean | false | 设置按钮禁用 |
| loading | boolean | false | 设置按钮加载状态，当值为`true`时，按钮将临时`disabled`，同时内部显示`loading` icon |
| active | boolean | false | 设置按钮激活 |
| block | boolean | false | 设置按钮铺满父容器，变为块级元素 |
| hollow | boolean | `options.hollow` | 设置按钮镂空 |
| outline | string | `options.outline` | 设置按钮`hover/active`时状态时的样式表现，可选值：同`options.outline` |
| href | string | | 点击跳转的地址，指定此属性 `button` 的行为和 `a` 链接一致；当`disabled`时，不会进行跳转 |
| target | string | `options.target` | 相当于 `a` 链接的 `target` 属性，`href` 存在时生效 |
| icon | string | | 设置按钮图标 |
| nativeType | string | `options.nativeType` | 设置按钮的原生 `type` 值，可选值：同`options.nativeType` |
| shape | string&#124;[string] | `options.shape` | 设置按钮形状，值可多选，但不保证相互不冲突；可选值：同`options.shape` |
| height | string | | 设置按钮的高度，当`height`值是有效的`css height`值且`button`组件本身的`shap`值等于`circle`时，将会强制设置`width`值与`height`值一致以保证形状是圆形 |
| width | string | | 设置按钮的宽度，备注同`options.width` |
