const { version, license } = require('../package.json');
module.exports = (name) => {
    return `/*! ${name} v${version} | ${license} License | github.com/imingyu/putiui */`;
}
