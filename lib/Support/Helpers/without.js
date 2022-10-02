function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./isArray'/*$path$*/));
var $2 = requireDefault$__(require('./isObject'/*$path$*/));

/**
@param {object} object
@param {string[]} exclude
*/
function without(object,exclude){
	
	if (!($2.default(object))) { throw new TypeError('Expected object') };
	
	if (!($1.default(exclude))) { throw new TypeError('Expected array') };
	
	const output = {};
	
	Object.keys(object).forEach(function(key) {
		
		if (!(exclude.includes(key))) { return Object.assign(output,{
			[key]: object[key]
		}) };
	});
	
	return output;
};
exports.default = without;
