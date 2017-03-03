#!/usr/bin/env node


'use strict';

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

var codefile = args.shift(),
    inputfile = void 0;
if (/^[^\d"'\[]/.test(args[0])) {
	inputfile = args.shift();
}if (codefile) {
	fs.readFile(codefile, function (err1, data1) {
		if (err1) {
			return console.error(err1);
		}var code = data1.toString('utf8'); // TODO: allow different encodings via flags
		if (inputfile) {
			fs.readFile(inputfile, function (err2, data2) {
				if (err2) {
					return console.error(err2);
				}var input = data2.toString('utf8');
				process.stdout.write(interpreter.run(code, input, args, /d/.test(flags)).canvas.render());
			});
		} else process.stdout.write(interpreter.run(code, "", args, /d/.test(flags)).canvas.render());
	});
} else {
	console.log("Usage: crayon <code file>[ <input file>][ <arg1>[ <arg2> ...]]");
}