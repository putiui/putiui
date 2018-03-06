import { Type } from '../../enum.js';
import { extend } from '../../utils/index.js';
export const PtButtonLabelPosition = {
    left: 'left',
    right: 'right',
    top: 'top',
    bottom: 'bottom'
}
export const PtButtonLabelType = extend({ 'none': 'none' }, Type);
export var options = {
    arrow: true,
    position: PtButtonLabelPosition.left,
    type: PtButtonLabelType.none,
    validation: true
}