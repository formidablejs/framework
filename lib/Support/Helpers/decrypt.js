function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Encrypterφ = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));

/**
@param {String} hash
*/
function decrypt(hash,unserialize = false){
	
	return _$Encrypterφ.default.decrypt(hash,unserialize);
};
exports.default = decrypt;
