#!/usr/bin/env node

let Canvas = require('../lib/structures/Canvas');
let expect = require('chai').expect;

describe("new Canvas('abc\\nd\\n   ef\\n\\n\\n g')", function () {
	let canvas = new Canvas("abc\nd\n   ef\n\n\n g");
    it('should render() properly', function () {
        expect(canvas.render()).to.equal("abc  \nd    \n   ef\n     \n     \n g   ");
    });
    
    it('should setChar() properly', function () {
        canvas.setChar(1, 1, 'q');
        expect(canvas.render()).to.equal("abc  \ndq   \n   ef\n     \n     \n g   ")
    });
    
    it('should setChar() properly for negative coordinates', function () {
        canvas.setChar(-1, -1, 'z');
        expect(canvas.render()).to.equal("z     \n abc  \n dq   \n    ef\n      \n      \n  g   ")
    });
});

//canvas = new Canvas();
describe("new Canvas()", function () {
	let canvas = new Canvas();
	it('should be empty', function () {
		expect(canvas.render()).to.equal("");
	});
	
	it('should draw a string properly', function () {
		canvas.writeString("Hello, world!");
		expect(canvas.render()).to.equal("Hello, world!");
	});
	
	it('should draw a newline properly', function () {
		canvas.crayon.moveTo(0, 0);
		canvas.writeString("abc\nBye");
		expect(canvas.render()).to.equal("abclo, world!\nBye          ");
	});
	
	it('should turn the crayon properly', function () {
		canvas.crayon.moveTo(0, -1);
		canvas.crayon.rotateTo(1);
		canvas.writeString("123");
		expect(canvas.render()).to.equal("1bclo, world!\nB2e          \n  3          ");
	});
	
});
