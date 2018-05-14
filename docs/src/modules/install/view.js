import Vue from 'vue';
import Global from '../global';
import { setDocumentTile, isVNode, extend } from '../../utils/index';

export default () => {
    let AppMessage = document.getElementById('appHtmlMessage');
    Global.readOnly('view', {
        setTitle(title) {
            if (!title || (title + '').trim() === '') {
                setDocumentTile(Global.config('name'));
            } else {
                setDocumentTile(title);
            }
        },
        getTitle(meta) {
            return meta.title + Global.config('titleSeparator') + Global.config('name');
        },
        init() {
            document.getElementById('appCover').style.display = 'none';
            document.getElementById('appMain').style.display = 'block';
        },
        hideMain() {
            document.getElementById('appMain').style.display = 'none';
        },
        showMain() {
            document.getElementById('appMain').style.display = 'block';
        },
        createMessageVNode(message, spec) {
            return new Promise((resolve, reject) => {
                if (isVNode(message)) {
                    resolve(message);
                } else {
                    var div = document.createElement('div');
                    div.id = (Math.random() + '').replace('0.', '');
                    AppMessage.appendChild(div);
                    var data = spec ? spec.data : null;
                    if (spec) {
                        delete spec.data;
                    }
                    new Vue({
                        data: extend(true, {
                            $fromAppMessage: true
                        }, data || {}),
                        mixins: [spec || {}],
                        el: div,
                        template: `<div class="message-container" id="MSG${div.id}">${message}</div>`,
                        mounted() {
                            this._vnode.$fromAppMessage = true;
                            resolve(this._vnode);
                        }
                    })
                }
            })
        }
    });
}
