import { extend } from '../../utils/index.js';
import { Direction } from '../../enum.js';
import { PtButtonSize, PtButtonNumberSize, options as ButtonOptions } from '../button/options.js';
export const PtButtonGroupSize = extend({}, PtButtonSize);
export const PtButtonGroupNumberSize = extend({}, PtButtonNumberSize);
export const PtButtonGroupDirection = extend({}, Direction);
export const options = {
    size: '',
    direction: PtButtonGroupDirection.horizontal,
    equalWidth: false
}