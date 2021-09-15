function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isArrayφ = requireDefault$__(require('./isArray'/*$path$*/));
var _$isObjectφ = requireDefault$__(require('./isObject'/*$path$*/));

/**
@param {Object} object
@param {string[]} exclude
*/
function without(object,exclude){
	
	if (!(_$isObjectφ.default(object))) { throw new TypeError('Expected object') };
	
	if (!(_$isArrayφ.default(exclude))) { throw new TypeError('Expected array') };
	
	const output = {};
	
	Object.keys(object).forEach(function(key) {
		
		if (!(exclude.includes(key))) { return Object.assign(output,{
			[key]: object[key]
		}) };
	});
	
	return output;
};
exports.default = without;
