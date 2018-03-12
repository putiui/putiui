import PtMenu from './menu.vue';
import { PtMenuDirection, PtMenuAlign, options } from './options.js';
import exportComponent from '../../utils/export.js';

PtMenu.direction = PtMenuDirection;
PtMenu.align = PtMenuAlign;
exportComponent(PtMenu, options);

export default PtMenu;
