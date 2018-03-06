const colors = require('colors');

module.exports = () => {
    console.log('[start] building...'.magenta);
    require('./build-js.js')().then(() => {
        require('./build-sass')().then(() => {
            console.log('\n\n[end] build success.'.magenta);
        }).catch(err => {
            console.log('\n\n[end]'.red + ' build error.');
        })
    }).catch(err => {
        console.log('\n\n[end]'.red + ' build error.');
    })
}
