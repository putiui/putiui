import PtButtonLabel from './button-label.vue';
import { PtButtonLabelPosition, PtButtonLabelType, options } from './options.js';
import exportComponent from '../../utils/export.js';

PtButtonLabel.position = PtButtonLabelPosition;
PtButtonLabel.type = PtButtonLabelType;
exportComponent(PtButtonLabel, options);

export default PtButtonLabel;
