import { extend } from '../../utils/index.js';
import { Direction } from '../../enum.js';
export const PtMenuDirection = extend({}, Direction);
export const PtMenuAlign = {
    left: 'left',
    center: 'center',
    right: 'right'
}
export const PtMenuPlacement = {
    top: 'top',
    auto: 'auto',
    left: 'left',
    right: 'right',
    bottom: 'bottom'
}
export const options = {
    align: PtMenuAlign.left,
    direction: PtMenuDirection.horizontal
}
