function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./ApplicationException'/*$path$*/));

class InvalidAppKeyException extends $1.default {};
exports.default = InvalidAppKeyException;
