import { PtButtonSize, PtButtonNumberSize, PtButtonType, PtButtonNativeType, PtButtonShape, options } from './options.js';
import PtButton from './button.vue';
import exportComponent from '../../utils/export.js';

PtButton.shape = PtButtonShape;
PtButton.size = PtButtonSize;
PtButton.numberSize = PtButtonNumberSize;
PtButton.type = PtButtonType;
PtButton.nativeType = PtButtonNativeType;

exportComponent(PtButton, options);

export default PtButton;
