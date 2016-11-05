export default class CrayonFuncData {
    constructor({
        arity = 1
    } = {}) {
        this.arity = arity;
    }

    static UNARY = new CrayonFuncData({ arity: 1 });
    static BINARY = new CrayonFuncData({ arity: 2 });
    static TRINARY = new CrayonFuncData({ arity: 3 });
}
