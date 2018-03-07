const jsdom = require('jsdom')
const jquery = require('jquery')
module.exports = html => {
    const dom = new jsdom.JSDOM(`<!DOCTYPE html><html><head></head><body>${html}</body></html>`);
    return jquery(dom.window);
}