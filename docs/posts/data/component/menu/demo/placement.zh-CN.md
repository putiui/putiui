| component | order | title |
|-----------|-------|-------|
| Menu    | 1     | 子菜单打开方向  |

[comment]: meta

[comment]: template:start

```html
<PtMenu>
    <PtSubMenu title="bottom" placement="bottom" sign="2">
        <PtMenuItem sign="21">Menu1</PtMenuItem>
        <PtMenuItem sign="22">Menu2</PtMenuItem>
    </PtSubMenu>
</PtMenu>

<PtMenu>
    <PtSubMenu title="top" placement="top" sign="2">
        <PtMenuItem sign="21">Menu1</PtMenuItem>
        <PtMenuItem sign="22">Menu2</PtMenuItem>
    </PtSubMenu>
</PtMenu>

<PtMenu>
    <PtSubMenu title="left" placement="left" sign="2">
        <PtMenuItem sign="21">Menu1</PtMenuItem>
        <PtMenuItem sign="22">Menu2</PtMenuItem>
    </PtSubMenu>
</PtMenu>

<PtMenu>
    <PtSubMenu title="right" placement="right" sign="2">
        <PtMenuItem sign="21">Menu1</PtMenuItem>
        <PtMenuItem sign="22">Menu2</PtMenuItem>
    </PtSubMenu>
</PtMenu>
```

[comment]: template:end


[comment]: style:start

```css

```

[comment]: style:end


[comment]: script:start

```js
export default {
    name: 'demo',
    data(){
        return {
        }
    }
}
```

[comment]: script:end
