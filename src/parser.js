
var constant = require("./constant");

var inputRegex = /^input ([a-z]+) ([a-z]+)\;/;
var outputRegex = /^output ([a-z]+) ([a-z]+)\;/;
var variableDeclarationRegex = /^([a-z]+) ([a-z]+)\;/;
var variableAssignmentRegex = /^([a-z]+) ?= ?([a-z]+)\;/;
var literalAssignmentRegex = /^([a-z]+) ?= ?([1-9][0-9]*|0)\;/;
var booleanAssignmentRegex = /^([a-z]+) ?= ?(true|false)\;/;
var numberExpressionRegex = /^([a-z]+) ?= ?([a-z]+) ?([\+\-\/\*]) ?([a-z]+)\;/;
var booleanExpressionRegex = /^([a-z]+) ?= ?([a-z]+) ?([\&\|]) ?([a-z]+)\;/;
var comparisionExpressionRegex = /^([a-z]+) ?= ?([a-z]+) ?([\<\>]|\=\>|\=\<) ?([a-z]+)\;/;

exports.parse = function (text) {
	var operations = [];
	var trimmedText = text.toLowerCase().trim();
	while (trimmedText.length > 0) {

		var match = inputRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: constant.input, datatype: match[1], name: match[2] });
			trimmedText = trimmedText.substr(match[0].length).trim();
			continue;
		}

		match = outputRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: constant.output, name: match[1], argument: match[2] });
			trimmedText = trimmedText.substr(match[0].length).trim();
			continue;
		}

		match = variableDeclarationRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: constant.variable, datatype: match[1], name: match[2] });
			trimmedText = trimmedText.substr(match[0].length).trim();
			continue;
		}

		match = literalAssignmentRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: constant.literalAssignment, assignee: match[1], literal: match[2] });
			trimmedText = trimmedText.substr(match[0].length).trim();
			continue;
		}

		match = booleanAssignmentRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: constant.booleanAssignment, assignee: match[1], literal: match[2] });
			trimmedText = trimmedText.substr(match[0].length).trim();
			continue;
		}

		match = variableAssignmentRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: constant.variableAssignment, assignee: match[1], assigner: match[2] });
			trimmedText = trimmedText.substr(match[0].length).trim();
			continue;
		}

		match = numberExpressionRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: constant.numberExpression, assignee: match[1], left: match[2], operator: match[3], right: match[4] });
			trimmedText = trimmedText.substr(match[0].length).trim();
			continue;
		}

		match = booleanExpressionRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: constant.booleanExpression, assignee: match[1], left: match[2], operator: match[3], right: match[4] });
			trimmedText = trimmedText.substr(match[0].length).trim();
			continue;
		}

		match = comparisionExpressionRegex.exec(trimmedText);
		if (match && match.length > 0) {
			operations.push({ type: constant.comparisionExpression, assignee: match[1], left: match[2], operator: match[3], right: match[4] });
			trimmedText = trimmedText.substr(match[0].length).trim();
			continue;
		}

		throw new Error("next statement parsing failed : \n" + trimmedText + "\n    originalText: \n" + text);
	}
	return operations;

};
