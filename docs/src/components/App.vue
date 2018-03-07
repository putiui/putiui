<template>
    <div class="app-body">
        <vue-progress-bar></vue-progress-bar>
        <transition name="el-fade-in" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import Global from '../modules/global';
export default {
    name: 'app',
    created() {
        this.$Progress.start();
    },
    mounted() {
        this.$Progress.finish();
        setTimeout(() => {
            Global.view.init();
        })
    }
}
</script>
