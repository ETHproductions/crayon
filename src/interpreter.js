/* jshint -W061 */
/* jshint -W093 */

'use strict';

let CrayonCanvas = require('./structures/Canvas');
let CrayonState = require('./structures/State');
let Char = require('./structures/Char');
let behaviors = require('./behaviors');
let Big = require('big.js');

function ty(a) {
    if (a.constructor === Array) return "A";
    if (a.constructor === Big) return "N";
    if (a.constructor === Char) return "C";
    if (a.constructor === RegExp) return "R";
    if (a.constructor === String) return "S";
    console.log("What is it?", JSON.stringify(a));
}

function prettyprint(a) {
    if (ty(a) === "A")
        return "[ " + a.map(prettyprint).join(", ") + " ]";
    if (ty(a) === "N")
        return a.toString();
    return '"' + a.replace(/\\|"/g, "\\$&") + '"';
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
            
            for (var args = [], i = arity; i > 0; i--) args.push(state.stack.shift());
            
            let success = false;
            function att(f, a) {
                if (success) return;
                let news = [];
                for (i = 0; i < a.length; i++)
                    news.push(args[a[i]]);
                if (typeof funcs[f] === "function") {
                    success = true;
                    funcs[f].call(null, state, ...args);
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
        // Each item in map is 
    
        let tokens = code.match(/\d*\.\d+|\d+|[.Dd](?:.|$)|"(?:`.|[^"])*"|'([gimtxd]*')?(?:`.|[^'])*'|`.|./g)||[];
        console.log("tokens:",tokens);
        let controls = /^[OWz!<=>]$/, indices = [], map = [], i, t, level;
        for (i = 0; i < tokens.length; i++) {
            t = tokens[i];
            if (/"|\d|`/.test(t)) ;
            else if (controls.test(t)) {
                indices.push(i);
                map[i] = [tokens.length,i,i];
            }
            else if (t === "?") {
                map[indices.last][2] = i;
            }
            else if (t === "{") {
                map[indices.last][1] = i;
            }
            else if (t === "}") {
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
    
        let nexts = [], currs = [], Oitem, Oindex, Ojtem, Ojndex;
        for (i = 0, level = 0; i < tokens.length; i++) {
            t = tokens[i];

            if (nexts.length && i === nexts.last[2]) ;
            else if (/^["'`0-9]/.test(t)) state.stack.unshift(t[0] === "`" ? t[1] : t[0] === "'" ? eval("/(?:)/") : t[0] === '"' ? eval(t.replace(/`(.)/g, "\\$&")) : Big(t));
            else if (controls.test(t)) {
                nexts.push(map[i]);
                if (t === "O") ;
                else if (t === "!") currs.push( !state.stack[0] || state.stack[0].length === 0);
                else if (t === "z") currs.push(!!state.stack[0] && state.stack[0].length !== 0);
                else if (t === "=") currs.push(2 in state.stack && state.stack[0].toString() === state.stack[1].toString() && ty(state.stack[0]) === ty(state.stack[1]));
            }
            else if (t === "{") i = nexts.pop()[0];
            else if (t === "}") {
                if (currs.last === "O") ;
                else if (currs.last === "W") if (state.stack[0]) i = nexts.last[2];
            }
            else c(t);
        
            if (nexts.length && i === nexts.last[2]) {
                if (!currs.last) i = nexts.last[1] || nexts.last[0];
            }
        }
        
        console.log("stack:", prettyprint(state.stack));
        
        return state;
    }
};
