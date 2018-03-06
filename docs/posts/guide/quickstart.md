# 快速上手
## 引入PtUI
你可以完整引入，或是根据需要仅引入部分组件。

### 完整引入
```js
import Vue from 'vue';
import PutiUI from 'putiui';
import 'putiui/lib/css/putiui.css';

Vue.use(PutiUI);
```

### 按需引入
```js
import { PtButton } from 'putiui';
import 'putiui/lib/css/button.css';

// 全局可使用组件
Vue.use(PtButton)

// 组件内部可使用
Vue.component('user-component',{
    template:`
    <div class="user-component">
        <pt-button>Submit</pt-button>
    </div>
    `,
    components: {
        PtButton
    }
})
```

## 修改默认配置
PutiUI 中的一些样式和功能受到配置影响，你可以在引入PtUI时修改这些默认配置。
### 完整引入时
```js
import Vue from 'vue';
import PutiUI from 'putiui';
Vue.use(PutiUI, {
    prefix: 'pt-'
});
```
上面的设置代表：使用组件时以`pt-`为前缀作为标签名，如`pt-button`；

PutiUI 还可以进行下列配置：

| 配置项 | 类型 | 默认值 | 可选值 | 描述 |
| ------ | --- | ------ | ----- | ---- |
| prefix | string | pt- | | 为所以组件设置标签名前缀 |
| size | string | | mini, tiny, small, medium, large, big, huge, massive | 设置所有包含`size`选项的组件设置默认值 |
| 组件名称 | object | 组件默认配置 | | 如要修改`pt-button`组件的默认配置，可使用`Vue.use(PutiUI,{ PtButton: {...}})`的方式进行配置，其他组件类似 |

### 按需引入时
PutiUI 中的每个组件几乎都存在默认配置，你可以在引入这些组件时进行修改。
```js
import Vue from 'vue';
import { PtButton } from 'putiui';
Vue.use(PtButton, {
    size: 'large'
})
```
组件的详细配置选项请在组件的说明中查找。

### 配置读取优先级
- 如果组件本身存在的配置项与PtUI全局的配置项名称一致时，优先获取组件本身的配置
