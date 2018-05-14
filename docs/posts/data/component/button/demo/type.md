| component | order | title |
|-----------|-------|-------|
| Button    | 1     | 类型  |

[comment]: meta

[comment]: template:start
```html
<div class="btn-demo-type">
    <PtRow>
        <PtCol :span="24">
            <PtButton type="primary">primary</PtButton>
            <PtButton type="success">success</PtButton>
            <PtButton type="warning">warning</PtButton>
            <PtButton type="danger">danger</PtButton>
        </PtCol>
    </PtRow>
    <PtRow>
        <PtCol :span="24">
            <PtButton type="secondary">secondary</PtButton>
            <PtButton type="light">light</PtButton>
            <PtButton type="dark">dark</PtButton>
            <PtButton type="text">text</PtButton>
        </PtCol>
    </PtRow>
</div>
```
[comment]: template:end

[comment]: style:start
```css
.btn-demo-type{
    .pt-btn{
        width:190px;
        margin:0 10px 10px 0;
    }
}
```
[comment]: style:end
