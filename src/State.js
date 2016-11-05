import CrayonCrayon from './Crayon';
import CrayonCanvas from './Canvas';

export default class CrayonState {
    constructor({
        crayon = new CrayonCrayon(),
        canvas = new CrayonCanvas(),
        stack = []
    } = {}) {
        this.crayon = crayon;
        this.canvas = canvas;
        this.stack = stack;
    }
}
