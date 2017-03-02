#!/usr/bin/env node

let Canvas = require('../lib/structures/Canvas');
let expect = require('chai').expect;

let canvas = new Canvas("abc\nd\n   ef\n\n\n g");
describe("Canvas('abc\\nd\\n   ef\\n\\n\\n g')", function () {
    it('should render() properly', function () {
        expect(canvas.render()).to.equal("abc  \nd    \n   ef\n     \n     \n g   \n");
    });
    
    it('should setChar() properly', function () {
        canvas.setChar(1, 1, 'q');
        expect(canvas.render()).to.equal("abc  \ndq   \n   ef\n     \n     \n g   \n")
    })
    
    it('should setChar() properly for negative coordinates', function () {
        canvas.setChar(-1, -1, 'z');
        expect(canvas.render()).to.equal("z     \n abc  \n dq   \n    ef\n      \n      \n  g   \n")
    })
});
