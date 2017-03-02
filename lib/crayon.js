#!/usr/bin/env node


'use strict';

console.log(process.argv);

var interpreter = require('./interpreter');

var fs = require("fs");

var flags = [],
    args = [];

for (var i = 2; i < process.argv.length; ++i) {
	var item = process.argv[i];
	if (/^-/.test(item)) {
		flags.push(item);
	} else args.push(item);
}

if (0 in args) {
	fs.readFile(args[0], function (err1, data1) {
		if (err1) {
			return console.log(err1);
		}var code = data1.toString('utf8'); // TODO: allow different encodings via flags
		if (1 in args) {
			fs.readFile(args[1], function (err2, data2) {
				if (err2) {
					return console.log(err2);
				}var input = data2.toString('utf8');
				interpreter.run(code, input);
			});
		} else interpreter.run(code);
	});
} else {
	console.log("Usage: node ./index.js <code file>[ <input file>]");
}