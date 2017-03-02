/* jshint -W061 */
/* jshint -W093 */

'use strict';

let CrayonCanvas = require('./structures/Canvas');
let CrayonState = require('./structures/State');
let Char = require('./structures/Char');
let behaviors = require('./behaviors');
let Big = require('big.js');

function ty(a) {
	if (a === undefined || a === null) return "";
    if (a.constructor === Array) return "A";
    if (a.constructor === Big) return "N";
    if (a.constructor === Char) return "C";
    if (a.constructor === RegExp) return "R";
    if (a.constructor === String) return "S";
}

function prettyprint(a) {
    if (ty(a) === "A")
        return "[ " + a.map(prettyprint).join(", ") + " ]";
    if (ty(a) === "N")
        return a.toString();
	if (ty(a) === "S")
    	return '"' + a.replace(/\\|"/g, "\\$&") + '"';
	if (ty(a) === "C")
		return "'" + a + "'";
	throw new TypeError("Can't prettyprint a " + (a.constructor + "").match(/[A-Z]\w+/) + " object");
}
if (![1].last) {
    Object.defineProperty(Array.prototype, 'last', {
        get: function ( ) { return this[this.length - 1]; },
        set: function (x) { return this[this.length - 1] = x; }
    });
    Object.defineProperty(Array.prototype, 'last2', {
        get: function ( ) { return this[this.length - 2]; },
        set: function (x) { return this[this.length - 2] = x; }
    });
}

function truthy(a) {
	if (ty(a) === "N")
		return a + "" !== "0";
	if (ty(a) === "C")
		return a.code !== 0;
	if (ty(a) === "A" || ty(a) === "S")
		return a.length > 0;
	return !!a;
}

function falsy(a) {
	return !truthy(a);
}

function equal(a, b) {
	if (ty(a) !== ty(b)) return false;
	if (a === undefined || b === undefined) return false;
	if (ty(a) === "S") return a === b;
	if (ty(a) === "C") return a.code === b.code;
	if (ty(a) === "A") return prettyprint(a) === prettyprint(b);
	if (ty(a) === "N") return a + "" === b + "";
	return a === b;
}

module.exports = {
    run (code, input = "") {
        console.log("Running this code:", code);
        let state = new CrayonState();
        let canvas = new CrayonCanvas();
        
        function c(char) {
            let func = behaviors.get(char);
            if (!func) return;
            
            let arity = func.arity;
            let funcs = func.behavior;
			
            if (state.stack.length < arity) return console.error("Error: empty stack");
            
            var args = state.stack.splice(0, arity);
            
            let success = false;
            function att(f, a) {
                if (success) return;
                if (typeof funcs[f] === "function") {
                    success = true;
                    funcs[f].call(null, state, ...a.map(i => args[i]));
                }
            }
            let types = args.map(ty);
            
            if (arity === 0) att("_",[]);
            else if (arity === 1) {
                att(types[0],[0]);
                att("O",[0]);
            }
            else if (arity === 2) {
                att(types[0]+types[1],[0,1]);
                att("_"+types[0]+types[1],[0,1]);
                att("_"+types[1]+types[0],[1,0]);
                att(types[0]+"O",[0,1]);
                att("_"+types[0]+"O",[0,1]);
                att("_"+types[1]+"O",[1,0]);
                att("OO",[0,1]);
            }
            else if (arity === 3) {
                att(types[0]+types[1]+types[2],[0,1,2]);
                att("_OOO",[0,1,2]);
            }
        }
    
        // **************** 
        // This section creates a map of the control flow of the program.
        // The map is put into a variable called "map".
        // Each item in map is:
		// {type: "literal", value: 123}
		// {type: "command", value: "l"}
		// {type: "conditional", value: "=", jump: 4}
		// {type: "jump", else: 6, cond: true}
		// {type: "else", end: 9}
		// {type: "while", end: 9}
		// {type: "for", value: [1,2,3], index: 0, end: 9}
		// {type: "endloop", start: 5}
    
        let tokens = code.match(/\d*\.\d+|\d+|[.Dd](?:.|$)|"(?:`.|[^"])*"|'([gimtxd]*')?(?:`.|[^'])*'|`.|./g)||[];
        console.log("tokens:",tokens);
        let controls = /^[OWz!<=>]$/, indices = [], map = [], i, t, level;
        for (i = 0; i < tokens.length; i++) {
            t = tokens[i];
            if (/^"/.test(t)) map.push({ type: "literal", value: eval(t) });
            else if (/^`/.test(t)) map.push({ type: "literal", value: Char(t[1]) });
            else if (/^\.?\d/.test(t)) map.push({ type: "literal", value: Big(t) });
            else if (/^'/.test(t)) throw new TypeError("Can't handle regex yet :(");
            else if (/^[<=>!z]$/.test(t)) {
                indices.push(map.length);
                map.push({ type: "conditional", value: t, jump: -1 });
            }
            else if (t === "W") {
                indices.push(map.length);
                map.push({ type: "while", end: -1 });
            }
            else if (t === "O") {
                indices.push(map.length);
                map.push({ type: "for", end: -1, value: null, index: null });
            }
            else if (t === "?") {
                map[indices.last].jump = map.length;
				map.push({ type: "jump", else: -1, cond: null });
            }
            else if (t === "{") {
				if (map[indices.last].jump < 0) {
					map[indices.last].jump = indices.last + 1;
					map.splice(indices.last + 1, 0, { type: "jump", else: -1, cond: null });
				}
				map.push({ type: "else", end: -1 });
				map[map[indices.last].jump].else = map.length;
            }
            else if (t === "}") {
				if (map[indices.last].type === "while" || map[indices.last].type === "for") {
					map.push({ type: "endloop", start: indices.last });
					map[indices.last].end = map.length;
					indices.pop();
				} else {
					if (map[indices.last].jump < 0) {
						map[indices.last].jump = indices.last + 1;
						map.splice(indices.last + 1, 0, { type: "jump", else: -1, cond: null });
					}
					if (map[map[indices.last].jump].else < 0) {
						map[map[indices.last].jump].else = map.length;
					} else {
						map[map[map[indices.last].jump].else - 1].end = map.length;
					}
					indices.pop();
				}
            }
			else map.push({ type: "command", value: t });
			
			if (i + 1 === tokens.length && indices.length)
				tokens.push("}");
        }
        console.log("map:", map);
		
		for (i = 0; i < map.length; i++) {
			t = map[i];
			// console.log("Executing index", i, "which is", t);
			if (t.type === "literal") {
				state.stack.unshift(t.value);
			}
			else if (t.type === "command") {
				c(t.value);
			}
			else if (t.type === "conditional") {
				var result;
				if (t.value === "z") result = truthy(state.stack[0]);
				else if (t.value === "!") result = falsy(state.stack[0]);
				else if (t.value === "=") result = 1 in state.stack && equal(state.stack[0], state.stack[1]);
				map[t.jump].cond = result;
			}
			else if (t.type === "jump") {
				if (!t.cond) i = t.else - 1;
			}
			else if (t.type === "else") {
				i = t.end - 1;
			}
			else if (t.type === "while") {
				if (falsy(state.stack[0])) i = t.end - 1;
			}
			else if (t.type === "for") {
				if (t.index === null) {
					t.index = 0;
					t.value = state.stack.shift();
				}
				else t.index++;
				if (ty(t.value) === "N" ? t.value.cmp(t.index) === 1 : t.index < t.value.length) {
					state.stack.unshift(ty(t.value) === "N" ? Big(t.index) : t.value[t.index]);
				} else {
					t.value = null;
					t.index = null;
					i = t.end - 1;
				}
			}
			else if (t.type === "endloop") {
				i = t.start - 1;
			}
		}
        
        console.log("stack:", prettyprint(state.stack));
        
        return state;
    }
};
