<template>
    <div class="main-layout">
        <div class="left-container">
            <slot name="left"></slot>
        </div>
        <div class="right-container">
            <router-view></router-view>
        </div>
    </div>
</template>
