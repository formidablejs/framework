function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../../Http/Exceptions/ForbiddenException'/*$path$*/));

class TokenMismatchException extends $1.default {};
exports.default = TokenMismatchException;
