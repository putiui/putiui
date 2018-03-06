var watch = require('watch');
var path = require('path');
var rollup = require('rollup');

const build = require('./build-all.js');
build();

watch.watchTree(path.resolve(__dirname, '../src'), function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
    } else {
        build();
    }
})
