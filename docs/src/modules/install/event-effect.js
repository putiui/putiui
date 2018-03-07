//当全局事件发生时，会产生的对应效果，在这个文件中定义
import Global from '../global';
export default () => {
    //当api目录下的相关api请求发生错误时发生
    Global.on('request.reject', event => {
        var showMsg = true,
            getTile = () => {
                return ''
            }
        if (event.data.__options__) {
            var features = event.data.__options__.features;
            if (features && features.hasOwnProperty('error')) {
                if (typeof features.error === 'boolean') {
                    showMsg = features.error;
                } else if (typeof features.error === 'object') {
                    showMsg = features.error.enabled;
                }
            }
        }
        if (event.data.__map__ && Array.isArray(event.data.__map__)) {
            var requestDataMap = event.data.__map__.find(item => {
                return item.stage === 'sending.sender';
            });
            if (requestDataMap && requestDataMap.data) {
                var requestError = requestDataMap.data,
                    rejectTitle = requestError.config ? requestError.config.rejectTitle : '';
                getTile = () => {
                    return typeof rejectTitle === 'function' ? rejectTitle() : rejectTitle;
                }
            }
        }

        var emit = () => {
            Global.emit('notify', {
                title: getTile() || '请求发生错误',
                type: 'error',
                customClass: 'request-error',
                message: `<div class="error-message-container">` + (event.data.message || '<p>未知错误！</p>') + '</div>'
            })
        }

        if (showMsg) {
            emit();
        }
    });

    //全局有通知时发生
    Global.on('notify', event => {
        if (!event.data) return;
        var options = {};
        if (typeof event.data === 'string') {
            options.message = event.data;
        } else {
            options = event.data;
        }
        options.title = options.title || '通知';
        options.type = options.type || 'info';
        options.customClass = (options.customClass || '') + ' notify-' + options.type;
        var normalNotify = () => {
            var notify = alert(options);
            options.close = function () {
                notify.close();
            }
        }
        if (typeof options.message === 'string') {
            var onClose = options.onClose;
            if (Global.view && Global.view.createMessageVNode) {
                Global.view.createMessageVNode(options.message).then(vnode => {
                    options.message = vnode;
                    options.onClose = function () {
                        if (typeof onClose === 'function') onClose();
                        //销毁message vnode实例
                        if (vnode.$fromAppMessage) {
                            if (vnode.$destroy) {
                                vnode.$destroy();
                            } else if (vnode.context && vnode.context.$destroy) {
                                vnode.context.$destroy();
                            }
                        }
                    }
                    normalNotify();
                }).catch(() => {
                    normalNotify();
                })
            } else {
                normalNotify();
            }
        } else {
            normalNotify();
        }
    });
}
