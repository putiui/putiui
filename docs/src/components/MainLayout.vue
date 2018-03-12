<template>
    <div class="main-layout">
        <header class="header"></header>
        <div class="left-container">
            <PtMenu :router="true">
                <PtSubMenu title="指南">
                    <PtMenuItem to="/zh-CN/guide-install">安装</PtMenuItem>
                </PtSubMenu>
                <PtSubMenu title="组件">
                    <PtMenuItemGroup title="通用">
                        <PtMenuItem to="/zh-CN/component-menu">Button</PtMenuItem>
                    </PtMenuItemGroup>
                    <PtMenuItemGroup title="导航">
                        <PtMenuItem to="/zh-CN/component-menu">Menu</PtMenuItem>
                    </PtMenuItemGroup>
                </PtSubMenu>
            </PtMenu>

            <slot name="left"></slot>
        </div>
        <div class="right-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss">
.main-layout{
    .header{
        margin-bottom: 20px;
    }
    .left-container{
        width: 260px;
        float: left;
    }
    .right-container{
        margin-left: 260px;
        padding:15px;
        padding-top:0;
    }
}
</style>

<script>
export default {
    name: 'MainLayout'
}
</script>
