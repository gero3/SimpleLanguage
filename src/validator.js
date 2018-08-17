
var inputsFirstCheck = function (operations) {
	var check = true;
	var beginning = true
	operations.forEach(function (operation) {
		if (operation.type !== "input") {
			beginning = false;
		};
		if (!beginning && operation.type === "input") {
			check = false;
		};
	});
	return check;
};
exports.inputsFirstCheck = inputsFirstCheck;

var outputsLastCheck = function (operations) {
	var check = true;
	var outputFound = false;
	operations.forEach(function (operation) {
		if (operation.type === "output") {
			outputFound = true;
		};
		if (outputFound && operation.type !== "output") {
			check = false;
		};
	});
	return check;
};
exports.outputsLastCheck = outputsLastCheck;

var inputAndVariableNameUniqueCheck = function (operations) {
	var check = true;
	var variableNames = {};
	operations.forEach(function (operation) {
		if (operation.type === "input" || operation.type === "variable") {
			if (variableNames[operation.name]) {
				check = false;
			} else {
				variableNames[operation.name] = true;
			}
		};
	});
	return check;
};
exports.inputAndVariableNameUniqueCheck = inputAndVariableNameUniqueCheck;

exports.validOperations = function (operations){
	var check = true;
	check = check && inputsFirstCheck(operations);
	check = check && outputsLastCheck(operations);
	check = check && inputAndVariableNameUniqueCheck(operations);
	return check;
};