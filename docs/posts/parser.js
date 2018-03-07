
const config = require('./config.js');
const fsHelper = require('./fs.js');
const jquery = require('./jquery.js');
const juicer = require('juicer');
var Mdt = require('markdown-it')();

const initialUppercase = str => {
    return str[0].toUpperCase() + str.substr(1);
}

const parser = filePath => {
    var orgContent = fsHelper.readFile(filePath);
    // 排除无关文档
    if (orgContent.indexOf(config.commentExclude) !== -1) {
        return false;
    }
    var json = {};
    json.path = filePath;
    json.exp = fsHelper.getFileExp(filePath);
    var name = fsHelper.getFileName(filePath);
    if (name.indexOf('.') > -1) {
        var arr = name.split('.');
        json.fileName = arr[0];
        json.name = initialUppercase(arr[0]);
        json.lang = config.lang.list[arr[1]] ? arr[1] : config.lang['default'];
    } else {
        json.fileName = name;
        json.name = initialUppercase(name);
        json.lang = config.lang['default'];
    }
    json.orgContent = orgContent;
    if (json.orgContent.indexOf(config.commentMeta) > -1) {
        json.meta = getMeta(json.orgContent);
        json.orgSpec = json.orgContent.substr(json.orgContent.indexOf(config.commentMeta) + config.commentMeta.length);
        json.spec = Mdt.render(json.orgSpec);
    }

    return json;
}
const getMeta = orgContent => {
    var i = orgContent.indexOf(config.commentMeta)
    if (i > -1) {
        var arr = [];
        var table = orgContent.substr(0, i);
        var $ = jquery(Mdt.render(table));
        $('body').find('thead>tr:eq(0)>th').each(function (i, item) {
            item = $(item)
            arr.push([item.html().trim()]);
        })
        $('body').find('tbody>tr:eq(0)>td').each(function (i, item) {
            item = $(item)
            arr[i][1] = item.html().trim();
        })
        return arr.reduce((res, item) => {
            res[item[0]] = item[1];
            return res;
        }, {});
    } else {
        return null;
    }
}

exports.parse = () => {
    var result = [];
    fsHelper.getFileList(config.documentPath + '/guide').forEach(item => {
        var ps = parser(item);
        if (ps !== false) {
            result.push(ps);
        }
    });
    var componentPath = config.documentPath + '/components';
    fsHelper.getFolderList(componentPath).forEach(item => {
        fsHelper.getFileList(item).forEach(art => {
            var ps = parser(item + '/index.md');
            if (ps !== false) {
                result.push(ps);
            }
        })
    });
    return result;
}

const articleTemplate = fsHelper.readFile(config.articleTemplatePath);
const demoTemplate = fsHelper.readFile(config.demoTemplatePath);
exports.buildArticle = (json) => {
    json.metaPaste = JSON.stringify(json.meta);
    json.content = juicer(articleTemplate, json);
    json.componentName = json.name + (json.meta.order || '');
    json.savePath = config.articleExportPath + '/' + json.componentName + '.vue';
    if (json.demo && json.demo.length > 0) {
        json.demo.forEach(item => {
            item.componentName = json.componentName + item.name + (item.meta.order || '');
            item.importPath = './demo/' + item.componentName;
            item.savePath = config.demoExportPath + '/' + item.componentName + '.vue';
            item.content = juicer(demoTemplate, item);
        })
    }
}

exports.reportFile = parseResult => {
    parseResult.forEach(item => {
        exports.buildArticle(item);
        fsHelper.saveFile(item.savePath, item.content);
        if (item.demo && item.demo.length > 0) {
            item.demo.forEach(demo => {
                fsHelper.saveFile(demo.savePath, demo.content)
            })
        }
    })
}