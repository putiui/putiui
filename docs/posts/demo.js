const webpack = require('webpack');
const path = require('path');
const juicer = require('juicer');
const config = require('./config.js');
const fsHelper = require('./fs.js');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const vueLoaderConfig = require('../build/vue-loader.conf')
const vueVersion = require('../node_modules/vue/package.json').version;
const putiuiVersion = require('../../package.json').version;
module.exports = (demo) => {
    return new Promise((resolve, reject) => {
        var entryScript = juicer(fsHelper.readFile(config.entryTemplatePath), demo);
        fsHelper.saveFile(demo.entrySavePath, entryScript);
        const compiler = webpack({
            context: config.demoExportPath,
            entry: {
                app: demo.entryPath
            },
            output: {
                path: demo.outputPath,
                filename: '[name]-[hash].js',
                publicPath: demo.publicPathAfter
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
                        loader: 'vue-loader',
                        options: vueLoaderConfig
                    },
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        include: [config.demoExportPath],
                        options: {
                            presets: [
                                [
                                    'env',
                                    {
                                        modules: false,
                                        targets: {
                                            browsers: [
                                                '> 1%',
                                                'last 2 versions',
                                                'not ie <= 8'
                                            ]
                                        }
                                    }
                                ],
                                'stage-2'
                            ],
                            plugins: [
                            ]
                        }
                    }
                ]
            },
            plugins: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false
                        }
                    },
                    sourceMap: true,
                    parallel: true
                }),
                new HtmlWebpackPlugin({
                    filename: demo.outputPath + '/index.html',
                    template: path.resolve(__dirname, './demo.html'),
                    lang: demo.lang,
                    title: demo.meta && demo.meta.title ? demo.meta.title : 'demo',
                    inject: true,
                    vueVersion,
                    putiuiVersion
                })
            ]
        })

        compiler.run((err, stats) => {
            if (err) {
                console.error(err)
                reject(err)
            } else {
                resolve()
            }
        })
    })
}
