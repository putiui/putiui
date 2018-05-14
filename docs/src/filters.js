import Enum from './modules/enum';

export default {
    install(Vue) {
        //获取枚举文字
        Vue.filter('enumText', function (val, enumType, defaultText) {
            if (Enum[enumType]) {
                return Enum[enumType][val] || defaultText
            } else {
                return val;
            }
        })
    }
}
