#!/usr/bin/env node

let interpreter = require('./interpreter');

let fs = require("fs");

(function(){
'use strict';

let usage = `
Usage: crayon f <file> [input]          Reads and executes the Crayon program stored
                                        in the specified file, using the UTF-8 encoding.

       crayon fi <file> <file> [input]  Reads and executes the Crayon program stored
                                        in the first file, using the second file as STDIN.
                                        Both files are read with the UTF-8 encoding.

       crayon e <code> [input]          Reads and executes the first argument as a Crayon
                                        program.

       crayon ei <code> <file> [input]  Reads and executes the first argument as a Crayon
                                        program, reading the second file with the UTF-8
                                        encoding and using it as STDIN.

      Append a \`d\` to the flag list to output debug info.
`.slice(1, -1);

if (process.argv.length < 3) {
	console.log(usage);
	return;
}

let args = process.argv.slice(2),
	readcode = null,
	readinput = false,
	debug = false;

for (let char of args.shift() || "") {
	if (char === "f") readcode = true;
	else if (char === "e") readcode = false;
	else if (char === "i") readinput = true;
	else if (char === "d") debug = true;
	else {
		console.log(usage);
		return;
	}
}

let code = args.shift(),
	input = "";

if (readcode === null) {
	console.log(usage);
	return;
}

if (readcode) try { code = fs.readFileSync(code).toString().replace(/\r\n/g, "\n"); } catch(e) { console.log('Error: Could not find file at', code); return; }
if (readinput) try { input = fs.readFileSync(args.shift()).toString().replace(/\r\n/g, "\n"); } catch(e) { console.log('Error: Could not find file at', code); return; }

process.stdout.write(interpreter.run(code, input, args, debug).canvas.render());
})();

module.exports = interpreter;
