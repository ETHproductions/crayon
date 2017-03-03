#!/usr/bin/env node

let interpreter = require('../lib/interpreter');
let Num = require('big.js');
let Char = require('../lib/structures/Char');
let Canvas = require('../lib/structures/Canvas');

interpreter.run('"abc"Oi)*}', '', [], true);
