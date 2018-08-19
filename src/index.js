var parser = require('./parser');
var codegenerator = require('./codegenerator');
var runtime = require('./runtime');

exports.parse = function (text) {
    return parser.parse(text);
};

exports.generate = function (operations) {
    return codegenerator.generate(operations);
};

exports.execute = function (text, inputs) {
    return runtime.execute(text, inputs);
};

exports.normalize = function (text) {
	return codegenerator.generate(parser.parse(text));
};