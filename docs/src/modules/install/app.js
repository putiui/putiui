import Global from '../global'
import Vue from 'vue'
import App from '../../components/App'
import router from '../../router'

import filters from '../../filters'
import Enum from '../enum'
import Page from '../../components/Page'

import PutiUI from 'putiui/lib/putiui';

export default () => {
    Vue.use(PutiUI);
    Vue.use(filters) //安装filters
    Vue.use({
        install(v) {
            //挂载枚举变量
            v.prototype.$enum = Enum

            //注册常用组件
            v.component(Page.name, Page)
        }
    })

    //初始化化Vue实例
    Global.AppMain = new Vue({
        router,
        template: '<App />',
        components: {
            App
        }
    }).$mount('#appMain>.app-content')
}
