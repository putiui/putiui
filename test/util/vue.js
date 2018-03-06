import Vue from 'vue';
import uniqueID from './uniqueid.js';
import vqueryMixin from '../../src/mixins/vquery.js';
export const createEl = () => {
    const el = document.createElement('div');
    el.id = uniqueID();
    document.body.appendChild(el);
    return el;
}
export const createVM = (spec = {}, vmCacheStore) => {
    spec = typeof spec === 'string' ? {
        template: spec
    } : spec;
    spec._vid = uniqueID() + '';
    spec.mixins = spec.mixins || [];
    spec.mixins.push(vqueryMixin);
    spec.mixins.push({
        data() {
            return {
                vid: spec._vid
            }
        },
        methods: {
            dst() {
                var oldVid = this.vid;
                this.vid = '';
                var self = this;
                this.$nextTick(() => {
                    delete window.VM[oldVid];
                    self.$destory && self.$destory();
                })
            }
        }
    });

    spec.template = `
        <div v-if="vid === '${spec._vid}'" class="vm-container">
            ${spec.template}
        </div>
    `
    spec.computed = spec.computed || {};
    spec.computed.El = function () {
        return $(this.$el).children();
    }
    spec.computed.core = function () {
        return this.getCoreVM()
    }
    spec.computed.coreEl = function () {
        return $(this.core.$el);
    }
    spec.methods = spec.methods || {};

    spec.methods.getCoreVM = function () {
        if (this.$children.length > 0) {
            if (this.$children[0] && this.$children[0].$children && this.$children[0].$children.length > 0) {
                return this.$children[0].$el === this.$children[0].$children[0].$el ? this.$children[0].$children[0] : this.$children[0];
            } else {
                return this.$children[0];
            }
        }
    }
    const vm = new Vue(spec).$mount(createEl());
    window.VM = window.VM || {};
    window.VM[spec._vid] = vm;
    if (Array.isArray(vmCacheStore)) {
        vmCacheStore.push(vm);
    }
    return vm;
}