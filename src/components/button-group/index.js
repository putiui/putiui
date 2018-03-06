import { PtButtonGroupSize, PtButtonGroupNumberSize, PtButtonGroupDirection, options } from './options.js';
import PtButtonGroup from './button-group.vue';
import exportComponent from '../../utils/export.js';

PtButtonGroup.size = PtButtonGroupSize;
PtButtonGroup.numberSize = PtButtonGroupNumberSize;
PtButtonGroup.direction = PtButtonGroupDirection;

exportComponent(PtButtonGroup, options);
export default PtButtonGroup;
