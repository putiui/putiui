var json = require('rollup-plugin-json');
var vue = require('rollup-plugin-vue');
var babel = require('rollup-plugin-babel');

module.exports = (name, input, file) => {
    return {
        input: {
            input,
            plugins: [
                json(),
                vue(),
                babel()
            ]
        },
        output: {
            file: file,
            format: 'umd',
            name: name,
            sourcemap: true
        }
    }
}
