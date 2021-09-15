function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$ForbiddenExceptionφ = requireDefault$__(require('../../../Http/Exceptions/ForbiddenException'/*$path$*/));

class TokenMismatchException extends _$ForbiddenExceptionφ.default {};
exports.default = TokenMismatchException;
