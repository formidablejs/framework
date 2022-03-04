function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./isString'/*$path$*/));

/**
@param {string} value
@param {string} match
*/
function wildcard(value,match){
	
	if (!($1.default(value))) {
		
		throw new TypeError('value must be a string');
	};
	
	if (!($1.default(match))) {
		
		throw new TypeError('match must be a string');
	};
	
	const escapeRegex = function(value) { return value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1"); };
	
	return new RegExp("^" + match.split("*").map(escapeRegex).join(".*") + "$").test(value);
};
exports.default = wildcard;
