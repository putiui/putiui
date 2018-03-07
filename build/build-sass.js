var sass = require('node-sass');
const precss = require('precss');
const path = require('path');
const fs = require('fs');
const colors = require('colors');

const cssbeautify = require('./cssbeautify.js');
const csso = require('csso');

const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

const head = require('./head.js');

const resolve = file => {
    return path.resolve(__dirname, file);
}

const modules = {
    [resolve('../src/style/base.scss')]: resolve('../lib/css/base.css'),
    [resolve('../src/style/putiui.scss')]: resolve('../lib/css/putiui.css'),
    [resolve('../src/style/grid.scss')]: resolve('../lib/css/grid.css'),
    [resolve('../src/style/button.scss')]: resolve('../lib/css/button.css'),
    [resolve('../src/style/button-group.scss')]: resolve('../lib/css/button-group.css'),
    [resolve('../src/style/button-label.scss')]: resolve('../lib/css/button-label.css'),
    [resolve('../src/style/divider.scss')]: resolve('../lib/css/divider.css'),
    [resolve('../src/style/radio.scss')]: resolve('../lib/css/radio.css'),
    [resolve('../src/style/radio-group.scss')]: resolve('../lib/css/radio-group.css'),
    [resolve('../src/style/checkbox.scss')]: resolve('../lib/css/checkbox.css'),
    [resolve('../src/style/checkbox-group.scss')]: resolve('../lib/css/checkbox-group.css')
}

module.exports = () => {
    console.log(`\n\n[sass] building...`.blue);
    if (!fs.existsSync(resolve('../lib'))) {
        fs.mkdirSync(resolve('../lib'));
    }
    if (!fs.existsSync(resolve('../lib/css'))) {
        fs.mkdirSync(resolve('../lib/css'));
    }
    return Promise.all(Object.keys(modules).map(input => {
        return new Promise((resolve, reject) => {
            const orgFile = modules[input].substr(0, modules[input].lastIndexOf('.'));
            const file = orgFile + '.css';
            const mapFile = orgFile + '.scss.map';
            const arr = file.split('\\');
            const fileName = arr[arr.length - 1];
            sass.render({
                file: input,
                sourceMap: mapFile,
                outFile: file
            }, (error, sassResult) => {
                if (error) {
                    console.error(`[error1] `.red + `${fileName}\n`.yellow, error);
                    reject(error)
                } else {
                    const content = sassResult.css.toString('utf8');
                    postcss([precss, autoprefixer({
                        browsers: ['last 2 versions']
                    })]).process(content, {
                        from: input,
                        to: file
                    }).then(result => {
                        var css = {
                            file,
                            content: cssbeautify(head(fileName) + '\n' + result.css)
                        }
                        css.min = csso.minify(css.content).css;
                        fs.writeFileSync(css.file, css.content, {
                            encoding: 'utf8'
                        });
                        fs.writeFileSync(orgFile + '.min.css', css.min, {
                            encoding: 'utf8'
                        });
                        console.log(`[success] `.green + `${fileName}`.yellow);
                        resolve(css);
                    }).catch(error => {
                        console.error(`[error2] `.red + `${fileName}\n`.yellow, error);
                        reject(error)
                    })
                }
            })
        })
    }));
}
