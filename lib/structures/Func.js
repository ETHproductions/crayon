'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function CrayonFunc(arity, behavior) {
	_classCallCheck(this, CrayonFunc);

	this.arity = arity;
	this.behavior = behavior;
};