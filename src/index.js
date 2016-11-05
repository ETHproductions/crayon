#!/usr/bin/env node

import CrayonCanvas from './Canvas';
import CrayonState from './State';
import behaviors from './behaviors';

var canvas = new CrayonCanvas("abc\ndef\n ijk\n\n\n\nt");
canvas.setChar(-1, -1, "q");
console.log(canvas.render());

var state = new CrayonState({stack: [3, "abc"]});
behaviors.get("*").behavior._SN(state, state.stack.pop(), state.stack.pop());
console.log(state);
