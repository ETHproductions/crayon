'use strict';

let CrayonFunc = require('./structures/Func');
let Char = require('./structures/Char');
let Big = require('bignumber.js');
Big.config({ ERRORS: false });

function ty(a) {
	if (a === undefined || a === null) return NaN;
	if (a.constructor === Array) return "A";
	if (a.constructor === Big) return "N";
	if (a.constructor === Char) return "C";
	if (a.constructor === RegExp) return "R";
	if (a.constructor === String) return "S";
}

function clone(obj) {
	if (ty(obj) === "A") return obj.slice();
	if (ty(obj) === "C") return new Char(obj.data);
	if (ty(obj) === "N") return obj.plus(0);
	return obj;
}

function array(obj) {
	if (ty(obj) === "A") return obj;
	if (ty(obj) === "C") return [obj];
	if (ty(obj) === "S") return [...obj].map(x => new Char(x));
	if (ty(obj) === "N") {
		let range = [];
		for (obj = obj.round(0, 0); obj.s === 1 && +obj; ) {
			obj = obj.minus(1);
			range.unshift(obj);
		}
		return range;
	}
}

function number(obj) {
	if (ty(obj) === "N") return obj;
	if (ty(obj) === "C") return new Big(obj.code);
	if (ty(obj) === "S") return new Big(obj);
	if (ty(obj) === "A") return obj.reduce((x, prev) => prev.plus(number(x)), new Big(0));
}

function string(obj) {
	if (ty(obj) === "A") return obj.join("");
	return obj + "";
}

