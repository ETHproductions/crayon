#!/usr/bin/env node

let Char = require('../lib/structures/Char');
let expect = require('chai').expect;

let char = new Char("a");
describe("Char('a')", function () {
    it('should have a type of "C"', function () {
        expect(char.type).to.equal("C");
    });
    it('should have .data of "a"', function () {
        expect(char.data).to.equal("a");
    });
    it('should have .toString() of "a"', function () {
        expect(char.toString()).to.equal("a");
    });
    it('should have .charCodeAt(0) of 97', function () {
        expect(char.charCodeAt(0)).to.equal(97);
    });
    it('should have .code of 97', function () {
        expect(char.code).to.equal(97);
    });
    
    it('should be customizable through .code', function () {
        char.code = 100;
        expect(char.data).to.equal("d");
    });
});
