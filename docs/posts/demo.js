const webpack = require('webpack');
const path = require('path');
const juicer = require('juicer');
const config = require('./config.js');
const fsHelper = require('./fs.js');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const InlineHtml = require('html-webpack-inline-source-plugin')
module.exports = (demo) => {
    return new Promise((resolve, reject) => {
        var entryScript = juicer(fsHelper.readFile(config.entryTemplatePath), demo);
        fsHelper.saveFile(demo.entryPath, entryScript);
        const compiler = webpack({
            context: config.demoExportPath + '\\' + demo.lang,
            entry: {
                [demo.componentName + '-' + demo.lang]: demo.entryPath
            },
            output: {
                path: demo.outputPath,
                filename: '[name]-[hash].js'
            },
            resolve: {
                extensions: ['.js', '.vue', '.json']
            },
            externals: {
                'vue': 'Vue',
                'putiui': 'PutiUI'
            },
            module: {
                rules: [
                    {
                        test: /\.vue$/,
                        loader: 'vue-loader'
                    },
                    {
                        test: /\.js$/,
                        loader: 'babel-loader'
                    }
                ]
            },
            node: {
                // prevent webpack from injecting useless setImmediate polyfill because Vue
                // source contains it (although only uses it if it's native).
                setImmediate: false,
                // prevent webpack from injecting mocks to Node native modules
                // that does not make sense for the client
                dgram: 'empty',
                fs: 'empty',
                net: 'empty',
                tls: 'empty',
                child_process: 'empty'
            },
            plugins: [
                // new UglifyJsPlugin({
                //     uglifyOptions: {
                //         compress: {
                //             warnings: false
                //         }
                //     },
                //     sourceMap: true,
                //     parallel: true
                // }),
                // new HtmlWebpackPlugin({
                //     filename: demo.componentName + '.' + demo.lang + '.html',
                //     template: path.resolve(__dirname, './demo.html'),
                //     lang: demo.lang,
                //     title: demo.meta && demo.meta.title ? demo.meta.title : 'demo',
                //     inject: true
                //     // inlineSource: '.(js|css)$'
                // }),
                // new InlineHtml(),
                // keep module.id stable when vendor modules does not change
                new webpack.HashedModuleIdsPlugin()
            ]
        })

        compiler.run((err, stats) => {
            console.log(stats)
            if (err) {
                console.error(err)
                reject(err)
            } else {
                resolve()
            }
        })
    })
}
