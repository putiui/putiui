<template>      <div class="demo-real">         <div class="demo-menu-box">
    <PtButton @click="collapseMenu">{{collapsed ? '展开' : '折叠'}}</PtButton>
    <PtMenu direction="vertical" trigger="click" placement="bottom" :collapsed="collapsed" @open="onOpen" @close="onClose">
        <PtMenuItem sign="1">
            <i class="fa fa-user" slot="icon"></i> Menu1
        </PtMenuItem>
        <PtSubMenu title="Menu2" sign="2">
            <i class="fa fa-user" slot="icon"></i>
            <PtMenuItemGroup title="Group1">
                <PtMenuItem sign="21">
                    <i class="fa fa-user" slot="icon"></i>Menu21
                </PtMenuItem>
                <PtMenuItem sign="22">
                    <i class="fa fa-user" slot="icon"></i>Menu22
                </PtMenuItem>
            </PtMenuItemGroup>
        </PtSubMenu>
        <PtMenuItem sign="3" disabled>
            <i class="fa fa-user" slot="icon"></i>Menu3
        </PtMenuItem>
        <PtSubMenu title="Menu4" sign="4">
            <i class="fa fa-user" slot="icon"></i>
            <PtMenuItem sign="41">
                <i class="fa fa-user" slot="icon"></i>Menu41
            </PtMenuItem>
            <PtMenuItem sign="42">
                <i class="fa fa-user" slot="icon"></i>Menu42
            </PtMenuItem>
        </PtSubMenu>
    </PtMenu>
</div>
     </div>  </template>
<style lang="scss" scoped>
    .demo-menu-box {
        width: 220px;
    }

</style>
<script>
    /* eslint-disable */
    export default {
        name: 'demo',
        data() {
            return {
                collapsed: false
            }
        },
        methods: {
            onOpen(sign) {
                console.log(`open SubMenu=>${sign}`)
            },
            onClose(sign) {
                console.log(`close SubMenu=>${sign}`)
            },
            collapseMenu() {
                console.log(222);
                this.collapsed = !this.collapsed;
            }
        }
    }

</script>
