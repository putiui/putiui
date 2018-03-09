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
</style>
