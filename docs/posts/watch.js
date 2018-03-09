var watch = require('watch');
var path = require('path');

const build = () => {
    const parser = require('./parser.js');
    var parseResult = parser.parse();
    parser.reportFile(parseResult);
}

build();

watch.watchTree(path.resolve(__dirname, '../'), function (f, curr, prev) {
    if (typeof f == 'object' && prev === null && curr === null) {
    } else {
        build();
    }
})
