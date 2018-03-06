import uaMatch from './uamatch';
const uaInfo = uaMatch(navigator.userAgent);
export const msie = uaInfo.browser === 'msie';
export const opera = uaInfo.browser === 'opera';
export const webkit = uaInfo.browser === 'webkit';
export const chrome = uaInfo.browser === 'chrome';
export const safari = webkit;
export const version = uaInfo.version;