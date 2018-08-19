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

        it('text should be parsed or invalid', function () {
            assert.deepStrictEqual(index.parse("INPUT Number A;"), [{ type: "input", datatype: "number", name: "a" }]);
            assert.throws(function () { index.parse("number b;INPUT Number A;"); });
        });
    });

    describe('#generate()', function () {
        this.timeout(1000);
        it('generate function should be available.', function () {
            assert.equal(typeof index.generate === "function", true);
        });
        it('operations should be generated to text or invalid', function () {
            assert.deepStrictEqual(index.generate([{ type: "input", datatype: "number", name: "a" }]), "input number a;\n");
            assert.throws(function () { index.generate([{ type: "input", datatype: "number", name: "a" }, { type: "input", datatype: "number", name: "a" }]); });
        });

    });

    describe('#execute()', function () {
        this.timeout(1000);
        it('execute function should be available.', function () {
            assert.equal(typeof index.execute === "function", true);
        });

        it('text should be executed with inputs', function () {
            assert.deepStrictEqual(index.execute("number A;number B;a = 6;b = 7;number addition;addition = a + b; output thirteen addition;"), { thirteen: "13" });
        });
    });

    describe('#validate()', function () {
        this.timeout(1000);
        it('validate function should be available.', function () {
            assert.equal(typeof index.validate === "function", true);
        });

        it('text should be validated', function () {
            assert.deepStrictEqual(index.validate("number A;number B;a = 6;b = 7;number addition;addition = a + b; output thirteen addition;"), true);
            assert.deepStrictEqual(index.validate("number b;INPUT Number A;"), false);
            assert.deepStrictEqual(index.validate("blablabla"), false);
        });

        it('operations should be validated', function () {
            assert.deepStrictEqual(index.validate([{ type: "input", datatype: "number", name: "a" }]), true);
            assert.deepStrictEqual(index.validate([{ type: "input", datatype: "number", name: "a" }, { type: "input", datatype: "number", name: "a" }]), false);
        });
    });

    describe('#validateText()', function () {
        this.timeout(1000);
        it('validateText function should be available.', function () {
            assert.equal(typeof index.validateText === "function", true);
        });
        it('text should be validated', function () {
            assert.deepStrictEqual(index.validateText("number A;number B;a = 6;b = 7;number addition;addition = a + b; output thirteen addition;"), true);
            assert.deepStrictEqual(index.validateText("number b;INPUT Number A;"), false);
            assert.deepStrictEqual(index.validateText("blablabla"), false);
        });
    });

    describe('#validateOperations()', function () {
        this.timeout(1000);
        it('validateOperations function should be available.', function () {
            assert.equal(typeof index.validateOperations === "function", true);
        });
        it('operations should be validated', function () {
            assert.deepStrictEqual(index.validateOperations([{ type: "input", datatype: "number", name: "a" }]), true);
            assert.deepStrictEqual(index.validateOperations([{ type: "input", datatype: "number", name: "a" }, { type: "input", datatype: "number", name: "a" }]), false);
        });

    });
});