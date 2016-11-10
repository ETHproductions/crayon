'use strict';

let CrayonCrayon = require('./Crayon');
let CrayonCanvas = require('./Canvas');

module.exports = class CrayonState {
    constructor({
        crayon = new CrayonCrayon(),
        canvas = new CrayonCanvas(),
        stack = []
    } = {}) {
        this.crayon = crayon;
        this.canvas = canvas;
        this.rstack = stack;
        this.stack = stack;
    }
}
