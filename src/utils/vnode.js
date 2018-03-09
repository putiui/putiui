import { has } from './object.js';
export const closest = (vm, parentTag, propName = '_componentTag') => {
    let parent = vm.$parent;
    while (parent && parent.$options[propName] !== parentTag) {
        parent = parent.$parent;
    }
    return parent;
}
export const children = (vm, childTag, propName = '_componentTag') => {
    vm = vm.$children.length > 0 && vm.$children[0].$el === vm.$el ? vm.$children[0] : vm;
    return vm.$children.filter(item => item.$options[propName] == childTag);
}
export const find = (vm, childTag, propName = '_componentTag') => {
    var result = [];
    vm.$children.forEach(item => {
        if (item.$options[propName] == childTag) {
            result.push(item);
        }
        if (item.$children && item.$children.length > 0) {
            result = result.concat(find(item, childTag));
        }
    });
    return result;
}
export const hasProp = (vm, propName) => {
    return has(vm.$options.propsData, propName);
}
