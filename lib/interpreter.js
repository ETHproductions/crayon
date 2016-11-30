/* jshint -W061 */
/* jshint -W093 */

'use strict';

var CrayonCanvas = require('./structures/Canvas');
var CrayonState = require('./structures/State');
var behaviors = require('./behaviors');

function ty(a) {
    return {}.toString.call(a)[8];
}
if (![1].last) {
    Object.defineProperty(Array.prototype, 'last', {
        get: function get() {
            return this[this.length - 1];
        },
        set: function set(x) {
            return this[this.length - 1] = x;
        }
    });
    Object.defineProperty(Array.prototype, 'last2', {
        get: function get() {
            return this[this.length - 2];
        },
        set: function set(x) {
            return this[this.length - 2] = x;
        }
    });
}

module.exports = {
    run: function run(code) {
        var input = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        console.log("Running this code:", code);
        var state = new CrayonState();
        var canvas = new CrayonCanvas();

        function c(char) {
            var func = behaviors.get(char);
            if (!func) return;

            var arity = func.arity;
            var funcs = func.behavior;
            if (state.stack.length < arity) return console.error("Error: empty stack");

            for (var args = [], i = arity; i > 0; i--) {
                args.push(state.stack.shift());
            }var success = false;
            function att(f, a) {
                if (success) return;
                var news = [];
                for (i = 0; i < a.length; i++) {
                    news.push(args[a[i]]);
                }if (typeof funcs[f] === "function") {
                    var _funcs$f;

                    success = true;
                    (_funcs$f = funcs[f]).call.apply(_funcs$f, [null, state].concat(args));
                }
            }
            var types = args.map(ty);

            if (arity === 0) att("_", []);else if (arity === 1) {
                att(types[0], [0]);
                att("O", [0]);
            } else if (arity === 2) {
                att(types[0] + types[1], [0, 1]);
                att("_" + types[0] + types[1], [0, 1]);
                att("_" + types[1] + types[0], [1, 0]);
                att(types[0] + "O", [0, 1]);
                att("_" + types[0] + "O", [0, 1]);
                att("_" + types[1] + "O", [1, 0]);
                att("OO", [0, 1]);
            } else if (arity === 3) {
                att(types[0] + types[1] + types[2], [0, 1, 2]);
                att("_OOO", [0, 1, 2]);
            }
        }

        // **************** 
        // This section creates a map of the control flow of the program.
        // The map is put into a variable called "map".
        // Each item in map is 

        var tokens = code.match(/\d*\.\d+|\d+|[.Dd](?:.|$)|"(?:`.|[^"])*"|'([gimtxd]*')?(?:`.|[^'])*'|`.|./g) || [];
        console.log("tokens:", tokens);
        var controls = /^[OWz!<=>]$/,
            indices = [],
            map = [],
            i = void 0,
            t = void 0,
            level = void 0;
        for (i = 0; i < tokens.length; i++) {
            t = tokens[i];
            if (/"|\d|`/.test(t)) ;else if (controls.test(t)) {
                indices.push(i);
                map[i] = [tokens.length, i, i];
            } else if (t === "?") {
                map[indices.last][2] = i;
            } else if (t === "{") {
                map[indices.last][1] = i;
            } else if (t === "}") {
                map[indices.last][0] = i;
                map[i] = [indices.pop()];
            }
        }
        for (; indices.length; i++) {
            tokens.push("}");
            map[indices.last][0] = i;
            indices.pop();
        }

        console.log("map:", map);

        var nexts = [],
            currs = [],
            Oitem = void 0,
            Oindex = void 0,
            Ojtem = void 0,
            Ojndex = void 0;
        for (i = 0, level = 0; i < tokens.length; i++) {
            t = tokens[i];

            if (nexts.length && i === nexts.last[2]) ;else if (/^["'`0-9]/.test(t)) state.stack.unshift(t[0] === "`" ? t[1] : t[0] === "'" ? eval("/(?:)/") : eval(t.replace(/`(.)/g, "\\$&")));else if (controls.test(t)) {
                nexts.push(map[i]);
                if (t === "O") ;else if (t === "!") currs.push(!state.stack[0] || state.stack[0].length === 0);else if (t === "z") currs.push(!!state.stack[0] && state.stack[0].length !== 0);else if (t === "=") currs.push(2 in state.stack && state.stack[0].toString() === state.stack[1].toString() && ty(state.stack[0]) === ty(state.stack[1]));
            } else if (t === "{") i = nexts.pop()[0];else if (t === "}") {
                if (currs.last === "O") ;else if (currs.last === "W") if (state.stack[0]) i = nexts.last[2];
            } else c(t);

            if (nexts.length && i === nexts.last[2]) {
                if (!currs.last) i = nexts.last[1] || nexts.last[0];
            }
        }

        console.log("stack:", state.stack);
    }
};