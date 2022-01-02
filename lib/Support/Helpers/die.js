function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$ExitHandlerExceptionφ = requireDefault$__(require('../../Foundation/Exceptions/ExitHandlerException'/*$path$*/));
var _$InvalidExitFunctionφ = requireDefault$__(require('./Error/InvalidExitFunction'/*$path$*/));
var _$isFunctionφ = requireDefault$__(require('./isFunction'/*$path$*/));

function die(handler){
	
	if (!((handler.constructor.name === 'AsyncFunction' || _$isFunctionφ.default(handler)))) {
		
		throw new _$InvalidExitFunctionφ.default('Handler must be a valid function.');
	};
	
	throw new _$ExitHandlerExceptionφ.default(handler);
};
exports.default = die;
