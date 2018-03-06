// 身材/形状/变形
export const Shape = {
    corner: 'corner',//存在较大程度的拐角
    round: 'round',//使左右两侧呈现半圆状
    circle: 'circle',//使整个形状呈现为绝对圆形
    'triangle-x': 'triangle-x',//使形状左右两侧呈现为三角形，拐角微量圆润
    'triangle-y': 'triangle-y'//使形状上下两侧呈现为三角形，拐角微量圆润
}

export const Size = {
    mini: 'mini',
    tiny: 'tiny',
    small: 'small',
    medium: 'medium',
    large: 'large',
    big: 'big',
    huge: 'huge',
    massive: 'massive'
}
export const NumberSize = {
    '-3': 'mini',
    '-2': 'tiny',
    '-1': 'small',
    '0': 'medium',
    '1': 'large',
    '2': 'big',
    '3': 'huge',
    '4': 'massive'
}
export const Type = {
    primary: 'primary',
    secondary: 'secondary',
    info: 'info',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
    light: 'light',
    dark: 'dark'
}

export const FlexAlign = {
    top: 'top',
    middle: 'middle',
    bottom: 'bottom'
}
export const FlexJustify = {
    start: 'start',
    center: 'center',
    end: 'end',
    'space-around': 'space-around',
    'space-between': 'space-between'
}
export const Direction = {
    horizontal: 'horizontal',
    vertical: 'vertical'
}