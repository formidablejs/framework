function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));

/**
@param {string} hash
*/
function decrypt(hash,unserialize = false){
	
	return $1.default.decrypt(hash,unserialize);
};
exports.default = decrypt;
