import PtDivider from './divider.vue';
import { PtDividerDirection, PtDividerAlign, PtDividerJustify, options } from './options.js';
import exportComponent from '../../utils/export.js';

PtDivider.direction = PtDividerDirection;
PtDivider.align = PtDividerAlign;
PtDivider.justify = PtDividerJustify;
exportComponent(PtDivider, options);

export default PtDivider;
