function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));

/**
@param {any} value
*/
function encrypt(value,serialize = false){
	
	return $1.default.encrypt(value,serialize);
};
exports.default = encrypt;
