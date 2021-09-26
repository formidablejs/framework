function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$ApplicationExceptionφ = requireDefault$__(require('./ApplicationException'/*$path$*/));

class UnserializedEncryptValueException extends _$ApplicationExceptionφ.default {};
exports.default = UnserializedEncryptValueException;
