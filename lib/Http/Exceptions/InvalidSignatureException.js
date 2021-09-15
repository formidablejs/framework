function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$ForbiddenExceptionφ = requireDefault$__(require('./ForbiddenException'/*$path$*/));

class InvalidSignatureException extends _$ForbiddenExceptionφ.default {};
exports.default = InvalidSignatureException;
