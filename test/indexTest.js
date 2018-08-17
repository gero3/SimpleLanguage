var assert = require('assert');
var index = require('../src/index');
describe('index', function () {
	describe('#normalize()', function () {
		this.timeout(1000);
		it('normalize function should be available.', function () {
			assert.equal(typeof index.normalize === "function", true);
		});
		it('normalize casing should be lowercase', function () {
			assert.deepStrictEqual(index.normalize("INPUT Number A;\n          INPUT Number B;"), "input number a;\ninput number b;\n");
			assert.deepStrictEqual(index.normalize("                        Output RETURNVaLUE A;                                 \n          Output RETURNVaLUeTWO A;                         "), "output returnvalue a;\noutput returnvaluetwo a;\n");
		});
		it('normalize once is the same as normalizing multiple times', function () {
			assert.deepStrictEqual(index.normalize(index.normalize("INPUT Number A;\n          INPUT Number B;")), "input number a;\ninput number b;\n");
			assert.deepStrictEqual(index.normalize(index.normalize(" Output RETURNVaLUE A;                 \nOutput RETURNVaLUeTWO A; ")), "output returnvalue a;\noutput returnvaluetwo a;\n");
		});

	});
});