import 'putiui/lib/css/putiui.css';
import './assets/style/base.scss'

//安装功能（请按照顺序安装）
import setting from './modules/install/setting';
import vue from './modules/install/vue';
import app from './modules/install/app';
import view from './modules/install/view';
import eventEffect from './modules/install/event-effect';

setting();
vue();
app();
view();
eventEffect();
