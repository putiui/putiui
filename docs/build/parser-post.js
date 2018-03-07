const fsHelper = require('./fs.js');
const jsdom = require('jsdom')
const jquery = require('jquery')
const path = require('path');
var Mdt = require('markdown-it')();
const LANG = {
    list: {
        'zh-CN': '简体中文',
        'en-US': 'English'
    },
    'default': 'zh-CN'
}
const MD_COMMENT = '[comment]: meta'

const postsPath = path.resolve(__dirname, '../posts');

const parser = filePath => {
    var json = {};
    json.path = filePath;
    json.exp = fsHelper.getFileExp(filePath);
    var name = fsHelper.getFileName(filePath);
    if (name.indexOf('.') > -1) {
        var arr = name.split('.');
        json.name = arr[0];
        json.lang = LANG.list[arr[1]] ? arr[1] : LANG['default'];
    } else {
        json.name = name;
        json.lang = LANG['default'];
    }
    json.orgContent = fsHelper.readFile(filePath);
    if (json.orgContent.indexOf(MD_COMMENT) > -1) {
        json.meta = getMeta(json.orgContent);
        json.orgSpec = json.orgContent.substr(json.orgContent.indexOf(MD_COMMENT) + MD_COMMENT.length);
        json.spec = Mdt.render(json.orgSpec);
    }

    return json;
}
const jq = html => {
    const dom = new jsdom.JSDOM(`<!DOCTYPE html><html><head></head><body>${html}</body></html>`);
    return jquery(dom.window);
}
const getMeta = orgContent => {
    var i = orgContent.indexOf(MD_COMMENT)
    if (i > -1) {
        var arr = [];
        var table = orgContent.substr(0, i);
        var $ = jq(Mdt.render(table));
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

var postsJSON = {};
fsHelper.getFileList(postsPath, true).forEach(item => {
    var json = parser(item);
    if (json.exp === 'md' && json.meta) {
    }
});
var postsContent = JSON.stringify(postsJSON);
if (postsContent !== '{}') {
    var jsonPath = path.resolve(__dirname, '../src/posts.json');
    fsHelper.saveFile(jsonPath, postsContent);
}
