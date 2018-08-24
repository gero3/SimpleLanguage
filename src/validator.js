var constant = require("./constant");

var inputsFirstCheck = function (operations) {
	var check = true;
    var beginning = true;
	operations.forEach(function (operation) {
		if (operation.type !== constant.input) {
			beginning = false;
		};
		if (!beginning && operation.type === constant.input) {
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
		if (operation.type === constant.output) {
			outputFound = true;
		};
		if (outputFound && operation.type !== constant.output) {
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
		if (operation.type === constant.input || operation.type === constant.variable) {
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
        if (operation.type === constant.input || operation.type === constant.variable) {
            variableNames[operation.name] = true;
        };
        if (operation.type === constant.variableAssignment) {
            if (!(variableNames[operation.assignee] && variableNames[operation.assigner])) {
                check = false;
            }
        };
        if (operation.type === constant.literalAssignment) {
            if (!variableNames[operation.assignee]) {
                check = false;
            }
        };
        if (operation.type === constant.binaryExpression) {
            if (!(variableNames[operation.assignee] && variableNames[operation.left] && variableNames[operation.right])) {
                check = false;
            }
        };
        if (operation.type === constant.output) {
            if (!variableNames[operation.argument]) {
                check = false;
            }
        };            
    });
    return check;
};
exports.allUsedVariablesDeclaredCheck = allUsedVariablesDeclaredCheck;


var allowedDatatypes = {
	number:true,
	boolean:true
};
var allDatatypesExistCheck = function (operations) {
    var check = true;
    operations.forEach(function (operation) {
        if (operation.type === constant.input || operation.type === constant.variable) {
            if (!allowedDatatypes[operation.datatype]) {
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