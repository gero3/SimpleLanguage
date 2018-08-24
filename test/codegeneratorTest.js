var assert = require('assert');
var constant = require('../src/constant');

var codegenerator = require('../src/codegenerator');
describe('codegenerator', function () {
	describe('#generate()', function () {
		this.timeout(1000);
		it('generate function should be available.', function () {
			assert.equal(typeof codegenerator.generate === "function", true);
		});
		it('inputs should be generated', function () {
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.input, datatype: "number", name: "a" }]), "input number a;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.input, datatype: "number", name: "b" }]), "input number b;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.input, datatype: "boolean", name: "a" }]), "input boolean a;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.input, datatype: "boolean", name: "b" }]), "input boolean b;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.input, datatype: "number", name: "a" }, { type: constant.input, datatype: "number", name: "b" }]), "input number a;\ninput number b;\n");
		});
		it('outputs should be generated', function () {
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.output, name: "returnvalue", argument: "a" }]), "output returnvalue a;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.output, name: "returnvalue", argument: "b" }]), "output returnvalue b;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.output, name: "returnvalue", argument: "a" }, { type: constant.output, name: "returnvaluetwo", argument: "b" }]), "output returnvalue a;\noutput returnvaluetwo b;\n");
		});

		it('variable declarations should be generated', function () {
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.variable, datatype: "number", name: "a" }]), "number a;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.variable, datatype: "boolean", name: "b" }]), "boolean b;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.variable, datatype: "number", name: "a" }, { type: constant.variable, datatype: "number", name: "b" }]), "number a;\nnumber b;\n");
		});
		it('variable assignments should be generated', function () {
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.variableAssignment, assignee: "a", assigner: "a" }]), "a = a;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.variableAssignment, assignee: "a", assigner: "b" }]), "a = b;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.variableAssignment, assignee: "a", assigner: "b" }, { type: constant.variableAssignment, assignee: "b", assigner: "c" }]), "a = b;\nb = c;\n");
		});
		it('literal assignments should be generated', function () {
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.literalAssignment, assignee: "a", literal: "0" }]), "a = 0;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.literalAssignment, assignee: "a", literal: "40" }]), "a = 40;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.literalAssignment, assignee: "a", literal: "19" }, { type: constant.literalAssignment, assignee: "b", literal: "0" }]), "a = 19;\nb = 0;\n");
		});
		it('literal assignments should be generated', function () {
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.booleanAssignment, assignee: "a", literal: "true" }]), "a = true;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.booleanAssignment, assignee: "a", literal: "false" }]), "a = false;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.booleanAssignment, assignee: "a", literal: "true" }, { type: constant.booleanAssignment, assignee: "b", literal: "false" }]), "a = true;\nb = false;\n");
		});
        it('binary expressions should be generated', function () {
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.binaryExpression, assignee: "a", left: "a", operator: "+", right: "a" }]), "a = a + a;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.binaryExpression, assignee: "a", left: "b", operator: "-", right: "c" }]), "a = b - c;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.binaryExpression, assignee: "a", left: "d", operator: "*", right: "e" }]), "a = d * e;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.binaryExpression, assignee: "a", left: "f", operator: "/", right: "g" }]), "a = f / g;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: constant.binaryExpression, assignee: "a", left: "a", operator: "/", right: "a" }, { type: constant.binaryExpression, assignee: "a", left: "a", operator: "*", right: "a" }]), "a = a / a;\na = a * a;\n");
		});
		
        it('invalid expressions should throw exception', function () {
			assert.throws(function () {codegenerator.generate([{ type: "blabla", assignee: "a", left: "a", operator: "+", right: "a" }]);});
		});
	});
});