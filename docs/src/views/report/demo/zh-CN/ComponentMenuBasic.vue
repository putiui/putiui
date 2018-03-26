 <template>     <div class="demo-real">         
<PtMenu @open="onOpen" @close="onClose">
    <PtMenuItem sign="1">Menu1</PtMenuItem>
    <PtSubMenu title="Menu2" sign="2">
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
    </PtSubMenu>
    <PtMenuItem sign="3" disabled>Menu3</PtMenuItem>
</PtMenu>
     </div> </template>    <style scoped> 

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