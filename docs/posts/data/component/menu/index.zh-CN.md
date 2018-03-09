| category   | order | type    | title  | subtitle |
|------------|-------|---------|--------|----------|
| Component | 1     | Navigation | Menu | 菜单     |

[comment]: meta


菜单

[comment]: header


[comment]: spec


## Menu
菜单
Menu
SubMenu
MenuIcon
MenuItem
MenuItemGroup


### 属性
| 名称 | 类型 | 默认值  | 说明 |
| - | - | - | - |
|direction|string|horizontal|菜单渲染方向，可选值：horizontal,vertical|
|value|string &#124; { active: string; opened: [ string ] } ||**可使用`v-model`方式进行值传递和更新；**<br>传递`string`类型值时，激活`sign`值一致的`MenuItem`，当发生用户事件导致`MenuItem`激活时，会更新`value`值为激活`MenuItem`的`sign`值；<br>传递`object`类型值时，对象可包含属性：active,opened；<br>`active`接受`string`类型值，当其值不为空时，将激活`sign`值一致的`MenuItem`，当发生用户事件导致`MenuItem`激活时，会更新`value.active`值为激活`MenuItem`的`sign`值；<br>`opened`接受项目类型为`string`类型的`数组`，当其值不为空时，将打开`sign`值包含在其中的`SubMenu`，并关闭`sign`值不包含在其中的`SubMenu`；当发生用户事件导致`SubMenu`打开/关闭时，会同步更新`value.opened`值为已经打开的`SubMenu`的`sign`值的集合；|
|collapse|boolean|false|设置折叠菜单，仅在`direction`为`vertical`时有效|
|trigger|string|hover|设置打开子菜单的事件触发方式，可选值：click,hover|

### 事件
| 名称  | 说明 |
| - | - |
| input(value) |`v-model`的`input`事件，传递`value`值|


## SubMenu
子菜单

### 属性
| 名称 | 类型 | 默认值  | 说明 |
| - | - | - | - |
|sign|string||设置签名，其值应在父`Menu`组件中保持唯一|
|trigger|string||设置展开菜单项的事件触发方式，可选值：click,hover；<br>当不设置值时，默认会从父`Menu`组件的`trigger`值中获取；|
|disabled|boolean|false|禁用子菜单，禁用后无法通过用户事件(click/hover)打开和关闭，但可以通过调用父`Menu`组件实例提供的方法（open/close）或者设置父`Menu`组件的`value`值这两种方式进行子菜单的打开和关闭|


## MenuItem
菜单项
| 名称 | 类型 | 默认值  | 说明 |
| - | - | - | - |
|sign|string||设置签名，其值应在父`Menu`组件中保持唯一|
