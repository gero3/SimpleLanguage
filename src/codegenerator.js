
var constant = require("./constant");

exports.generate = function (ast) {
	var code = "";
	ast.forEach(function (operation) {
		if (operation.type === constant.input) {
			code = code + "input " + operation.datatype + " " + operation.name + ";\n";
		} else if (operation.type === constant.output) {
			code = code + "output " + operation.name + " " + operation.argument + ";\n";
		} else if (operation.type === constant.variable) {
			code = code + operation.datatype + " " + operation.name + ";\n";
		} else if (operation.type === constant.variableAssignment) {
			code = code + operation.assignee + " = " + operation.assigner + ";\n";
		} else if (operation.type === constant.literalAssignment) {
			code = code + operation.assignee + " = " + operation.literal + ";\n";
		} else if (operation.type === constant.booleanAssignment) {
			code = code + operation.assignee + " = " + operation.literal + ";\n";
		} else if (operation.type === constant.numberExpression) {
			code = code + operation.assignee + " = " + operation.left + " " + operation.operator + " " + operation.right + ";\n";
		} else if (operation.type === constant.booleanExpression) {
			code = code + operation.assignee + " = " + operation.left + " " + operation.operator + " " + operation.right + ";\n";
		} else if (operation.type === constant.comparisionExpression) {
			code = code + operation.assignee + " = " + operation.left + " " + operation.operator + " " + operation.right + ";\n";
		} else {
			throw new Error("Code cannot not be generated for operation type " + operation.type + ".");
		}
	});
	return code;

}