import Vue from 'vue';
import DemoReal from './index.vue';
window.$AppDemo=new Vue({
    el:'#app',
    template: '<DemoReal />',
    components: {
        DemoReal:DemoReal
    }
});
