function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Encrypterφ = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));

/**
@param {any} value
*/
function encrypt(value,serialize = false){
	
	return _$Encrypterφ.default.encrypt(value,serialize);
};
exports.default = encrypt;
