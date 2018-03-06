// Karma configuration
// Generated on Sat Feb 17 2018 13:04:58 GMT+0800 (中国标准时间)

var rollupJson = require('rollup-plugin-json');
var rollupVue = require('rollup-plugin-vue');
var rollupBabel = require('rollup-plugin-babel');

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/vue/dist/vue.js',
            'node_modules/jquery/dist/jquery.js',
            'test/mocha.conf.js',
            {
                pattern: 'lib/css/putiui.css',
                type: 'css'
            },
            // 'test/**/*.spec.js'
            'test/index.js'
        ],


        // list of files / patterns to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/index.js': ['rollup'],
            'test/**/*.spec.js': ['rollup']
        },
        rollupPreprocessor: {
            plugins: [
                rollupJson(),
                rollupVue(),
                rollupBabel()
            ],
            output: {
                format: 'iife',
                sourcemap: 'inline',
                globals: {
                    vue: 'Vue',
                    jquery: '$'
                }
            }
        },
        proxies: {
            '/lib': '/node_modules'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'], //, 'Firefox', 'Opera', 'IE'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
