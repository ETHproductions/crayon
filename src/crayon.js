#!/usr/bin/env node

'use strict';

let interpreter = require('./interpreter');

let fs = require("fs");

let flags = [],
	args = [];

for (let i = 2; i < process.argv.length; ++i) {
	let item = process.argv[i];
	if (/^-/.test(item))
		flags.push(item);
	else
		args.push(item);
}

let codefile = args.shift(), inputfile;
if (/^[^\d"'\[]/.test(args[0])) inputfile = args.shift();

if (codefile) fs.readFile(codefile, function (err1, data1) {
	if (err1) return console.error(err1);
	let code = data1.toString('utf8').replace(/\r\n/g, "\n"); // TODO: allow different encodings via flags
	if (inputfile) fs.readFile(inputfile, function (err2, data2) {
		if (err2) return console.error(err2);
		let input = data2.toString('utf8').replace(/\r\n/g, "\n");
		process.stdout.write(interpreter.run(code, input, args, /d/.test(flags)).canvas.render());
	});
	else process.stdout.write(interpreter.run(code, "", args, /d/.test(flags)).canvas.render());
});
else {
	console.log("Usage: crayon <code file>[ <input file>][ <arg1>[ <arg2> ...]]");
}