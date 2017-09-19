#!/usr/bin/env node

let interpreter = require('../lib/interpreter');
let Big = require('bignumber.js');
let Char = require('../lib/structures/Char');
let Canvas = require('../lib/structures/Canvas');
let Instruction = require('../lib/structures/Instruction');
let Program = require('../lib/structures/Program');

var state = interpreter.run('3=;?]{A}', "", [5], true);
process.stdout.write(state.canvas.render());
