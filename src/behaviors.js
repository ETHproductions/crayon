'use strict';

let CrayonFunc = require('./structures/Func');
let Big = require('big.js');

module.exports = new Map([
	['•', new CrayonFunc(0, { _: function(state){ state.crayon.dir = 0; } })],
	['→', new CrayonFunc(0, { _: function(state){ state.crayon.dir = 0; } })],
	['↘', new CrayonFunc(0, { _: function(state){ state.crayon.dir = 1; } })],
	['↓', new CrayonFunc(0, { _: function(state){ state.crayon.dir = 2; } })],
	['↙', new CrayonFunc(0, { _: function(state){ state.crayon.dir = 3; } })],
	['←', new CrayonFunc(0, { _: function(state){ state.crayon.dir = 4; } })],
	['↖', new CrayonFunc(0, { _: function(state){ state.crayon.dir = 5; } })],
	['↑', new CrayonFunc(0, { _: function(state){ state.crayon.dir = 6; } })],
	['↗', new CrayonFunc(0, { _: function(state){ state.crayon.dir = 7; } })],
	['⤸', new CrayonFunc(0, { _: function(state){ state.crayon.dir = (state.crayon.dir + 1) % 8; } })],
	['⤵', new CrayonFunc(0, { _: function(state){ state.crayon.dir = (state.crayon.dir + 2) % 8; } })],
	['↷', new CrayonFunc(0, { _: function(state){ state.crayon.dir = (state.crayon.dir + 3) % 8; } })],
	['⟲', new CrayonFunc(0, { _: function(state){ state.crayon.dir = (state.crayon.dir + 4) % 8; } })],
	['↶', new CrayonFunc(0, { _: function(state){ state.crayon.dir = (state.crayon.dir + 5) % 8; } })],
	['⤷', new CrayonFunc(0, { _: function(state){ state.crayon.dir = (state.crayon.dir + 6) % 8; } })],
	['⤹', new CrayonFunc(0, { _: function(state){ state.crayon.dir = (state.crayon.dir + 7) % 8; } })],
	['E', new CrayonFunc(0, { _: function(state){ state.stack.push(state.input); state.input = ""; } })],
	['L', new CrayonFunc(0, { _: function(state){ state.stack.push((state.input.match(/.+/) || [""])[0]); state.input = state.input.replace(/^.+\n?/, ""); } })],
	['T', new CrayonFunc(0, { _: function(state){ state.stack.push((state.input.match(/\S+/) || [""])[0]); state.input = state.input.replace(/^\S+\s?/, ""); } })],
	['Z', new CrayonFunc(0, { _: function(state){ state.stack.push((state.input.match(/^[^]+?(?=\n\n|\n$|$)/)||"")[0]); state.input = state.input.replace(/^[^]+?(\n\n|\n$|$)/,""); } })],
	['l', new CrayonFunc(1, {
		N: function(state, n){ state.stack.unshift(n); },
		O: function(state, x){ state.stack.unshift(x.length); }
	})],
	['(', new CrayonFunc(1, {
		N: function(state, n){ state.stack.unshift(n.minus(1)); },
		S: function(state, x){ state.stack.unshift(x[0], x.slice(1)); },
		A: function(state, x){ state.stack.unshift(x[0], x.slice(1)); }
	})],
	[')', new CrayonFunc(1, {
		N: function(state, n){ state.stack.unshift(n.plus(1)); },
		S: function(state, x){ state.stack.unshift(x.slice(-1)[0], x.slice(0, -1)); },
		A: function(state, x){ state.stack.unshift(x.slice(-1)[0], x.slice(0, -1)); }
	})],
	['*', new CrayonFunc(2, {
		 NN: function(state, x, y){ state.stack.unshift(x.times(y)); },
		_SN: function(state, s, n){ state.stack.unshift(s.repeat(n)); },
		_SA: function(state, s, a){ state.stack.unshift(a.join(s)); }
	})]
]);
