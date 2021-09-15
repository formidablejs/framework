function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isNumberφ = requireDefault$__(require('./isNumber'/*$path$*/));
var _$cryptoφ = requireDefault$__(require('crypto'/*$path$*/));

/**
@param {Number} length
*/
function strRandom(length = 8){
	
	if (!(_$isNumberφ.default(length))) {
		
		throw new TypeError('length must be a number');
	};
	
	if (length % 2 !== 0) {
		
		throw new RangeError('length must be an even number');
	};
	
	return _$cryptoφ.default.randomBytes(length / 2).toString('hex');
};
exports.default = strRandom;
