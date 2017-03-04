'use strict';

let CrayonFunc = require('./structures/Func');
let Char = require('./structures/Char');
let Big = require('big.js');

function ty(a) {
	if (a === undefined || a === null) return "";
	if (a.constructor === Array) return "A";
	if (a.constructor === Big) return "N";
	if (a.hasOwnProperty("data")) return "C";
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
	['q', new CrayonFunc(1, { O: function(state, o){ state.canvas.writeString(o + ""); state.stack.push(o); } })],
	['X', new CrayonFunc(1, {
		N: function(state, n){ state.crayon.x = +n; },
		O: function(state, x){ state.stack.push(x); }
	})],
	['Y', new CrayonFunc(1, {
		N: function(state, n){ state.crayon.y = +n; },
		O: function(state, x){ state.stack.push(x); }
	})],
	['x', new CrayonFunc(1, {
		N: function(state, n){ state.crayon.x += +n; },
		O: function(state, x){ state.stack.push(x); }
	})],
	['y', new CrayonFunc(1, {
		N: function(state, n){ state.crayon.y += +n; },
		O: function(state, x){ state.stack.push(x); }
	})],
	['C', new CrayonFunc(2, {
		NN: function(state, a, b){ state.crayon.moveTo(a, b); },
		SS: function(state, a, b){ state.stack.push(Big(a.indexOf(b))); }
	})],
	['c', new CrayonFunc(2, {
		NN: function(state, a, b){ state.crayon.moveBy(a, b); },
		SS: function(state, a, b){ state.stack.push(Big(a.lastIndexOf(b))); }
	})],
	
	// Input
	['E', new CrayonFunc(0, { _: function(state){ state.stack.push(state.input); state.input = ""; } })],
	['L', new CrayonFunc(0, { _: function(state){ state.stack.push((state.input.match(/.+/) || [""])[0]); state.input = state.input.replace(/^.+\n?/, ""); } })],
	['T', new CrayonFunc(0, { _: function(state){ state.stack.push((state.input.match(/\S+/) || [""])[0]); state.input = state.input.replace(/^\S+\s?/, ""); } })],
	['Z', new CrayonFunc(0, { _: function(state){ state.stack.push((state.input.match(/^[^]+?(?=\n\n|\n$|$)/)||"")[0]); state.input = state.input.replace(/^[^]+?(\n\n|\n$|$)/,""); } })],
	
	[':', new CrayonFunc(1, { O: function(state, o){ state.stack.push(o, clone(o)); } })],
	[';', new CrayonFunc(1, { O: function(state, o){ /* not a no-op, pops the item from the stack */ } })],
	['\\', new CrayonFunc(2, { OO: function(state, a, b){ state.stack.push(b, a); } })],
	['@', new CrayonFunc(3, { OOO: function(state, a, b, c){ state.stack.push(b, c, a); } })],
	['[', new CrayonFunc(0, { _: function(state){ state.stack.push([]); state.enter(); } })],
	[']', new CrayonFunc(0, { _: function(state){ state.exit(); } })],
	['_', new CrayonFunc(1, { O: function(state, o){ state.stack.push(array(o)); state.enter(); } })],
	
	['l', new CrayonFunc(1, {
		N: function(state, n){ state.stack.push(n); },
		O: function(state, x){ state.stack.push(x.length); }
	})],
	['(', new CrayonFunc(1, {
		N: function(state, n){ state.stack.push(n.minus(1)); },
		S: function(state, x){ state.stack.push(x[0], x.slice(1)); },
		A: function(state, x){ state.stack.push(x[0], x.slice(1)); }
	})],
	[')', new CrayonFunc(1, {
		N: function(state, n){ state.stack.push(n.plus(1)); },
		S: function(state, x){ state.stack.push(x.slice(-1)[0], x.slice(0, -1)); },
		A: function(state, x){ state.stack.push(x.slice(-1)[0], x.slice(0, -1)); }
	})],
	['*', new CrayonFunc(2, {
		 NN: function(state, x, y){ state.stack.push(x.times(y)); },
		_SN: function(state, s, n){ state.stack.push(s.repeat(n)); },
		_SA: function(state, s, a){ state.stack.push(a.join(s)); }
	})]
]);
