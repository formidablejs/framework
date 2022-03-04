function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Foundation/Exceptions/ExitHandlerException'/*$path$*/));
var $2 = requireDefault$__(require('./Error/InvalidExitFunction'/*$path$*/));
var $3 = requireDefault$__(require('./isFunction'/*$path$*/));

function die(handler){
	
	if (!((handler.constructor.name === 'AsyncFunction' || $3.default(handler)))) {
		
		throw new $2.default('Handler must be a valid function.');
	};
	
	throw new $1.default(handler);
};
exports.default = die;
