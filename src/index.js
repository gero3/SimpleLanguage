var parser = require('./parser');
var codegenerator = require('./codegenerator');
var validator = require('./validator');
var runtime = require('./runtime');

exports.parse = function (text) {
	var operations = parser.parse(text);
	if (validator.validOperations(operations)) {
		return operations;
	} else {
		throw new Error("script is not correct.");
	}
};

exports.generate = function (operations) {
	if (validator.validOperations(operations)) {
		return codegenerator.generate(operations);
	} else {
		throw new Error("script is not correct.");
	}
};

exports.execute = function (text, inputs) {
	return runtime.execute(text, inputs);
};


var validateText = function (text) {
	try {
		var operations = parser.parse(text);
		return validator.validOperations(operations);
	}
	catch (e) {
		return false;
	}
};
exports.validateText = validateText;

var validateOperations = function (operations) {
	return validator.validOperations(operations);
};
exports.validateOperations = validateOperations;

exports.validate = function (textOrOperations) {
	if (typeof textOrOperations === "string") {
		return validateText(textOrOperations);
	} else {
		return validateOperations(textOrOperations);
	}

};

exports.normalize = function (text) {
	var operations = parser.parse(text);
	if (validator.validOperations(operations)) {
		return codegenerator.generate(operations);
	} else {
		throw new Error("script is not correct.");
	}
};