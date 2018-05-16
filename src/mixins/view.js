import Vue from 'vue';
import { uniqueID } from '../utils/index.js'
const emitter = new Vue();
window.addEventListener('resize', event => {
    emitter.$emit('resize', {
        width: window.document.body.clientWidth,
        height: window.document.body.clientHeight
    })
}, false);

const components = {};

emitter.$on('resize', data => {
    Object.values(components).forEach(item => {
        item.$emit('viewResize', data);
    })
})

export default {
    data() {
        return {
            $viewComponentId: uniqueID()
        }
    },
    created() {
        components[this.$data.$viewComponentId] = this;
    },
    beforeDestroy() {
        delete components[this.$data.$viewComponentId];
    }
}
