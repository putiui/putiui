import { extend } from '../../utils/index.js';
import { Direction } from '../../enum.js';
export const PtDividerDirection = extend({}, Direction);
export const PtDividerAlign = {
    top: 'top',
    middle: 'middle',
    bottom: 'bottom'
};
export const PtDividerJustify = {
    start: 'start',
    center: 'center',
    end: 'end'
}
export const options = {
    align: PtDividerAlign.middle,
    justify: PtDividerJustify.center,
    direction: PtDividerDirection.horizontal
}