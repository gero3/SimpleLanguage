var assert = require('assert');
var constant = require('../src/constant');
var runtime = require('../src/runtime');
describe('runtime', function () {

	describe('#execute()', function () {
		this.timeout(1000);
		it('execute function should be available.', function () {
			assert.equal(typeof runtime.execute === "function", true);
		});
		it('no ouput should be generated when no output operations are used', function () {
			assert.deepStrictEqual(runtime.execute(""), {});
			assert.deepStrictEqual(runtime.execute("INPUT Number A;\n          INPUT Number B;", { a: 0, b: 0 }), {});
		});
		it('ouput', function () {
			assert.deepStrictEqual(runtime.execute("number A;number B;a = 6;b = 7;number addition;addition = a + b; output thirteen addition;"), { thirteen: "13" });
			assert.deepStrictEqual(runtime.execute("number A;number B;a = 6;b = 12;number addition;addition = a + b;number subtraction;subtraction = b - a;number multiplication;multiplication = a * b;number division; division = b / a; output addition addition;output subtraction subtraction;output multiplication multiplication;output division division;"), { addition: "18", subtraction: "6", multiplication: "72", division: "2" });
			assert.deepStrictEqual(runtime.execute("input number number;number numbertoaddto;numbertoaddto = number;number plusone;number one;one = 1;plusone = numbertoaddto + one;output plusone plusone;", { number: 13 }), { plusone: "14" });
			assert.deepStrictEqual(runtime.execute("boolean A;a = true;boolean b; b=false; output truevalue a; output falsevalue b;"), { truevalue: "true", falsevalue: "false" });
			assert.deepStrictEqual(runtime.execute("input boolean left;input boolean right;boolean a;boolean b; a = left;b = right;boolean and; and=a & b;boolean or; or=a | b; output and and;output or or;", {left:false,right:false}), { and: "false", or: "false"});
			assert.deepStrictEqual(runtime.execute("input boolean left;input boolean right;boolean a;boolean b; a = left;b = right;boolean and; and=a & b;boolean or; or=a | b; output and and;output or or;", {left:true,right:false}), { and: "false", or: "true"});
			assert.deepStrictEqual(runtime.execute("input boolean left;input boolean right;boolean a;boolean b; a = left;b = right;boolean and; and=a & b;boolean or; or=a | b; output and and;output or or;", {left:false,right:true}), { and: "false", or: "true"});
			assert.deepStrictEqual(runtime.execute("input boolean left;input boolean right;boolean a;boolean b; a = left;b = right;boolean and; and=a & b;boolean or; or=a | b; output and and;output or or;", {left:true,right:true}), { and: "true", or: "true"});
			
			assert.deepStrictEqual(runtime.execute("input number left;input number right;number a;number b; a = left;b = right;boolean lesser; lesser=a < b;boolean greater; greater=a > b; output lesser lesser;output greater greater;", {left:6,right:7}), { lesser: "true", greater: "false"});
			assert.deepStrictEqual(runtime.execute("input number left;input number right;number a;number b; a = left;b = right;boolean lesser; lesser=a =< b;boolean greater; greater=a => b; output lesser lesser;output greater greater;", {left:6,right:7}), { lesser: "true", greater: "false"});

			assert.deepStrictEqual(runtime.execute("input boolean A;boolean b; b = a;output falsevalue b;", { a: false }), { falsevalue: "false" });
		});
		it('ouput errors when invalid script', function () {
			assert.throws(function () { runtime.execute("number A;number a;"); });
			assert.throws(function () { runtime.execute("blabla"); });
		});

	});

	describe('#executeOperations()', function () {
		this.timeout(1000);
		it('executeOperations function should be available.', function () {
			assert.equal(typeof runtime.executeOperations === "function", true);
		});
		it('ouput errors when invalid script', function () {
			assert.throws(function () { runtime.executeOperations([{ type: "blabla", assignee: "a", left: "a", operator: "+", right: "a" }]); });
			assert.throws(function () { runtime.executeOperations([{ type: constant.variable, datatype: "number", name: "a" },{ type: constant.numberExpression, assignee: "a", left: "a", operator: "blabla", right: "a" }]); });
			assert.throws(function () { runtime.executeOperations([{ type: constant.variable, datatype: "boolean", name: "a" },{ type: constant.booleanExpression, assignee: "a", left: "a", operator: "blabla", right: "a" }]); });
			assert.throws(function () { runtime.executeOperations([{ type: constant.variable, datatype: "boolean", name: "a" },{ type: constant.variable, datatype: "number", name: "b" },{ type: constant.comparisionExpression, assignee: "a", left: "b", operator: "blabla", right: "b" }]); });
			assert.throws(function () { runtime.executeOperations([{ type: constant.variable, datatype: "boolean", name: "a" },{ type: constant.variable, datatype: "number", name: "b" },{ type: constant.comparisionExpression, assignee: "a", left: "a", operator: "blabla", right: "b" }]); });
			assert.throws(function () { runtime.executeOperations([{ type: constant.input, datatype: "blabla", name: "a" }]); });
			assert.throws(function () { runtime.executeOperations([{ type: constant.variable, datatype: "blabla", name: "a" }]); });
			assert.throws(function () { runtime.executeOperations([{ type: constant.booleanAssignment, assignee: "a", literal: "fasle" }]); });
		});

	});

});