function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./isObject'/*$path$*/));
var $2 = requireDefault$__(require('./isString'/*$path$*/));

/**
@param {object} object
@param {string} key
*/
function dotNotation(object,key){
	
	if (!($1.default(object))) {
		
		throw new TypeError('Expected object');
	};
	
	if (!($2.default(key))) {
		
		throw new TypeError('Expected string');
	};
	
	const results = key.split('.').reduce(function(o,i) {
		
		return o ? ((o[i] != null) ? o[i] : null) : null;
	},object);
	
	return results;
};
exports.default = dotNotation;
