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
            assert.deepStrictEqual(runtime.execute("number A;number B;a = 6;b = 12;number addition;addition = a + b;number subtraction;subtraction = b - a;number multiplication;multiplication = a * b;number division; division = b / a; output addition addition;output subtraction subtraction;output multiplication multiplication;output division division;"), { addition: "18", subtraction: "6", multiplication: "72",division: "2" });
            assert.deepStrictEqual(runtime.execute("input number number;number numbertoaddto;numbertoaddto = number;number plusone;number one;one = 1;plusone = numbertoaddto + one;output plusone plusone;", { number: 13 }), { plusone: "14" });
		});

	});
});