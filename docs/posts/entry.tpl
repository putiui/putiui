import Vue from 'vue';
import DemoReal from './${componentName}.vue';
window.$AppDemo=new Vue({
    el:'#app',
    template: '<DemoReal />',
    components: {
        DemoReal:DemoReal
    }
});
