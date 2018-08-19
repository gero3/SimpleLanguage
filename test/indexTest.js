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

    describe('#parse()', function () {
        this.timeout(1000);
        it('parse function should be available.', function () {
            assert.equal(typeof index.parse === "function", true);
        });
    });

    describe('#generate()', function () {
        this.timeout(1000);
        it('generate function should be available.', function () {
            assert.equal(typeof index.generate === "function", true);
        });
    });

    describe('#execute()', function () {
        this.timeout(1000);
        it('execute function should be available.', function () {
            assert.equal(typeof index.execute === "function", true);
        });
    });

    describe('#validate()', function () {
        this.timeout(1000);
        it('validate function should be available.', function () {
            assert.equal(typeof index.validate === "function", true);
        });
    });

    describe('#validateText()', function () {
        this.timeout(1000);
        it('validateText function should be available.', function () {
            assert.equal(typeof index.validateText === "function", true);
        });
    });

    describe('#validateOperations()', function () {
        this.timeout(1000);
        it('validateOperations function should be available.', function () {
            assert.equal(typeof index.validateOperations === "function", true);
        });
    });
});