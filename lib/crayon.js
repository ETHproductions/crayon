#!/usr/bin/env node
'use strict';

(function () {
	'use strict';

	var interpreter = require('./interpreter');

	var fs = require("fs");

	var usage = '\nUsage: crayon f <file> [input]          Reads and executes the Crayon program stored\n                                        in the specified file, using the UTF-8 encoding.\n\n       crayon fi <file> <file> [input]  Reads and executes the Crayon program stored\n                                        in the first file, using the second file as STDIN.\n                                        Both files are read with the UTF-8 encoding.\n\n       crayon e <code> [input]          Reads and executes the first argument as a Crayon\n                                        program.\n\n       crayon ei <code> <file> [input]  Reads and executes the first argument as a Crayon\n                                        program, reading the second file with the UTF-8\n                                        encoding and using it as STDIN.\n\n      Append a `d` to the flag list to output debug info.\n'.slice(1, -1);

	if (process.argv.length < 3) {
		console.log(usage);
		return;
	}

	var args = process.argv.slice(2),
	    readcode = null,
	    readinput = false,
	    debug = false;

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = (args.shift() || "")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var char = _step.value;

			if (char === "f") {
				readcode = true;
			} else if (char === "e") {
				readcode = false;
			} else if (char === "i") {
				readinput = true;
			} else if (char === "d") {
				debug = true;
			} else {
				console.log(usage);
				return;
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var code = args.shift(),
	    input = "";

	if (readcode === null) {
		console.log(usage);
		return;
	}

	if (readcode) {
		try {
			code = fs.readFileSync(code).toString().replace(/\r\n/g, "\n");
		} catch (e) {
			console.log('Could not find file at', code);return;
		}
	}if (readinput) {
		try {
			input = fs.readFileSync(args.shift()).toString().replace(/\r\n/g, "\n");
		} catch (e) {
			console.log('Could not find file at', code);return;
		}
	}process.stdout.write(interpreter.run(code, input, args, debug).canvas.render());
})();