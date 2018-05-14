var watch = require('watch');
var path = require('path');

const build = () => {
    console.log('[build Post] start')
    const parser = require('./parser.js');
    var parseResult = parser.parse();
    parser.reportFile(parseResult);
    console.log('[build Post] end')
}

build();

watch.watchTree(path.resolve(__dirname, '../posts'), function (f, curr, prev) {
    if (typeof f == 'object' && prev === null && curr === null) {
    } else {
        build();
    }
})
