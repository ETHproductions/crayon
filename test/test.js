#!/usr/bin/env node

let interpreter = require('../lib/interpreter');
let Big = require('bignumber.js');
let Char = require('../lib/structures/Char');
let Canvas = require('../lib/structures/Canvas');

process.stdout.write(interpreter.run('O"^ v▼"\\CynIq', '', ['"^^▲^v▼▲^^v"'], 0).canvas.render());
