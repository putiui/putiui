import Vue from 'vue';
import { uniqueID } from '../utils/index.js'
import debounce from 'lodash.debounce';

const emitter = new Vue();
window.addEventListener('resize', debounce(event => {
    emitter.$emit('resize', {
        timeStamp: event.timeStamp,
        width: window.document.body.clientWidth,
        height: window.document.body.clientHeight
    })
}, 300), false);
window.addEventListener('click', event => {
    emitter.$emit('click', {
        type: event.type,
        timeStamp: event.timeStamp,
        x: event.x,
        y: event.y,
        clientX: event.clientX,
        clientY: event.clientY,
        currentTarget: event.currentTarget,
        target: event.target,
        layerX: event.layerX,
        layerY: event.layerY,
        offsetX: event.offsetX,
        offsetY: event.offsetY,
        pageX: event.pageX,
        pageY: event.pageY,
        screenX: event.screenX,
        screenY: event.screenY
    })
}, false);

const components = {};
const events = ['resize', 'click', 'touchstart', 'touchmove', 'touchend', 'touchcancel'];
events.forEach(type => {
    emitter.$on(type, data => {
        Object.values(components).forEach(item => {
            item.$emit('view.' + type, data);
        })
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
