import { readOnly, getValue, setValue } from '../utils/index';
import config from './config.js';
import Enum from './enum';
import mitt from 'mitt';
var root = typeof window === 'object' ? window : this;

/**
 * 属性只读，不可写入，不可遍历，不可修改defineProperty
 * @param {*} prop 属性名称
 * @param {*} value 属性值
 */
var _readOnly = (prop, value) => {
    readOnly(root.___Scope___, prop, value);
}

/**
 * 属性只可以被写入，无法遍历和修改defineProperty
 * @param {*} prop 属性名称
 * @param {*} value 属性值
 */
var write = (prop, value) => {
    if (Object.defineProperty) {
        Object.defineProperty(root.___Scope___, prop, {
            value: value,
            writable: true
        })
    } else {
        root.___Scope___[prop] = value;
    }
}

if (!root.___Scope___) {
    root.___Scope___ = {
        readOnly: _readOnly,
        write: write,
        pool: {}
    };
    _readOnly('start', root.___start___ || new Date().getTime());
    _readOnly('root', root);

    //全局注册config
    write('___config___', config);
    _readOnly('config', function (propExp, value) {
        //获取/设置config属性，默写属性只可以被获取，无法设置值

        var isGet = arguments.length < 2;

        if (propExp === 'agent') {
            return getAgent();
        }
        if (propExp === 'apiHost' || propExp.indexOf('apiHost.') == 0 || propExp.indexOf('apiHost[') === 0) {
            return getApiHost(propExp);
        }

        if (isGet) {
            return getValue(propExp, config);
        } else {
            //如果env被非构建时期修改，则触发全局事件：changeEnv
            if (propExp === 'env') {
                root.___Scope___.emit('changeEnv', value);
                if (!Enum.env[value]) {
                    //非法值不予修改
                    return;
                }
            }
            setValue(propExp, value, config);
        }
    });
}

var getAgent = () => {
    return `${config.env}|${config.version}|${root.navigator.userAgent}`;
}

var getApiHost = (propExp) => {
    propExp = propExp.trim();
    if (propExp === 'apiHost' || propExp === 'apiHost.') {
        return config.apiHost['default'][config.env];
    } else if (propExp.indexOf('.') == propExp.lastIndexOf('.')) {
        return getValue(propExp + `['${config.env}']`, config);
    } else {
        return getValue(propExp + `['${config.env}']`, config);
    }
}

//事件总线
let emitter = mitt();
let eventsMap = {};

var parser = type => {
    if (!type || (type + '').trim() === '') return;
    type = (type + '').trim();
    var result = {
        namespace: 'default'
    };

    let index = type.indexOf('.');
    if (index === -1 || index === type.length - 1) {
        result.type = type;
    } else {
        result.type = type.substr(0, index);
        result.namespace = type.substr(index + 1);
    }
    return result;
}

var inputMap = (type, handler) => {
    var event = parser(type);
    eventsMap[event.type] = eventsMap[event.type] || {};
    eventsMap[event.type][event.namespace] = eventsMap[event.type][event.namespace] || [];
    eventsMap[event.type][event.namespace].push(handler);
}

var outputMap = (event, handler) => {
    var result;
    if (eventsMap[event.type]) {
        if (!handler || typeof handler !== 'function') {
            //直接按照命名空间删除事件处理程序
            if (event.namespace === 'default') {
                result = eventsMap[event.type];
                delete eventsMap[event.type];
            } else {
                result = eventsMap[event.type][event.namespace];
                delete eventsMap[event.type][event.namespace];
            }
        } else {
            //在事件命名空间下寻找指定事件处理程序并移除
            var handlers = eventsMap[event.type][event.namespace],
                index = handlers.indexOf(handler);
            if (index != -1) {
                handlers.splice(index, 1);
            }
            result = handler;
        }
    }
    return result;
}

var offEvent = (type, handler) => {
    var event = parser(type),
        handlers = outputMap(event, handler),
        eventName = event.namespace === 'default' ? event.type : event.type + '.' + event.namespace;
    if (Array.isArray(handlers)) {
        handlers.forEach(item => {
            emitter.off(eventName, item);
        })
    } else {
        emitter.off(eventName, handlers);
    }
}
_readOnly('on', (type, handler) => {
    inputMap(type, handler);
    emitter.on(type, handler);
})
_readOnly('off', (type, handler) => {
    offEvent(type, handler);
})
_readOnly('emit', (type, data) => {
    var event = parser(type);
    event.namespace = event.namespace === 'default' ? '' : event.namespace;
    event.ts = new Date().getTime();
    event.data = data;
    if (root.___Scope___.config('debug')) {
        console.info(`[EventBus.Emit:${type}]`, event);
    }
    emitter.emit(type, event);
})

// 全局数据缓存与处理
_readOnly('push', (name, value) => {
    root.___Scope___.pool[name] = value;
    localStorage.setItem(`Pool.${name}`, JSON.stringify(value));
})
_readOnly('pull', (name) => {
    var result = root.___Scope___.pool[name];
    if (result) {
        delete root.___Scope___.pool[name];
    } else {
        try {
            result = localStorage.getItem(`Pool.${name}`)
            result = JSON.parse(result);
        } catch (error) {
            result = undefined;
        }
    }
    localStorage.removeItem(`Pool.${name}`)

    return result;
})

export default root.___Scope___;
