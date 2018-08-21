
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

var allUsedVariablesDeclaredCheck = function (operations) {
    var check = true;
    var variableNames = {};
    operations.forEach(function (operation) {
        if (operation.type === "input" || operation.type === "variable") {
            variableNames[operation.name] = true;
        };
        if (operation.type === "variableAssignment") {
            if (!(variableNames[operation.assignee] && variableNames[operation.assigner])) {
                check = false;
            }
        };
        if (operation.type === "literalAssignment") {
            if (!variableNames[operation.assignee]) {
                check = false;
            }
        };
        if (operation.type === "binaryExpression") {
            if (!(variableNames[operation.assignee] && variableNames[operation.left] && variableNames[operation.right])) {
                check = false;
            }
        };
        if (operation.type === "output") {
            if (!variableNames[operation.argument]) {
                check = false;
            }
        };            
    });
    return check;
};
exports.allUsedVariablesDeclaredCheck = allUsedVariablesDeclaredCheck;

var allDatatypesExistCheck = function (operations) {
    var check = true;
    operations.forEach(function (operation) {
        if (operation.type === "input" || operation.type === "variable") {
            if (operation.datatype !== "number") {
                check = false;
            }; 
        };
    });
    return check;
};
exports.allDatatypesExistCheck = allDatatypesExistCheck;



exports.validOperations = function (operations){
	var check = true;
	check = check && inputsFirstCheck(operations);
	check = check && outputsLastCheck(operations);
    check = check && inputAndVariableNameUniqueCheck(operations);
    check = check && allUsedVariablesDeclaredCheck(operations);
    check = check && allDatatypesExistCheck(operations);
	return check;
};