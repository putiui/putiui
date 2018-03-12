const path = require('path');
module.exports = {
    lang: {
        list: {
            'zh-CN': '简体中文',
            'en-US': 'English'
        },
        'default': 'zh-CN'
    },
    commentMeta: '[comment]: meta',
    commentExclude: '[comment]: exclude',
    commentHeader: '[comment]: header',
    // commentFooter: '[comment]: footer',
    commentSpec: '[comment]: spec',
    commentTemplateStart: '[comment]: template:start',
    commentTemplateEnd: '[comment]: template:end',
    commentStyleStart: '[comment]: style:start',
    commentStyleEnd: '[comment]: style:end',
    commentScriptStart: '[comment]: script:start',
    commentScriptEnd: '[comment]: script:end',
    articleTemplatePath: path.resolve(__dirname, './article.vue'),
    demoTemplatePath: path.resolve(__dirname, './demo.vue'),
    routeTemplatePath: path.resolve(__dirname, './route.tpl'),
    entryTemplatePath: path.resolve(__dirname, './entry.tpl'),
    documentPath: path.resolve(__dirname, './data'),
    routeFilePath: path.resolve(__dirname, '../src/posts-route.js'),
    articleExportPath: path.resolve(__dirname, '../src/views/report'),
    demoExportPath: path.resolve(__dirname, '../src/views/report/demo')
}
