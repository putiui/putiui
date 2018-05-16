| category   | order | type    | title  | subtitle |
|------------|-------|---------|--------|----------|
| Component | 1     | Navigation | Tabs | 标签页     |

[comment]: meta


标签页

[comment]: header


[comment]: spec

## Tabs `<PtTabs>`
标签页

### 属性
| 名称 | 类型 | 默认值  | 说明 |
| - | - | - | - |
|value|any||选中值，可使用`v-model`进行传递|
|placement|string|top|切换栏相对于内容区位于那一侧，可选值：auto,top,left,right,bottom；|

### Slots
| 名称  |说明 |
| - | - |
| default |默认插槽，可填充任意内容|
| labelsLeft |标签项标题区左侧插槽|
| labelsRight |标签项标题区右侧插槽|
| labelsTop |标签项标题区顶部插槽|
| labelsBottom |标签项标题区底部插槽|



## Tab `<PtTab>`
标签项

### 属性
| 名称 | 类型 | 默认值  | 说明 |
| - | - | - | - |
|sign|any||标签项的标识，在父`PtTabs`组件中，应保证此值唯一，标签页切换时，会将此值对应到`value`|
|label|string||标签项标题，如果标题内容较为复杂，可使用slot `label`|
