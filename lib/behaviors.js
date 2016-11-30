'use strict';

var CrayonFunc = require('./structures/Func');

module.exports = new Map([['•', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = 0;
    } })], ['→', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = 0;
    } })], ['↘', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = 1;
    } })], ['↓', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = 2;
    } })], ['↙', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = 3;
    } })], ['←', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = 4;
    } })], ['↖', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = 5;
    } })], ['↑', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = 6;
    } })], ['↗', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = 7;
    } })], ['⤸', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = (state.crayon.dir + 1) % 8;
    } })], ['⤵', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = (state.crayon.dir + 2) % 8;
    } })], ['↷', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = (state.crayon.dir + 3) % 8;
    } })], ['⟲', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = (state.crayon.dir + 4) % 8;
    } })], ['↶', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = (state.crayon.dir + 5) % 8;
    } })], ['⤷', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = (state.crayon.dir + 6) % 8;
    } })], ['⤹', new CrayonFunc(0, { _: function _(state) {
        state.crayon.dir = (state.crayon.dir + 7) % 8;
    } })], ['E', new CrayonFunc(0, { _: function _(state) {
        state.stack.push(state.input);state.input = "";
    } })], ['L', new CrayonFunc(0, { _: function _(state) {
        state.stack.push((state.input.match(/.+/) || [""])[0]);state.input = state.input.replace(/^.+\n?/, "");
    } })], ['T', new CrayonFunc(0, { _: function _(state) {
        state.stack.push((state.input.match(/\S+/) || [""])[0]);state.input = state.input.replace(/^\S+\s?/, "");
    } })], ['Z', new CrayonFunc(0, { _: function _(state) {
        state.stack.push((state.input.match(/^[^]+?(?=\n\n|\n$|$)/) || "")[0]);state.input = state.input.replace(/^[^]+?(\n\n|\n$|$)/, "");
    } })], ['l', new CrayonFunc(1, {
    N: function N(state, n) {
        state.stack.push(n);
    },
    O: function O(state, x) {
        state.stack.push(x.length);
    }
})], ['*', new CrayonFunc(2, {
    NN: function NN(state, x, y) {
        state.stack.push(x * y);
    },
    _SN: function _SN(state, s, n) {
        state.stack.push(s.repeat(n));
    },
    _SA: function _SA(state, s, a) {
        state.stack.push(a.join(s));
    }
})]]);