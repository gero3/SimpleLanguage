
var inputRegex = /^input ([a-z]+) ([a-z]+)\;/;
var outputRegex = /^output ([a-z]+) ([a-z]+)\;/;
var variableDeclarationRegex = /^([a-z]+) ([a-z]+)\;/;
var variableAssignmentRegex = /^([a-z]+) = ([a-z]+)\;/;
var literalAssignmentRegex = /^([a-z]+) = ([1-9][0-9]*|0)\;/;
var binaryExpressionRegex = /^([a-z]+) = ([a-z]+) ([\+\-\/\*]) ([a-z]+)\;/;

exports.parse = function (text) {
	var operations = [];
	var trimmedText = text.toLowerCase().trim();
	var length = 0;
	while (trimmedText.length > 0) {
		length = trimmedText.toString().length;
		var match = inputRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: "input", datatype: match[1], name: match[2] });
			trimmedText = trimmedText.substr(match[0].length).trim();
		}
		match = outputRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: "output", name: match[1], argument: match[2] });
			trimmedText = trimmedText.substr(match[0].length).trim();
		}
		match = variableDeclarationRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: "variable", datatype: match[1], name: match[2] });
			trimmedText = trimmedText.substr(match[0].length).trim();
		}
		match = variableAssignmentRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: "variableAssignment", assignee: match[1], assigner: match[2] });
			trimmedText = trimmedText.substr(match[0].length).trim();
		}
		match = literalAssignmentRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: "literalAssignment", assignee: match[1], literal: match[2] });
			trimmedText = trimmedText.substr(match[0].length).trim();
		}
		match = binaryExpressionRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: "binaryExpression", assignee: match[1], left: match[2], operator:match[3], right:match[4] });
			trimmedText = trimmedText.substr(match[0].length).trim();
		}

		if (trimmedText.length === length) {
			throw new Error("next statement parsing failed : \n" + trimmedText + "\n    originalText: \n" + text );
		}
	}
	return operations;

};
