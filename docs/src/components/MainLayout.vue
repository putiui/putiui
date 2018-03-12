<template>
    <div class="main-layout">
        <header class="header"></header>
        <div class="left-container">
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
