import Vue from 'vue'
import Router from 'vue-router'

import VueProgressBar from 'vue-progressbar'

const progressBarOptions = {
    color: '#6e67ce',
    failedColor: '#db6fa2',
    thickness: '5px',
    transition: {
        speed: '0.3s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
}

export default () => {
    Vue.config.performance = true;
    Vue.config.productionTip = true;
    Vue.config.errorHandler = function (err, vm, info) {
        console.error('Vue渲染出现错误', err, vm, info)
    }
    window['___LibVersion___'] = {
        router: Router.version,
        vue: Vue.version
    };
    Vue.use(Router);
    Vue.use(VueProgressBar, progressBarOptions);
}
