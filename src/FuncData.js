export default class CrayonFuncData {
    constructor({
        arity = 1
    } = {}) {
        this.arity = arity;
    }

    static NULLARY = new CrayonFuncData({ arity: 0 });
    static UNARY = new CrayonFuncData({ arity: 1 });
    static BINARY = new CrayonFuncData({ arity: 2 });
    static TERNARY = new CrayonFuncData({ arity: 3 });
}
