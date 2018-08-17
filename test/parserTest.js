var assert = require('assert');
var parser = require('../src/parser');
describe('parser', function () {
	describe('#parse()', function () {
		this.timeout(1000);
		it('parse function should be available.', function () {
			assert.equal(typeof parser.parse === "function", true);
		});
		it('inputs should be parsed', function () {
			assert.deepStrictEqual(parser.parse("input number a;"), [{ type: "input", datatype: "number", name: "a" }]);
			assert.deepStrictEqual(parser.parse("INPUT Number A;"), [{ type: "input", datatype: "number", name: "a" }]);
			assert.deepStrictEqual(parser.parse("INPUT Number A;\n          INPUT Number B;"), [{ type: "input", datatype: "number", name: "a" }, { type: "input", datatype: "number", name: "b" }]);
		});
		it('inputs should be parsed', function () {
			assert.deepStrictEqual(parser.parse("output returnvalue a;"), [{ type: "output", name: "returnvalue", argument: "a" }]);
			assert.deepStrictEqual(parser.parse("Output RETURNVALUE A;"), [{ type: "output", name: "returnvalue", argument: "a" }]);
			assert.deepStrictEqual(parser.parse("Output RETURNVaLUE A;\n          Output RETURNVaLUeTWO A;"), [{ type: "output", name: "returnvalue", argument: "a" }, { type: "output", name: "returnvaluetwo", argument: "a" }]);
		});
		it('variable declarations should be parsed', function () {
			assert.deepStrictEqual(parser.parse("number a;"), [{ type: "variable", datatype: "number", name: "a" }]);
			assert.deepStrictEqual(parser.parse("Number A;"), [{ type: "variable", datatype: "number", name: "a" }]);
			assert.deepStrictEqual(parser.parse("Number A;\n Number B;"), [{ type: "variable", datatype: "number", name: "a" }, { type: "variable", datatype: "number", name: "b" }]);
		});
		it('variable assignments should be parsed', function () {
			assert.deepStrictEqual(parser.parse("a = a;"), [{ type: "variableAssignment", assignee: "a", assigner: "a" }]);
			assert.deepStrictEqual(parser.parse("a = b;"), [{ type: "variableAssignment", assignee: "a", assigner: "b" }]);
			assert.deepStrictEqual(parser.parse("a = b; \n b = c;"), [{ type: "variableAssignment", assignee: "a", assigner: "b" }, { type: "variableAssignment", assignee: "b", assigner: "c" }]);
		});
		it('variable assignments should be parsed', function () {
			assert.deepStrictEqual(parser.parse("a = 0;"), [{ type: "literalAssignment", assignee: "a", literal: "0" }]);
			assert.deepStrictEqual(parser.parse("a = 1;"), [{ type: "literalAssignment", assignee: "a", literal: "1" }]);
			assert.deepStrictEqual(parser.parse("a = 19; \n b = 0;"), [{ type: "literalAssignment", assignee: "a", literal: "19" }, { type: "literalAssignment", assignee: "b", literal: "0" }]);
			assert.throws(function () { parser.parse("a = 00;");});
		});
		it('binary expressions should be parsed', function () {
			assert.deepStrictEqual(parser.parse("a = a + a;"), [{ type: "binaryExpression", assignee: "a", left: "a", operator:"+", right:"a" }]);
			assert.deepStrictEqual(parser.parse("a = b - c;"), [{ type: "binaryExpression", assignee: "a", left: "b", operator:"-", right:"c" }]);
			assert.deepStrictEqual(parser.parse("a = d * e;"), [{ type: "binaryExpression", assignee: "a", left: "d", operator:"*", right:"e" }]);
			assert.deepStrictEqual(parser.parse("a = f / g;"), [{ type: "binaryExpression", assignee: "a", left: "f", operator:"/", right:"g" }]);
			assert.deepStrictEqual(parser.parse("a = a / a; a = a * a;"), [{ type: "binaryExpression", assignee: "a", left: "a", operator:"/", right:"a" },{ type: "binaryExpression", assignee: "a", left: "a", operator:"*", right:"a" }]);
			assert.throws(function () { parser.parse("a = a \ a;");});
		});


	});
});