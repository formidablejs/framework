function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isObjectφ = requireDefault$__(require('./isObject'/*$path$*/));
var _$isStringφ = requireDefault$__(require('./isString'/*$path$*/));

/**
@param {Object} object
@param {string} key
*/
function dotNotation(object,key){
	
	if (!(_$isObjectφ.default(object))) {
		
		throw new TypeError('Expected object');
	};
	
	if (!(_$isStringφ.default(key))) {
		
		throw new TypeError('Expected string');
	};
	
	const results = key.split('.').reduce(function(o,i) {
		
		return o ? ((o[i] != null) ? o[i] : null) : null;
	},object);
	
	return results;
};
exports.default = dotNotation;
