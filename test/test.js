#!/usr/bin/env node

let interpreter = require('../lib/interpreter');
let Num = require('big.js');
let Char = require('../lib/structures/Char');

interpreter.run('"abc"O5*}');
