var assert = require('assert');
var parser = require('../src/parser');
var validator = require('../src/validator');
describe('validator', function () {
	describe('#validOperations()', function () {
		this.timeout(1000);
		it('validOperations function should be available.', function () {
			assert.equal(typeof validator.validOperations === "function", true);
        });
        it('validOperations should validate operations.', function () {
            assert.equal(validator.validOperations([]), true);
            assert.equal(validator.validOperations([{ type: "input", datatype: "number", name: "a" }, { type: "variable", datatype: "number", name: "a" }, { type: "input", datatype: "number", name: "b" }]), false);
            assert.equal(validator.validOperations([{ type: "variable", datatype: "number", name: "a" }, { type: "input", datatype: "number", name: "b" }]), false);
            assert.equal(validator.validOperations([{ type: "output", name: "returnvalue", argument: "a" }, { type: "variable", datatype: "number", argument: "a" }, { type: "output", name: "returnvaluetwo", argument: "b" }]), false);
            assert.equal(validator.validOperations([{ type: "output", name: "returnvalue", argument: "a" }, { type: "variable", datatype: "number", argument: "a" }]), false);
            assert.equal(validator.validOperations([{ type: "variable", datatype: "number", name: "a" }, { type: "variable", datatype: "number", name: "a" }]), false);
            assert.equal(validator.validOperations([{ type: "input", datatype: "number", name: "a" }, { type: "input", datatype: "number", name: "a" }]), false);
            assert.equal(validator.validOperations([{ type: "input", datatype: "number", name: "a" }, { type: "variable", datatype: "number", name: "a" }]), false);
            assert.equal(validator.validOperations(parser.parse("output a a;")), false);
            assert.equal(validator.validOperations(parser.parse("a = 6;")), false);
            assert.equal(validator.validOperations(parser.parse("input number b;a = b;")), false);
            assert.equal(validator.validOperations(parser.parse("input number a;a = b;")), false);
            assert.equal(validator.validOperations(parser.parse("a = b;")), false);
            assert.equal(validator.validOperations(parser.parse("input number b;input number c;a = b + c;")), false);
            assert.equal(validator.validOperations(parser.parse("input number a;input number c;a = b - c;")), false);
            assert.equal(validator.validOperations(parser.parse("input number a;input number b;a = b * c;")), false);
            assert.equal(validator.validOperations(parser.parse("input number a;a = b / c;")), false);
            assert.equal(validator.validOperations(parser.parse("input number b;a = b - c;")), false);
            assert.equal(validator.validOperations(parser.parse("input number c;a = b + c;")), false);
        });

	});

	describe('#inputsFirstCheck()', function () {
		this.timeout(1000);
		it('inputsFirstCheck function should be available.', function () {
			assert.equal(typeof validator.inputsFirstCheck === "function", true);
		});
		it('inputsFirstCheck should check if inputs are first.', function () {
			assert.equal(validator.inputsFirstCheck([]), true);
			assert.equal(validator.inputsFirstCheck([{ type: "input", datatype: "number", name: "a" }]), true);
			assert.equal(validator.inputsFirstCheck([{ type: "input", datatype: "number", name: "a" }, { type: "input", datatype: "number", name: "b" }]), true);
			assert.equal(validator.inputsFirstCheck([{ type: "input", datatype: "number", name: "a" }, { type: "variable", datatype: "number", name: "a" }]), true);
			assert.equal(validator.inputsFirstCheck([{ type: "variable", datatype: "number", name: "a" }]), true);
			assert.equal(validator.inputsFirstCheck([{ type: "input", datatype: "number", name: "a" }, { type: "variable", datatype: "number", name: "a" }, { type: "input", datatype: "number", name: "b" }]), false);
			assert.equal(validator.inputsFirstCheck([{ type: "variable", datatype: "number", name: "a" }, { type: "input", datatype: "number", name: "b" }]), false);
		});
	});

	describe('#outputsLastCheck()', function () {
		this.timeout(1000);
		it('outputsLastCheck function should be available.', function () {
			assert.equal(typeof validator.outputsLastCheck === "function", true);
		});
		it('outputsLastCheck should check if outputs are last.', function () {
			assert.equal(validator.outputsLastCheck([]), true);
			assert.equal(validator.outputsLastCheck([{ type: "output", name: "returnvalue", argument: "a" }]), true);
			assert.equal(validator.outputsLastCheck([{ type: "output", name: "returnvalue", argument: "a" }, { type: "output", name: "returnvaluetwo", argument: "b" }]), true);
			assert.equal(validator.outputsLastCheck([{ type: "variable", datatype: "number", argument: "a" }, { type: "output", name: "returnvalue", argument: "a" }]), true);
			assert.equal(validator.outputsLastCheck([{ type: "variable", datatype: "number", argument: "a" }]), true);
			assert.equal(validator.outputsLastCheck([{ type: "output", name: "returnvalue", argument: "a" }, { type: "variable", datatype: "number", argument: "a" }, { type: "output", name: "returnvaluetwo", argument: "b" }]), false);
			assert.equal(validator.outputsLastCheck([{ type: "output", name: "returnvalue", argument: "a" }, { type: "variable", datatype: "number", argument: "a" }]), false);
		});
	});

	describe('#inputAndVariableNameUniqueCheck()', function () {
		this.timeout(1000);
		it('inputAndVariableNameUniqueCheck function should be available.', function () {
			assert.equal(typeof validator.inputAndVariableNameUniqueCheck === "function", true);
		});
		it('inputAndVariableNameUniqueCheck should check if inputs and variables are unique.', function () {
			assert.equal(validator.inputAndVariableNameUniqueCheck([]), true);
			assert.equal(validator.inputAndVariableNameUniqueCheck([{ type: "output", name: "returnvalue", argument: "a" }]), true);
			assert.equal(validator.inputAndVariableNameUniqueCheck([{ type: "input", datatype: "number", name: "a" }]), true);
			assert.equal(validator.inputAndVariableNameUniqueCheck([{ type: "input", datatype: "number", name: "a" }, { type: "input", datatype: "number", name: "b" }]), true);
			assert.equal(validator.inputAndVariableNameUniqueCheck([{ type: "variable", datatype: "number", name: "a" }]), true);
			assert.equal(validator.inputAndVariableNameUniqueCheck([{ type: "variable", datatype: "number", name: "a" },{ type: "variable", datatype: "number", name: "b" }]), true);
			assert.equal(validator.inputAndVariableNameUniqueCheck([{ type: "input", datatype: "number", name: "a" },{ type: "variable", datatype: "number", name: "b" }]), true);
			assert.equal(validator.inputAndVariableNameUniqueCheck([{ type: "variable", datatype: "number", name: "a" },{ type: "variable", datatype: "number", name: "a" }]), false);
			assert.equal(validator.inputAndVariableNameUniqueCheck([{ type: "input", datatype: "number", name: "a" },{ type: "input", datatype: "number", name: "a" }]), false);
			assert.equal(validator.inputAndVariableNameUniqueCheck([{ type: "input", datatype: "number", name: "a" },{ type: "variable", datatype: "number", name: "a" }]), false);
			
		});
	});

    describe('#allUsedVariablesDeclaredCheck()', function () {
        this.timeout(1000);
        it('allUsedVariablesDeclaredCheck function should be available.', function () {
            assert.equal(typeof validator.allUsedVariablesDeclaredCheck === "function", true);
        });
        it('allUsedVariablesDeclaredCheck should checck if all if all variables used are declared before using.', function () {
            assert.equal(validator.allUsedVariablesDeclaredCheck([]), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number a;")), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("number a;")), true);

            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("number a;output a a;")), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("number a;a = 6;")), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("number a;number b;a = b;")), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("number a;number b;number c;a = b + c;")), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("number a;number b;number c;a = b - c;")), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("number a;number b;number c;a = b * c;")), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("number a;number b;number c;a = b / c;")), true);

            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number a;output a a;")), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number a;a = 6;")), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number a;input number b;a = b;")), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number a;input number b;input number c;a = b + c;")), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number a;input number b;input number c;a = b - c;")), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number a;input number b;input number c;a = b * c;")), true);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number a;input number b;input number c;a = b / c;")), true);


            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("output a a;")), false);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("a = 6;")), false);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number b;a = b;")), false);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number a;a = b;")), false);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("a = b;")), false);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number b;input number c;a = b + c;")), false);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number a;input number c;a = b - c;")), false);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number a;input number b;a = b * c;")), false);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number a;a = b / c;")), false);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number b;a = b - c;")), false);
            assert.equal(validator.allUsedVariablesDeclaredCheck(parser.parse("input number c;a = b + c;")), false);
        });
    });

	
});