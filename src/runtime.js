var parser = require("./parser");
var validator = require("./validator");
var bigInt = require("big-integer");


function executeInputOperation(operation, inputs, variables, outputs) {
    if (operation.datatype === "number") {
        variables[operation.name] = { datatype: "number", value: bigInt(inputs[operation.name]) };
    } else if (operation.datatype === "boolean") {
        variables[operation.name] = { datatype: "boolean", value: inputs[operation.name] };
    } else {
        throw new Error("input datatype cannot not be executed: " + operation.datatype + ".");
    }
}

function executeOutputOperation(operation, inputs, variables, outputs) {
    outputs[operation.name] = variables[operation.argument].value.toString();
}

function executeVariableOperation(operation, inputs, variables, outputs) {
    if (operation.datatype === "number") {
        variables[operation.name] = { datatype: "number", value: bigInt(0) };
    } else if (operation.datatype === "boolean") {
        variables[operation.name] = { datatype: "boolean", value: false };
    } else {
        throw new Error("variable datatype cannot not be executed: " + operation.datatype + ".");
    }
}

function executeVariableAssignmentOperation(operation, inputs, variables, outputs) {
    variables[operation.assignee].value = variables[operation.assigner].value;
}

function executeLiteralAssignmentOperation(operation, inputs, variables, outputs) {
    variables[operation.assignee].value = bigInt(operation.literal);
}

function executeBooleanAssignmentOperation(operation, inputs, variables, outputs) {
    if (operation.literal === "true") {
        variables[operation.assignee].value = true;
    } else if (operation.literal === "false") {
        variables[operation.assignee].value = false;
    } else {
        throw new Error("Boolean assignment needs to be either 'true' or 'false' instead of " + operation.literal + ".");
    }
}

function executeBinaryExpressionOperation(operation, inputs, variables, outputs) {
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
}

function executeOperations(operations, inputs) {
    var outputs = {};
    var variables = {};
    operations.forEach(function (operation) {
        if (operation.type === "input") {
            executeInputOperation(operation, inputs, variables, outputs);
        } else if (operation.type === "output") {
            executeOutputOperation(operation, inputs, variables, outputs);
        } else if (operation.type === "variable") {
            executeVariableOperation(operation, inputs, variables, outputs);
        } else if (operation.type === "variableAssignment") {
            executeVariableAssignmentOperation(operation, inputs, variables, outputs);
        } else if (operation.type === "literalAssignment") {
            executeLiteralAssignmentOperation(operation, inputs, variables, outputs);
        } else if (operation.type === "booleanAssignment") {
            executeBooleanAssignmentOperation(operation, inputs, variables, outputs);
        } else if (operation.type === "binaryExpression") {
            executeBinaryExpressionOperation(operation, inputs, variables, outputs);
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