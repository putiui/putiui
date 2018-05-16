| component | order | title |
|-----------|-------|-------|
| Tabs    | 1     | 基础  |

[comment]: meta

[comment]: template:start
```html
<div style="margin-bottom:20px;">
    <PtButton @click="add">add</PtButton>
    <PtButton @click="reduce">reduce</PtButton>
    <PtButton @click="changeMsg">msg</PtButton>
    <PtButton @click="placement='top'">top</PtButton>
    <PtButton @click="placement='right'">right</PtButton>
    <PtButton @click="placement='bottom'">bottom</PtButton>
    <PtButton @click="placement='left'">left</PtButton>
    <PtButton @click="sd=1">sd</PtButton>
    <h6>tabVal={{tabVal}}</h6>
</div>
<PtTabs v-if="count>0" v-model="tabVal" :placement="placement">
    <h5 slot="labelsLeft">labelsLeft</h5>
    <h5 slot="labelsRight">labelsRight</h5>
    <PtTab v-for="n in bc" :key="n" :sign="n">
        <span slot="label">{{n+msg}}</span>
        tab-{{n}}
    </PtTab>

    <PtTab v-if="sd==1">
        <span slot="label">{{'custom2'+msg}}</span>
        tab-custom2
    </PtTab>
    <keep-alive>
        <PtTab>
            <span slot="label">{{'custom'+msg}}</span>
            tab-custom
            <hk></hk>
        </PtTab>
    </keep-alive>

    <PtTab v-if="count>2" v-for="n in bc2" :key="n+2" :sign="n+2">
        <span slot="label">{{(n+2)+msg}}</span>
        tab-{{(n+2)}}
    </PtTab>

    <h1>哈哈哈哈</h1>
    <h2>哈哈哈22哈</h2>
</PtTabs>
```
[comment]: template:end

[comment]: script:start

```js
import Vue from 'vue';
Vue.component('hk',{
    template:`
        <div class="hk">hk=>{{msg}}</div>
    `,
    data(){
        return {
            msg:''
        }
    },
    created(){
        this.msg=Math.random();
    }
})
export default {
    name: 'demo',
    data(){
        return {
            count:2,
            msg:'',
            placement:'top',
            sd:2,
            tabVal:''
        }
    },
    computed:{
        bc(){
            return this.count>2 ? 2 : this.count;
        },
        bc2(){
            return this.count>2 ? (this.count-2) : 0;
        }
    },
    methods:{
        add(){
            window.tt=this;
            this.count++;
        },
        reduce(){
            this.count--
        },
        changeMsg(){
            this.msg='msg-'+Math.random()+'  ';
        }
    }
}
```

[comment]: script:end
