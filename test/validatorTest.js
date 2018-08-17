var assert = require('assert');
var validator = require('../src/validator');
describe('validator', function () {
	describe('#validOperations()', function () {
		this.timeout(1000);
		it('validOperations function should be available.', function () {
			assert.equal(typeof validator.validOperations === "function", true);
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
		it('outputsLastCheck should check if inputs are first.', function () {
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
		it('inputAndVariableNameUniqueCheck should check if inputs are first.', function () {
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


	
});