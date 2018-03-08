| component | order | title |
|-----------|-------|-------|
| Button    | 1     | 基础  |

[comment]: meta

[comment]: template:start

```html
<PtButton>Button</PtButton>
```

[comment]: template:end


[comment]: style:start

```css
.btn-action{
    color: red;
}
```

[comment]: style:end


[comment]: script:start

```js
import Vue from 'vue';
import { PtButton } from 'putiui';

Vue.use(PtButton);

export default {
    name: 'demo',
    data(){
        return {
            message:'Hello'
        }
    }
}
```

[comment]: script:end
