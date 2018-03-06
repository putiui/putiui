import { extend } from '../../utils/index.js';
import { Size, NumberSize, Type, Shape } from '../../enum.js';
export const PtButtonShape = extend({}, Shape);
export const PtButtonSize = extend({}, Size);
export const PtButtonNumberSize = extend({}, NumberSize);
export const PtButtonType = extend({
    text: 'text'
}, Type);
export const PtButtonNativeType = {
    'button': 'button',
    'submit': 'submit',
    'reset': 'reset'
}
export var options = {
    tag: 'button',
    href: 'javascript:void(0)',
    shape: '',
    iconPrefix: 'pt-icon-',
    icon: '',
    size: PtButtonSize.medium,
    type: PtButtonType.primary,
    nativeType: PtButtonNativeType.button,
    width: {}
}