module.exports = new Map([
	['•', new CrayonFunc(0, { _: function(state){ state.crayon.rotateTo(0); /* more to come */ } })],
	['→', new CrayonFunc(0, { _: function(state){ state.crayon.rotateTo(0); } })],
	['↘', new CrayonFunc(0, { _: function(state){ state.crayon.rotateTo(1); } })],
	['↓', new CrayonFunc(0, { _: function(state){ state.crayon.rotateTo(2); } })],
	['↙', new CrayonFunc(0, { _: function(state){ state.crayon.rotateTo(3); } })],
	['←', new CrayonFunc(0, { _: function(state){ state.crayon.rotateTo(4); } })],
	['↖', new CrayonFunc(0, { _: function(state){ state.crayon.rotateTo(5); } })],
	['↑', new CrayonFunc(0, { _: function(state){ state.crayon.rotateTo(6); } })],
	['↗', new CrayonFunc(0, { _: function(state){ state.crayon.rotateTo(7); } })],
	['⤸', new CrayonFunc(0, { _: function(state){ state.crayon.rotateBy(1); } })],
	['⤵', new CrayonFunc(0, { _: function(state){ state.crayon.rotateBy(2); } })],
	['↷', new CrayonFunc(0, { _: function(state){ state.crayon.rotateBy(3); } })],
	['⟲', new CrayonFunc(0, { _: function(state){ state.crayon.rotateBy(4); } })],
	['↶', new CrayonFunc(0, { _: function(state){ state.crayon.rotateBy(5); } })],
	['⤷', new CrayonFunc(0, { _: function(state){ state.crayon.rotateBy(6); } })],
	['⤹', new CrayonFunc(0, { _: function(state){ state.crayon.rotateBy(7); } })],
	['n', new CrayonFunc(0, { _: function(state){ state.crayon.moveBy( 0, -1); } })],
	['s', new CrayonFunc(0, { _: function(state){ state.crayon.moveBy( 0, +1); } })],
	['w', new CrayonFunc(0, { _: function(state){ state.crayon.moveBy(-1,  0); } })],
	['e', new CrayonFunc(0, { _: function(state){ state.crayon.moveBy(+1,  0); } })],
	['f', new CrayonFunc(0, { _: function(state){ state.crayon.moveForward(); } })],
	['F', new CrayonFunc(1, {
		N: function(state, n){ state.crayon.moveForward(n); },
		A: function(state, a){
			var result = [];

			function flat(arr) {
				for (var item of arr) {
					if (ty(item) === "A")
						flat(item);
					else
						result.push(item);
				}
			}

			flat(a);
			state.push(result);
		},
		O: function(state, x){ state.push(x); }
	})],
	['q', new CrayonFunc(1, { O: function(state, o){ state.canvas.writeString(o + ""); state.push(o); } })],
	['Q', new CrayonFunc(1, { O: function(state, o){ state.canvas.writeString(o + ""); } })],
	['X', new CrayonFunc(1, {
		N: function(state, n){ state.crayon.x = +n; },
		O: function(state, x){ state.push(x); }
	})],
	['Y', new CrayonFunc(1, {
		N: function(state, n){ state.crayon.y = +n; },
		O: function(state, x){ state.push(x); }
	})],
	['x', new CrayonFunc(1, {
		N: function(state, n){ state.crayon.x += +n; },
		O: function(state, x){ state.push(x); }
	})],
	['y', new CrayonFunc(1, {
		N: function(state, n){ state.crayon.y += +n; },
		O: function(state, x){ state.push(x); }
	})],
	['C', new CrayonFunc(2, {
		NN: function(state, a, b){ state.crayon.moveTo(a, b); },
		SS: function(state, a, b){ state.push(new Big(a.indexOf(b))); }
	})],
	['c', new CrayonFunc(2, {
		NN: function(state, a, b){ state.crayon.moveBy(a, b); },
		SS: function(state, a, b){ state.push(new Big(a.lastIndexOf(b))); }
	})],
	
	// Input
	['E', new CrayonFunc(0, { _: function(state){ state.push(state.input); state.input = ""; } })],
	['L', new CrayonFunc(0, { _: function(state){ state.push((state.input.match(/.+/) || [""])[0]); state.input = state.input.replace(/^.+\n?/, ""); } })],
	['T', new CrayonFunc(0, { _: function(state){ state.push((state.input.match(/\S+/) || [""])[0]); state.input = state.input.replace(/^\S+\s?/, ""); } })],
	['Z', new CrayonFunc(0, { _: function(state){ state.push((state.input.match(/^[^]+?(?=\n\n|\n$|$)/)||"")[0]); state.input = state.input.replace(/^[^]+?(\n\n|\n$|$)/,""); } })],
	
	[':', new CrayonFunc(1, { O: function(state, o){ state.push(o, clone(o)); } })],
	[';', new CrayonFunc(1, { O: function(state, o){ /* not a no-op, pops the item from the stack */ } })],
	['\\', new CrayonFunc(2, { OO: function(state, a, b){ state.push(b, a); } })],
	['@', new CrayonFunc(3, { OOO: function(state, a, b, c){ state.push(b, c, a); } })],
	['[', new CrayonFunc(0, { _: function(state){ state.push([]); state.enter(); } })],
	[']', new CrayonFunc(0, { _: function(state){ state.exit(); } })],
	['_', new CrayonFunc(1, {
		N: function(state, n){ state.push(array(o)); state.enter(); },
		S: function(state, s){ state.push(array(o)); state.enter(); },
		A: function(state, a){ state.push(array(o)); state.enter(); }
	})],
	['~', new CrayonFunc(1, { A: function(state, o){ state.push(array(o)); state.enter(); } })],

	['A', new CrayonFunc(1, { O: function(state, o){ state.push(array(o)); } })],
	['N', new CrayonFunc(1, { O: function(state, o){ state.push(number(o)); } })],
	['S', new CrayonFunc(1, { O: function(state, o){ state.push(string(o)); } })],
	
	['l', new CrayonFunc(1, {
		N: function(state, n){ state.push(n); },
		O: function(state, x){ state.push(x.length); }
	})],
	['(', new CrayonFunc(1, {
		N: function(state, n){ state.push(n.minus(1)); },
		C: function(state, c){ state.push(new Char(c.code - 1)); },
		S: 'A',
		A: function(state, x){ state.push(x[0], x.slice(1)); }
	})],
	[')', new CrayonFunc(1, {
		N: function(state, n){ state.push(n.plus(1)); },
		C: function(state, c){ state.push(new Char(c.code + 1)); },
		S: 'A',
		A: function(state, x){ state.push(x.slice(0, -1), x.slice(-1)[0]); }
	})],
	['+', new CrayonFunc(2, {
		 NN: function(state, x, y){ state.push(x.plus(y)); },
		 AA: function(state, a1, a2){ state.push(a1.concat(a2)); },
		 AO: function(state, a, o){ a.push(o); state.push(a); },
		 OA: function(state, o, a){ a.unshift(o); state.push(a); },
		 SO: function(state, s, o){ state.push(s + o); },
		 OS: function(state, o, s){ state.push(o + s); }
	})],
	['*', new CrayonFunc(2, {
		 NN: function(state, x, y){ state.push(x.times(y)); },
		_SN: function(state, s, n){ state.push(s.repeat(n)); },
		_CN: "_SN",
		_SA: function(state, s, a){ state.push(a.join(s)); },
		_AN: function(state, a, n){
			var result = [];
			if (a.length > 0)
				for (n = n.round(0, 0); n.s === 1 && +n; n = n.minus(1))
					result = result.concat(a);
			state.push(result);
		}
	})]
]);
