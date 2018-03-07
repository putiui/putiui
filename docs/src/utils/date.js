import moment from 'moment';

//与moment.js的格式化占位符一致：http://momentjs.cn/docs/#/parsing/string-format/
export var formatDate = (dt, format) => {
    format = format || 'YYYY-MM-DD';
    return moment(dt).format(format);
}
