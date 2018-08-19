var assert = require('assert');
var codegenerator = require('../src/codegenerator');
describe('codegenerator', function () {
	describe('#generate()', function () {
		this.timeout(1000);
		it('generate function should be available.', function () {
			assert.equal(typeof codegenerator.generate === "function", true);
		});
		it('inputs should be generated', function () {
			assert.deepStrictEqual(codegenerator.generate([{ type: "input", datatype: "number", name: "a" }]), "input number a;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "input", datatype: "number", name: "b" }]), "input number b;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "input", datatype: "number", name: "a" }, { type: "input", datatype: "number", name: "b" }]), "input number a;\ninput number b;\n");
		});
		it('outputs should be generated', function () {
			assert.deepStrictEqual(codegenerator.generate([{ type: "output", name: "returnvalue", argument: "a" }]), "output returnvalue a;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "output", name: "returnvalue", argument: "b" }]), "output returnvalue b;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "output", name: "returnvalue", argument: "a" }, { type: "output", name: "returnvaluetwo", argument: "b" }]), "output returnvalue a;\noutput returnvaluetwo b;\n");
		});

		it('variable declarations should be generated', function () {
			assert.deepStrictEqual(codegenerator.generate([{ type: "variable", datatype: "number", name: "a" }]), "number a;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "variable", datatype: "number", name: "b" }]), "number b;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "variable", datatype: "number", name: "a" }, { type: "variable", datatype: "number", name: "b" }]), "number a;\nnumber b;\n");
		});
		it('variable assignments should be generated', function () {
			assert.deepStrictEqual(codegenerator.generate([{ type: "variableAssignment", assignee: "a", assigner: "a" }]), "a = a;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "variableAssignment", assignee: "a", assigner: "b" }]), "a = b;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "variableAssignment", assignee: "a", assigner: "b" }, { type: "variableAssignment", assignee: "b", assigner: "c" }]), "a = b;\nb = c;\n");
		});
		it('literal assignments should be generated', function () {
			assert.deepStrictEqual(codegenerator.generate([{ type: "literalAssignment", assignee: "a", literal: "0" }]), "a = 0;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "literalAssignment", assignee: "a", literal: "40" }]), "a = 40;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "literalAssignment", assignee: "a", literal: "19" }, { type: "literalAssignment", assignee: "b", literal: "0" }]), "a = 19;\nb = 0;\n");
		});
        it('binary expressions should be generated', function () {
			assert.deepStrictEqual(codegenerator.generate([{ type: "binaryExpression", assignee: "a", left: "a", operator: "+", right: "a" }]), "a = a + a;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "binaryExpression", assignee: "a", left: "b", operator: "-", right: "c" }]), "a = b - c;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "binaryExpression", assignee: "a", left: "d", operator: "*", right: "e" }]), "a = d * e;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "binaryExpression", assignee: "a", left: "f", operator: "/", right: "g" }]), "a = f / g;\n");
			assert.deepStrictEqual(codegenerator.generate([{ type: "binaryExpression", assignee: "a", left: "a", operator: "/", right: "a" }, { type: "binaryExpression", assignee: "a", left: "a", operator: "*", right: "a" }]), "a = a / a;\na = a * a;\n");
		});
	});
});