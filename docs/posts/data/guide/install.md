| category   | order | title   | demo | spec |
|------------|-------|--------| ---| --- |
| Guide | 1  | 安装 | 无 | 无 |

[comment]: meta

## Npm安装
使用Npm方式安装，与打包工具（`webpack`等）配合使用
```bash
npm i putiui -S
```

## 页面引入
可以将`putiui`的js和css文件直接引入到页面中
```html
<!--完整引入-->
<!--引入样式-->
<link rel="stylesheet" href="~/putiui/lib/css/putiui.css">
<!--引入脚本-->
<script src="~/putiui/lib/putiui.js"></script>

<!--引入单个组件-->
<!--引入基础样式-->
<link rel="stylesheet" href="~/putiui/lib/css/base.css">
<!--引入组件样式-->
<link rel="stylesheet" href="~/putiui/lib/css/button.css">
<!--引入脚本-->
<script src="~/putiui/lib/components/button.js"></script>
```

[comment]: header
