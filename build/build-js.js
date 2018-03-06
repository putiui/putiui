var rollup = require('rollup');
const config = require('./config.js');
const path = require('path');
const fs = require('fs');
const colors = require('colors');
const resolve = file => {
    return path.resolve(__dirname, file);
}
const head = require('./head.js');

const modules = {
    PutiUI: {
        name: 'putiui.js',
        input: resolve('../src/index.js'),
        file: resolve('../lib/putiui.js')
    },
    PtGrid: {
        name: 'grid.js',
        input: resolve('../src/components/grid/index.js'),
        file: resolve('../lib/components/grid.js')
    },
    PtButton: {
        name: 'button.js',
        input: resolve('../src/components/button/index.js'),
        file: resolve('../lib/components/button.js')
    },
    PtButtonGroup: {
        name: 'button-group.js',
        input: resolve('../src/components/button-group/index.js'),
        file: resolve('../lib/components/button-group.js')
    },
    PtButtonLabel: {
        name: 'button-label.js',
        input: resolve('../src/components/button-label/index.js'),
        file: resolve('../lib/components/button-label.js')
    },
    PtDivider: {
        name: 'divider.js',
        input: resolve('../src/components/divider/index.js'),
        file: resolve('../lib/components/divider.js')
    },
    PtRadio: {
        name: 'radio.js',
        input: resolve('../src/components/radio/index.js'),
        file: resolve('../lib/components/radio.js')
    },
    PtRadioGroup: {
        name: 'radio-group.js',
        input: resolve('../src/components/radio-group/index.js'),
        file: resolve('../lib/components/radio-group.js')
    },
    PtCheckbox: {
        name: 'checkbox.js',
        input: resolve('../src/components/checkbox/index.js'),
        file: resolve('../lib/components/checkbox.js')
    },
    PtCheckboxGroup: {
        name: 'checkbox-group.js',
        input: resolve('../src/components/checkbox-group/index.js'),
        file: resolve('../lib/components/checkbox-group.js')
    }
}
module.exports = () => {
    console.log(`\n\n[js] building...`.blue);
    if (!fs.existsSync(resolve('../lib'))) {
        fs.mkdirSync(resolve('../lib'));
    }
    if (!fs.existsSync(resolve('../lib/components'))) {
        fs.mkdirSync(resolve('../lib/components'));
    }
    return Promise.all(Object.keys(modules).map(name => {
        return new Promise((resolve, reject) => {
            var rollConfig = config(name, modules[name].input, modules[name].file);
            rollConfig.output.banner = head(modules[name].name);
            rollup.rollup(rollConfig.input).then(result => {
                return result.write(rollConfig.output);
            }).then(data => {
                console.log(`[success] `.green + `${modules[name].name}`.yellow);
                resolve();
            }).catch(error => {
                console.error(`[error] `.red + `${modules[name].name}\n`.yellow, error);
                reject(error)
            });
        })
    }));
}

