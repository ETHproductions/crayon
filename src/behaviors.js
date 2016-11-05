import CrayonFunc from './Func';
import CrayonFuncData from './FuncData';

export default new Map([
    ['•', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = 0; } })],
    ['→', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = 0; } })],
    ['↘', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = 1; } })],
    ['↓', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = 2; } })],
    ['↙', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = 3; } })],
    ['←', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = 4; } })],
    ['↖', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = 5; } })],
    ['↑', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = 6; } })],
    ['↗', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = 7; } })],
    ['⤸', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = (state.crayon.dir + 1) % 8; } })],
    ['⤵', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = (state.crayon.dir + 2) % 8; } })],
    ['↷', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = (state.crayon.dir + 3) % 8; } })],
    ['⟲', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = (state.crayon.dir + 4) % 8; } })],
    ['↶', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = (state.crayon.dir + 5) % 8; } })],
    ['⤷', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = (state.crayon.dir + 6) % 8; } })],
    ['⤹', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.crayon.dir = (state.crayon.dir + 7) % 8; } })],
    ['E', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.stack.push(state.input); state.input = ""; } })],
    ['L', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.stack.push((state.input.match(/.+/) || [""])[0]); state.input = state.input.replace(/^.+\n?/, ""); } })],
    ['T', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.stack.push((state.input.match(/\S+/) || [""])[0]); state.input = state.input.replace(/^\S+\s?/, ""); } })],
    ['Z', new CrayonFunc(CrayonFuncData.NULLARY, { _: function(state){ state.stack.push((state.input.match(/^[^]+?(?=\n\n|\n$|$)/)||"")[0]); state.input = state.input.replace(/^[^]+?(\n\n|\n$|$)/,""); } })],
    ['l', new CrayonFunc(CrayonFuncData.UNARY, {
		N: function(state, n){ state.stack.push(n); },
		O: function(state, x){ state.stack.push(x.length); }
	})],
    ['*', new CrayonFunc(CrayonFuncData.BINARY, {
		 NN: function(state, x, y){ state.stack.push(x * y); },
		_SN: function(state, s, n){ state.stack.push(s.repeat(n)); },
		_SA: function(state, s, a){ state.stack.push(a.join(s)); }
	})]
]);
