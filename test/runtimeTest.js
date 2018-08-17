var assert = require('assert');
var runtime = require('../src/runtime');
describe('runtime', function () {
	describe('#execute()', function () {
		this.timeout(1000);
		it('execute function should be available.', function () {
			assert.equal(typeof runtime.execute === "function", true);
		});
		it('no ouput should be generated when no output operations are used', function () {
			assert.deepStrictEqual(runtime.execute(""), {});
			assert.deepStrictEqual(runtime.execute("INPUT Number A;\n          INPUT Number B;", {a:0, b:0} ), {});
		});
		it('ouput without inputs', function () {
			assert.deepStrictEqual(runtime.execute("number A;number B;a = 6;b = 7;number addition;addition = a + b; output thirteen addition;"), {thirteen:"13"});
			assert.deepStrictEqual(runtime.execute("number A;number B;a = 6;b = 7;number addition;addition = a + b;number subtraction;subtraction = b - a;number multiplication;multiplication = a * b; output addition addition;output subtraction subtraction;output multiplication multiplication;"), {addition:"13",subtraction : "1", multiplication: "42"});
		});

	});
});