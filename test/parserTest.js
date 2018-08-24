var assert = require('assert');
var constant = require('../src/constant');
var parser = require('../src/parser');
describe('parser', function () {
	describe('#parse()', function () {
		this.timeout(1000);
		it('parse function should be available.', function () {
			assert.equal(typeof parser.parse === "function", true);
		});
		it('inputs should be parsed', function () {
			assert.deepStrictEqual(parser.parse("input number a;"), [{ type: constant.input, datatype: "number", name: "a" }]);
			assert.deepStrictEqual(parser.parse("INPUT Number A;"), [{ type: constant.input, datatype: "number", name: "a" }]);
			assert.deepStrictEqual(parser.parse("INPUT Number A;\n          INPUT Number B;"), [{ type: constant.input, datatype: "number", name: "a" }, { type: constant.input, datatype: "number", name: "b" }]);
		});
		it('inputs should be parsed', function () {
			assert.deepStrictEqual(parser.parse("output returnvalue a;"), [{ type: constant.output, name: "returnvalue", argument: "a" }]);
			assert.deepStrictEqual(parser.parse("Output RETURNVALUE A;"), [{ type: constant.output, name: "returnvalue", argument: "a" }]);
			assert.deepStrictEqual(parser.parse("Output RETURNVaLUE A;\n          Output RETURNVaLUeTWO A;"), [{ type: constant.output, name: "returnvalue", argument: "a" }, { type: constant.output, name: "returnvaluetwo", argument: "a" }]);
		});
		it('variable declarations should be parsed', function () {
			assert.deepStrictEqual(parser.parse("number a;"), [{ type: constant.variable, datatype: "number", name: "a" }]);
			assert.deepStrictEqual(parser.parse("Number A;"), [{ type: constant.variable, datatype: "number", name: "a" }]);
			assert.deepStrictEqual(parser.parse("Number A;\n Number B;"), [{ type: constant.variable, datatype: "number", name: "a" }, { type: constant.variable, datatype: "number", name: "b" }]);
		});
		it('variable assignments should be parsed', function () {
			assert.deepStrictEqual(parser.parse("a = a;"), [{ type: constant.variableAssignment, assignee: "a", assigner: "a" }]);
			assert.deepStrictEqual(parser.parse("a = b;"), [{ type: constant.variableAssignment, assignee: "a", assigner: "b" }]);
			assert.deepStrictEqual(parser.parse("a= b;"), [{ type: constant.variableAssignment, assignee: "a", assigner: "b" }]);
			assert.deepStrictEqual(parser.parse("a =b;"), [{ type: constant.variableAssignment, assignee: "a", assigner: "b" }]);
			assert.deepStrictEqual(parser.parse("a=b;"), [{ type: constant.variableAssignment, assignee: "a", assigner: "b" }]);
			assert.deepStrictEqual(parser.parse("a = b; \n b = c;"), [{ type: constant.variableAssignment, assignee: "a", assigner: "b" }, { type: constant.variableAssignment, assignee: "b", assigner: "c" }]);
		});
		it('literal assignments should be parsed', function () {
			assert.deepStrictEqual(parser.parse("a = 0;"), [{ type: constant.literalAssignment, assignee: "a", literal: "0" }]);
			assert.deepStrictEqual(parser.parse("a = 1;"), [{ type: constant.literalAssignment, assignee: "a", literal: "1" }]);
			assert.deepStrictEqual(parser.parse("a= 125;"), [{ type: constant.literalAssignment, assignee: "a", literal: "125" }]);
			assert.deepStrictEqual(parser.parse("a =1789;"), [{ type: constant.literalAssignment, assignee: "a", literal: "1789" }]);
			assert.deepStrictEqual(parser.parse("a=1;"), [{ type: constant.literalAssignment, assignee: "a", literal: "1" }]);
			assert.deepStrictEqual(parser.parse("a = 19; \n b = 0;"), [{ type: constant.literalAssignment, assignee: "a", literal: "19" }, { type: constant.literalAssignment, assignee: "b", literal: "0" }]);
			assert.throws(function () { parser.parse("a = 00;"); });
		});

		it('boolean assignments should be parsed', function () {
			assert.deepStrictEqual(parser.parse("a = False;"), [{ type: constant.booleanAssignment, assignee: "a", literal: "false" }]);
			assert.deepStrictEqual(parser.parse("a = tRue;"), [{ type: constant.booleanAssignment, assignee: "a", literal: "true" }]);
			assert.deepStrictEqual(parser.parse("a= false;"), [{ type: constant.booleanAssignment, assignee: "a", literal: "false" }]);
			assert.deepStrictEqual(parser.parse("a =true;"), [{ type: constant.booleanAssignment, assignee: "a", literal: "true" }]);
			assert.deepStrictEqual(parser.parse("a=false;"), [{ type: constant.booleanAssignment, assignee: "a", literal: "false" }]);
			assert.deepStrictEqual(parser.parse("a = true; \n b = false;"), [{ type: constant.booleanAssignment, assignee: "a", literal: "true" }, { type: constant.booleanAssignment, assignee: "b", literal: "false" }]);
		});
		it('binary expressions should be parsed', function () {
			assert.deepStrictEqual(parser.parse("a = a + a;"), [{ type: constant.binaryExpression, assignee: "a", left: "a", operator: "+", right: "a" }]);
			assert.deepStrictEqual(parser.parse("a = b - c;"), [{ type: constant.binaryExpression, assignee: "a", left: "b", operator: "-", right: "c" }]);
			assert.deepStrictEqual(parser.parse("a = d * e;"), [{ type: constant.binaryExpression, assignee: "a", left: "d", operator: "*", right: "e" }]);
			assert.deepStrictEqual(parser.parse("a = f / g;"), [{ type: constant.binaryExpression, assignee: "a", left: "f", operator: "/", right: "g" }]);
			assert.deepStrictEqual(parser.parse("a= a + a;"), [{ type: constant.binaryExpression, assignee: "a", left: "a", operator: "+", right: "a" }]);
			assert.deepStrictEqual(parser.parse("a =b - c;"), [{ type: constant.binaryExpression, assignee: "a", left: "b", operator: "-", right: "c" }]);
			assert.deepStrictEqual(parser.parse("a = d* e;"), [{ type: constant.binaryExpression, assignee: "a", left: "d", operator: "*", right: "e" }]);
			assert.deepStrictEqual(parser.parse("a = f /g;"), [{ type: constant.binaryExpression, assignee: "a", left: "f", operator: "/", right: "g" }]);
			assert.deepStrictEqual(parser.parse("a=a+a;"), [{ type: constant.binaryExpression, assignee: "a", left: "a", operator: "+", right: "a" }]);
			assert.deepStrictEqual(parser.parse("a = a / a; a = a * a;"), [{ type: constant.binaryExpression, assignee: "a", left: "a", operator: "/", right: "a" }, { type: constant.binaryExpression, assignee: "a", left: "a", operator: "*", right: "a" }]);
			assert.throws(function () { parser.parse("a = a \ a;"); });
		});


	});
});