<template>
    <div :class="['page', name ? 'page-' + name:'', type ? 'page-type-' + type:'']">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.page {
    min-height: 100%;

    .alert-top {
        margin: -15px;
        margin-bottom: 20px;
        border-top: none;
        font-size: 14px;
        padding: 20px 15px;
    }
}

.page-type-edit {
    .el-form-item {
        padding-right: 30px;
        position: relative;
    }
}
</style>


<script>
import Global from '../modules/global'
export default {
    name: 'Page',
    props: ['name', 'type'],
    beforeCreate() {
        Global.emit('orgPage.beforeCreate', this)
    },
    mounted() {
        Global.emit('orgPage.mounted', this)
    }
}
</script>
