import { extend } from '../../utils/index.js';
import { Direction } from '../../enum.js';
export const PtMenuDirection = extend({}, Direction);
export const PtMenuJustify = {
    start: 'start',
    center: 'center',
    end: 'end'
}
export const options = {
    justify: PtMenuJustify.center,
    direction: PtMenuDirection.horizontal
}
