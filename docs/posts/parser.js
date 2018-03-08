
const config = require('./config.js');
const fsHelper = require('./fs.js');
const jquery = require('./jquery.js');
const juicer = require('juicer');
var Mdt = require('markdown-it')({
    html: true
});
const buildDemoHtml = require('./demo.js');

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
    json.dirName = filePath.substring(0, filePath.lastIndexOf('\\'));
    json.dirName = json.dirName.substr(json.dirName.lastIndexOf('\\') + 1).trim();
    var name = fsHelper.getFileName(filePath);
    json.fileName = name;
    if (name.indexOf('.') > -1) {
        var arr = name.split('.');
        json.name = initialUppercase(arr[0]);
        json.lang = config.lang.list[arr[1]] ? arr[1] : config.lang['default'];
    } else {
        json.name = initialUppercase(name);
        json.lang = config.lang['default'];
    }
    json.orgContent = orgContent;
    //截取meta信息
    if (json.orgContent.indexOf(config.commentMeta) > -1) {
        json.meta = getMeta(json.orgContent);
    }
    //截取头部
    if (json.orgContent.indexOf(config.commentHeader) > -1) {
        json.orgHeader = json.orgContent.substring(json.orgContent.indexOf(config.commentMeta) + config.commentMeta.length, json.orgContent.indexOf(config.commentHeader));
        json.header = Mdt.render(json.orgHeader);
    }
    //截取说明书
    if (json.orgContent.indexOf(config.commentSpec) > -1) {
        json.orgSpec = json.orgContent.substr(json.orgContent.indexOf(config.commentSpec) + config.commentSpec.length);
        json.spec = Mdt.render(json.orgSpec);
    }
    //截取template
    if (json.orgContent.indexOf(config.commentTemplateStart) > -1) {
        json.orgTemplate = json.orgContent.substring(json.orgContent.indexOf(config.commentTemplateStart) + config.commentTemplateStart.length, json.orgContent.indexOf(config.commentTemplateEnd));
        let i2 = json.orgTemplate.indexOf('```\n');
        json.template = json.orgTemplate.substring(json.orgTemplate.indexOf('```html') + 7, i2 == -1 ? json.orgTemplate.indexOf('```\r\n') : i2);
    }
    //截取style
    if (json.orgContent.indexOf(config.commentStyleStart) > -1) {
        json.orgStyle = json.orgContent.substring(json.orgContent.indexOf(config.commentStyleStart) + config.commentStyleStart.length, json.orgContent.indexOf(config.commentStyleEnd));
        let i2 = json.orgStyle.indexOf('```\n');
        json.style = json.orgStyle.substring(json.orgStyle.indexOf('```css') + 6, i2 == -1 ? json.orgStyle.indexOf('```\r\n') : i2);
    }
    //截取script
    if (json.orgContent.indexOf(config.commentScriptStart) > -1) {
        json.orgScript = json.orgContent.substring(json.orgContent.indexOf(config.commentScriptStart) + config.commentScriptStart.length, json.orgContent.indexOf(config.commentScriptEnd));
        let i2 = json.orgScript.indexOf('```\n');
        json.script = json.orgScript.substring(json.orgScript.indexOf('```js') + 5, i2 == -1 ? json.orgScript.indexOf('```\r\n') : i2);
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
    fsHelper.getFileList(config.documentPath + '\\guide').forEach(item => {
        var ps = parser(item);
        if (ps !== false) {
            result.push(ps);
        }
    });
    var componentPath = config.documentPath + '\\component';
    fsHelper.getFolderList(componentPath).forEach(subComPath => {
        fsHelper.getFileList(subComPath).forEach(art => {
            var ps = parser(art);
            if (ps !== false) {
                var demos = fsHelper.getFileList(subComPath + '\\demo');
                if (demos.length > 0) {
                    ps.demo = [];
                    demos.forEach(demo => {
                        ps.demo.push(parser(demo))
                    })
                }
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
    var dirName = initialUppercase(json.dirName);
    if (json.meta.category === dirName) {
        json.componentName = (json.name !== 'Index' ? (dirName + json.name) : dirName);
    } else {
        json.componentName = json.meta.category + (json.name !== 'Index' ? (dirName + json.name) : dirName);
    }
    json.savePath = config.articleExportPath + '\\' + json.lang + '\\' + json.componentName + '.vue';
    if (json.demo && json.demo.length > 0) {
        json.demoPaste = JSON.stringify(json.demo);
        json.demo.forEach(item => {
            item.componentName = json.componentName + item.name;
            item.entrySavePath = config.demoExportPath + '\\src\\' + item.lang + '\\' + restoreCamel(item.componentName) + '\\entry.js';
            item.entryPath = './src/' + item.lang + '/' + restoreCamel(item.componentName) + '/entry.js';
            item.savePath = config.demoExportPath + '\\src\\' + item.lang + '\\' + restoreCamel(item.componentName) + '\\index.vue';
            item.outputPath = config.demoExportPath + '/dist/' + item.lang + '/' + restoreCamel(item.componentName);
            item.publicPathAfter = '/static/demo/dist/' + item.lang + '/' + restoreCamel(item.componentName) + '/';
            item.link = item.publicPathAfter + 'index.html';
            item.content = juicer(demoTemplate, item);
        })
    }
    json.content = juicer(articleTemplate, json);
}

function restoreCamel(camelStr, linkChar = '-') {
    if (!camelStr || typeof camelStr !== 'string' || !linkChar || typeof linkChar !== 'string') {
        return camelStr;
    }
    var res = camelStr.replace(new RegExp('([A-Z])', 'g'), linkChar + '$1').toLowerCase();
    if (res.indexOf('-') === 0) {
        return res.substr(1);
    } else {
        return res;
    }
}

const routeTemplate = fsHelper.readFile(config.routeTemplatePath);
exports.reportFile = parseResult => {
    parseResult.forEach(item => {
        exports.buildArticle(item);
        fsHelper.saveFile(item.savePath, item.content);
        if (item.demo && item.demo.length > 0) {
            fsHelper.rmdir(config.demoExportPath);
            item.demo.forEach(demo => {
                fsHelper.saveFile(demo.savePath, demo.content);
                buildDemoHtml(demo);
            })
        }
    })

    var routerJSON = parseResult.filter(item => {
        return item.meta && item.meta.category;
    }).map(item => {
        return {
            componentName: item.componentName,
            componentPath: './views/report/' + item.lang + '/' + item.componentName,
            meta: JSON.stringify(item.meta),
            route: '/' + item.lang + '/' + restoreCamel(item.componentName, '-')
        }
    });

    fsHelper.saveFile(config.routeFilePath, juicer(routeTemplate, {
        list: routerJSON
    }));
}
