#!/usr/bin/env node

let interpreter = require('../lib/interpreter');
let Num = require('big.js');
let Char = require('../lib/structures/Char');
let Canvas = require('../lib/structures/Canvas');

process.stdout.write(interpreter.run('O"^ vj"\\CynIq', '', ['"^^^^^^^kkkjjjvvvvvv"'], 0).canvas.render());
