Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$HigherOrderTapProxyφ = require('../HigherOrderTapProxy'/*$path$*/);
var mod$φ = require('./'/*$path$*/);
var mod$φ2 = require('./'/*$path$*/);

function tap(object,callback){
	
	if (!(mod$φ.isEmpty(callback))) {
		
		if (!(mod$φ2.isFunction(callback))) { throw TypeError('Expected a valid function.') };
		
		callback(object);
		
		return object;
	};
	
	return new _$HigherOrderTapProxyφ.HigherOrderTapProxy(object);
};
exports.tap = tap;
