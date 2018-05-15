import PtTabs from './tabs.vue';
import PtTab from './tab.vue';
import exportComponent from '../../utils/export.js';
import {options,PtTabPlacement} from './options.js';

PtTabs.placement=PtTabPlacement;

exportComponent(PtTabs,options);
var install=PtTabs.install;
PtTabs.install= function(vue,ops={}) {
    install.call(this,vue,ops);
    vue.component(PtTab.name,PtTab)
}

export default PtTabs;
