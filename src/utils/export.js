import { version } from '../../package.json';
import { extend } from './index.js';

export default (component, options) => {
    component.install = function (vue, ops = {}) {
        component.options(ops);
        vue.component(component.name, component);
    }
    component.version = version;
    component.options = (ops) => {
        if (ops) {
            extend(true, options, ops);
        } else {
            return options;
        }
    };
}