| category   | order | type    | title  | subtitle |
|------------|-------|---------|--------|----------|
| Component | 1     | Navigation | Menu | 菜单     |

[comment]: meta


菜单

[comment]: header


[comment]: spec


## Menu
菜单

### 属性
| 名称 | 类型 | 默认值  | 说明 |
| - | - | - | - |
|direction|string|horizontal|菜单渲染方向，可选值：horizontal,vertical|
|value|string &#124; { active: string; opened: [ string ] } ||**可使用`v-model`方式进行值传递和更新；**<br>传递`string`类型值时，激活`sign`值一致的`MenuItem`，当发生用户事件导致`MenuItem`激活时，会更新`value`值为激活`MenuItem`的`sign`值；<br>传递`object`类型值时，对象可包含属性：active,opened；<br>`active`接受`string`类型值，当其值不为空时，将激活`sign`值一致的`MenuItem`，当发生用户事件导致`MenuItem`激活时，会更新`value.active`值为激活`MenuItem`的`sign`值；<br>`opened`接受项目类型为`string`类型的`数组`，当其值不为空时，将打开`sign`值包含在其中的`SubMenu`，并关闭`sign`值不包含在其中的`SubMenu`；当发生用户事件导致`SubMenu`打开/关闭时，会同步更新`value.opened`值为已经打开的`SubMenu`的`sign`值的集合；|
|collapsed|boolean|false|折叠菜单，仅当`direction`等于`vertical`时有效|
|trigger|string|hover|设置打开子菜单的事件触发方式，可选值：click,hover；<br>当`direction`等于`vertical`且`collapsed`等于`false`时此项配置无效，`SubMenu`将一直以`click`方式打开|
|route|boolean|false|设置子组件`MenuItem`以vue-router模式跳转|
|route-replace|boolean|false|设置router以replace方式调用，仅在`route`值为真时有效|
|align|string|left|设置子组件`MenuItem`对齐方式|
|placement|string|auto|设置子组件`SubMenu`弹出框打开位置，可选值：auto,top,left,right,bottom；|

### 事件
| 名称  | 说明 |
| - | - |
| select(sign) |子组件`MneuItem`单击时触发，传递该`MenuItem`的`sign`值|
| input(value) |`v-model`的`input`事件，传递`value`值|
| open(sign) |子组件`SubMenu`打开时触发，传递该`SubMenu`的`sign`值，此事件仅在用户事件发生时触发，手动调用`Menu`组件的`open`方法时不进行触发|
| close(sign) |子组件`SubMenu`关闭时触发，传递该`SubMenu`的`sign`值，此事件仅在用户事件发生时触发，手动调用`Menu`组件的`close`方法时不进行触发|

### 方法
| 名称  |说明 |
| - | - |
| open(sign) |打开`sign`值对应的`SubMenu`子组件|
| close(sign) |关闭`sign`值对应的`SubMenu`子组件|


## SubMenu
子菜单

### 属性
| 名称 | 类型 | 默认值  | 说明 |
| - | - | - | - |
|sign|string||设置签名，其值应在父`Menu`组件中保持唯一|
|title|string||设置标题|
|trigger|string|`Menu.trigger`|设置展开菜单项的事件触发方式，可选值：click,hover；<br>当不设置值时，默认会从父`Menu`组件的`trigger`值中获取；|
|disabled|boolean|false|禁用子菜单，禁用后无法通过用户事件(click/hover)打开和关闭，但可以通过调用父`Menu`组件实例提供的方法（open/close）或者设置父`Menu`组件的`value`值这两种方式进行子菜单的打开和关闭|
|route|boolean|`Menu.route`|设置以vue-router模式跳转，默认值取父组件`Menu`的`route`属性值|
|to|string||设置跳转链接，`route`值为真时，作用同`route-link`的`to`属性，否则作用同`a`标签的`href`属性|
|route-replace|boolean|`Menu.route-replace`|设置router以replace方式调用，仅在`route`值为真时有效|
|target|string||设置跳转目标，作用同`a`标签的`target`属性，仅当`route`值不为真时有效|
|placement|string|`Menu.placement`|设置`SubMenu`弹出框打开位置，可选值：auto,top,left,right,bottom；当设置为`auto`值时，框架会自动设置位置，规则是：<br>父`Menu`组件`direction`等于`horizontal`时，其值为`bottom`；<br>父`Menu`组件`direction`等于`vertical`时，其值为`right`；|
|align|string|`Menu.align`|设置子组件`MenuItem`对齐方式，默认值取父组件`Menu`的`align`属性值|

### Slot
| 名称  |说明 |
| - | - |
| icon |图标插槽|
| title |标题插槽，如果此插槽存在内容则忽略组件本身的`title`属性|


## MenuItem
菜单项

### 属性
| 名称 | 类型 | 默认值  | 说明 |
| - | - | - | - |
|sign|string||设置签名，其值应在父`Menu`组件中保持唯一|
|title|string||设置标题|
|to|string||设置跳转链接，`route`值为真时，作用同`route-link`的`to`属性，否则作用同`a`标签的`href`属性|
|target|string||设置跳转目标，作用同`a`标签的`target`属性|
|disabled|boolean|false|禁用菜单，禁用后无法点击|
|route|boolean|`SubMenu.route`|设置以vue-router模式跳转，默认值取父组件`SubMenu`的`route`属性值，此值为`true`时，请务必设置`to`属性|
|route-replace|boolean|`SubMenu.route-replace`|设置router以replace方式调用，仅在`route`值为真时有效|
|align|string|`SubMenu.align`|设置对齐方式，默认值取父组件`SubMenu`的`align`属性值|

### Slot
| 名称  |说明 |
| - | - |
| icon |图标插槽|
| title |标题插槽，如果此插槽存在内容则忽略组件本身的`title`属性|