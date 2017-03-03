'use strict';

var CrayonFunc = require('./structures/Func');
var Big = require('big.js');

module.exports = new Map([['•', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(0); /* more to come */
	} })], ['→', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(0);
	} })], ['↘', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(1);
	} })], ['↓', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(2);
	} })], ['↙', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(3);
	} })], ['←', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(4);
	} })], ['↖', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(5);
	} })], ['↑', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(6);
	} })], ['↗', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(7);
	} })], ['⤸', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(1);
	} })], ['⤵', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(2);
	} })], ['↷', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(3);
	} })], ['⟲', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(4);
	} })], ['↶', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(5);
	} })], ['⤷', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(6);
	} })], ['⤹', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(7);
	} })], ['E', new CrayonFunc(0, { _: function _(state) {
		state.stack.push(state.input);state.input = "";
	} })], ['L', new CrayonFunc(0, { _: function _(state) {
		state.stack.push((state.input.match(/.+/) || [""])[0]);state.input = state.input.replace(/^.+\n?/, "");
	} })], ['T', new CrayonFunc(0, { _: function _(state) {
		state.stack.push((state.input.match(/\S+/) || [""])[0]);state.input = state.input.replace(/^\S+\s?/, "");
	} })], ['Z', new CrayonFunc(0, { _: function _(state) {
		state.stack.push((state.input.match(/^[^]+?(?=\n\n|\n$|$)/) || "")[0]);state.input = state.input.replace(/^[^]+?(\n\n|\n$|$)/, "");
	} })], ['q', new CrayonFunc(1, { O: function O(state, o) {
		state.canvas.writeString(o + "");state.stack.push(o);
	} })], ['l', new CrayonFunc(1, {
	N: function N(state, n) {
		state.stack.unshift(n);
	},
	O: function O(state, x) {
		state.stack.unshift(x.length);
	}
})], ['(', new CrayonFunc(1, {
	N: function N(state, n) {
		state.stack.unshift(n.minus(1));
	},
	S: function S(state, x) {
		state.stack.unshift(x[0], x.slice(1));
	},
	A: function A(state, x) {
		state.stack.unshift(x[0], x.slice(1));
	}
})], [')', new CrayonFunc(1, {
	N: function N(state, n) {
		state.stack.unshift(n.plus(1));
	},
	S: function S(state, x) {
		state.stack.unshift(x.slice(-1)[0], x.slice(0, -1));
	},
	A: function A(state, x) {
		state.stack.unshift(x.slice(-1)[0], x.slice(0, -1));
	}
})], ['*', new CrayonFunc(2, {
	NN: function NN(state, x, y) {
		state.stack.unshift(x.times(y));
	},
	_SN: function _SN(state, s, n) {
		state.stack.unshift(s.repeat(n));
	},
	_SA: function _SA(state, s, a) {
		state.stack.unshift(a.join(s));
	}
})]]);