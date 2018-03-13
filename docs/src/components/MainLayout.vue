<template>
    <div class="main-layout">
        <header class="header"></header>
        <div class="left-container">
            <pt-menu :router="true" direction="vertical">
                <pt-sub-menu title="指南" sign="1">
                    <pt-menu-item to="/zh-CN/component-menu" sign="11">Button</pt-menu-item>
                </pt-sub-menu>
                <pt-sub-menu title="组件" sign="2">
                    <i class="fa fa-money" slot="icon"></i>
                    <pt-menu-item-group title="通用">
                        <pt-menu-item to="/zh-CN/component-menu" sign="21">
                            <i class="fa fa-user" slot="icon"></i>Button
                        </pt-menu-item>
                    </pt-menu-item-group>
                    <pt-menu-item-group title="导航">
                        <pt-menu-item to="/zh-CN/component-menu" sign="22">
                            <i class="fa fa-reorder" slot="icon"></i>Menu
                        </pt-menu-item>
                    </pt-menu-item-group>
                </pt-sub-menu>
            </pt-menu>

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
