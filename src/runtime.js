var parser = require("./parser");
var validator = require("./validator");
var bigInt = require("big-integer");


function executeOperations(operations, inputs) {
	var outputs = {};
	var variables = {};
	operations.forEach(function (operation) {
		if (operation.type === "input") {
			variables[operation.name] = bigInt(inputs[operation.name]);
		} else if (operation.type === "output") {
			outputs[operation.name] = variables[operation.argument].toString();
		} else if (operation.type === "variable") {
			variables[operation.name] = bigInt(0);
        } else if (operation.type === "variableAssignment") {
			variables[operation.assignee] = variables[operation.assigner];
		} else if (operation.type === "literalAssignment") {
			variables[operation.assignee] = bigInt(operation.literal);
		} else if (operation.type === "binaryExpression") {
            if (operation.operator === "+") {
				variables[operation.assignee] = variables[operation.left].add(variables[operation.right]);
			} else if (operation.operator === "-") {
				variables[operation.assignee] = variables[operation.left].minus(variables[operation.right]);
			} else if (operation.operator === "*") {
				variables[operation.assignee] = variables[operation.left].multiply(variables[operation.right]);
			} else if (operation.operator === "/") {
				variables[operation.assignee] = variables[operation.left].divide(variables[operation.right]);
			}  
		}
	});
	return outputs;
}

exports.execute = function (script, inputs) {
	var operations = parser.parse(script);
	var ouputs;
	if (validator.validOperations(operations)){
		ouputs = executeOperations(operations, inputs);
	} else {
		throw new Error("script is not correct.");
	}
	return ouputs;
}