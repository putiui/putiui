<template>
    <div class="main-layout">
        <header class="header">
        </header>
        <div class="left-container">
            <PtMenu v-model="value" direction="vertical" trigger="click" :router="true">
                <PtSubMenu title="指南" sign="1" :disabled="lock">
                    <PtMenuItem to="/zh-CN/guide-install" sign="11">安装</PtMenuItem>
                </PtSubMenu>
                <PtSubMenu title="组件" sign="2" :disabled="lock">
                    <i class="fa fa-money" slot="icon"></i>
                    <PtMenuItemGroup title="通用">
                        <PtMenuItem to="/zh-CN/component-button" sign="21">
                            <i class="fa fa-user" slot="icon"></i>Button
                        </PtMenuItem>
                    </PtMenuItemGroup>
                    <PtMenuItemGroup title="导航">
                        <PtMenuItem to="/zh-CN/component-menu" sign="22">
                            <i class="fa fa-reorder" slot="icon"></i>Menu
                        </PtMenuItem>
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
        height: 60px;
        background: #ccc;
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
    name: 'MainLayout',
    data() {
        return {
            value: '11',
            lock: false
        }
    },
    methods: {
        open() {
            console.log(`open`)
        },
        close() {
            console.log(`close`)
        }
    },
    created() {
        window.tt = this;
    }
}
</script>
