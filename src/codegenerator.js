

exports.generate = function (ast) {
	var code = "";
	ast.forEach(function (operation) {
		if (operation.type === "input") {
			code = code + "input " + operation.datatype + " " + operation.name + ";\n";
		} else if (operation.type === "output") {
			code = code + "output " + operation.name + " " + operation.argument + ";\n";
		} else if (operation.type === "variable") {
			code = code + operation.datatype + " " + operation.name + ";\n";
		} else if (operation.type === "variableAssignment") {
			code = code + operation.assignee + " = " + operation.assigner + ";\n";
		} else if (operation.type === "literalAssignment") {
			code = code + operation.assignee + " = " + operation.literal + ";\n";
		} else if (operation.type === "binaryExpression") {
			code = code + operation.assignee + " = " + operation.left + " " + operation.operator + " " + operation.right + ";\n";
		}
	});
	return code;

}