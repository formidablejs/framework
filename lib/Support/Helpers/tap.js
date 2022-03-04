Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../HigherOrderTapProxy'/*$path$*/);
var $2 = require('./'/*$path$*/);
var $3 = require('./'/*$path$*/);

function tap(object,callback){
	
	if (!($2.isEmpty(callback))) {
		
		if (!($3.isFunction(callback))) { throw TypeError('Expected a valid function.') };
		
		callback(object);
		
		return object;
	};
	
	return new $1.HigherOrderTapProxy(object);
};
exports.default = tap;
