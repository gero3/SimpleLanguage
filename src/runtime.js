var parser = require("./parser");
var validator = require("./validator");
var bigInt = require("big-integer");


function executeOperations(operations, inputs) {
	var outputs = {};
	var variables = {};
	operations.forEach(function (operation) {
		if (operation.type === "input") {
			if (operation.datatype === "number") {
				variables[operation.name] = { datatype: "number", value: bigInt(inputs[operation.name]) };
			} else if (operation.datatype === "boolean") {
				variables[operation.name] = { datatype: "boolean", value: inputs[operation.name] };
			} else {
				throw new Error("input datatype cannot not be executed: " + operation.datatype + ".");
			}
		} else if (operation.type === "output") {
			outputs[operation.name] = variables[operation.argument].value.toString();
		} else if (operation.type === "variable") {
			if (operation.datatype === "number") {
				variables[operation.name] = { datatype: "number", value: bigInt(0) };
			} else if (operation.datatype === "boolean") {
				variables[operation.name] = { datatype: "boolean", value: false };
			} else {
				throw new Error("variable datatype cannot not be executed: " + operation.datatype + ".");
			}
		} else if (operation.type === "variableAssignment") {
			variables[operation.assignee].value = variables[operation.assigner].value;
		} else if (operation.type === "literalAssignment") {
			variables[operation.assignee].value = bigInt(operation.literal);
		} else if (operation.type === "booleanAssignment") {
			if (operation.literal === "true") {
				variables[operation.assignee].value = true;
			} else if (operation.literal === "false") {
				variables[operation.assignee].value = false;
			} else {
				throw new Error("Boolean assignment needs to be either 'true' or 'false' instead of " + operation.literal + ".");
			}
		} else if (operation.type === "binaryExpression") {
			if (operation.operator === "+") {
				variables[operation.assignee].value = variables[operation.left].value.add(variables[operation.right].value);
			} else if (operation.operator === "-") {
				variables[operation.assignee].value = variables[operation.left].value.minus(variables[operation.right].value);
			} else if (operation.operator === "*") {
				variables[operation.assignee].value = variables[operation.left].value.multiply(variables[operation.right].value);
			} else if (operation.operator === "/") {
				variables[operation.assignee].value = variables[operation.left].value.divide(variables[operation.right].value);
			} else {
				throw new Error("binaryExpression cannot not be executed for operator " + operation.operator + ".");
			}
		} else {
			throw new Error("operation cannot not be executed for operation type " + operation.type + ".");
		}
	});
	return outputs;
}

exports.executeOperations = executeOperations;

exports.execute = function (script, inputs) {
	var operations = parser.parse(script);
	var ouputs;
	if (validator.validOperations(operations)) {
		ouputs = executeOperations(operations, inputs);
	} else {
		throw new Error("script is not correct.");
	}
	return ouputs;
}