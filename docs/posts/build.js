const parser = require('./parser.js');
var parseResult = parser.parse();
parser.reportFile(parseResult);
