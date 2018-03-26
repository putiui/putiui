 <template>     <div class="demo-real">         
<div class="demo-menu-box">
    <PtMenu direction="vertical" trigger="click" @open="onOpen" @close="onClose">
        <PtMenuItem sign="1">Menu1</PtMenuItem>
        <PtSubMenu title="Menu2" sign="2">
            <PtMenuItemGroup title="Group1">
                <PtMenuItem sign="21">Menu21</PtMenuItem>
                <PtMenuItem sign="22">Menu22</PtMenuItem>
                <PtSubMenu title="Menu23" sign="23">
                    <PtMenuItem sign="231">Menu231</PtMenuItem>
                    <PtMenuItem sign="232">Menu232</PtMenuItem>
                    <PtSubMenu title="Menu233" sign="233">
                        <PtMenuItem sign="2331">Menu2331</PtMenuItem>
                        <PtMenuItem sign="2332">Menu2332</PtMenuItem>
                    </PtSubMenu>
                </PtSubMenu>
            </PtMenuItemGroup>
        </PtSubMenu>
        <PtMenuItem sign="3" disabled>Menu3</PtMenuItem>
        <PtSubMenu title="Menu4" sign="4">
            <PtMenuItem sign="41">Menu41</PtMenuItem>
            <PtMenuItem sign="42">Menu42</PtMenuItem>
        </PtSubMenu>
    </PtMenu>
</div>
     </div> </template>    <style scoped> 
.demo-menu-box{
    width:220px;
}
 </style>    <script> /* eslint-disable */ 
export default {
    name: 'demo',
    data(){
        return {
        }
    },
    methods:{
        onOpen(sign){
            console.log(`open SubMenu=>${sign}`)
        },
        onClose(sign){
            console.log(`close SubMenu=>${sign}`)
        }
    }
}
 </script>  