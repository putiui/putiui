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
    articleTemplatePath: path.resolve(__dirname, './article.vue'),
    demoTemplatePath: path.resolve(__dirname, './demo.vue'),
    documentPath: path.resolve(__dirname, './data'),
    specFilePath: path.resolve(__dirname, '../src/spec.json'),
    articleExportPath: path.resolve(__dirname, '../src/views/report'),
    demoExportPath: path.resolve(__dirname, '../src/views/report/demo')
}