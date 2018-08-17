var parser = require('./parser');
var codegenerator = require('./codegenerator');


exports.normalize = function (text) {
	return codegenerator.generate(parser.parse(text));
};