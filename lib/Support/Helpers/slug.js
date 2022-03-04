function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./isString'/*$path$*/));

/**
@param {string} value
@param {string} separator
*/
function slug(value,separator = '-'){
	
	if (!($1.default(value))) {
		
		throw new TypeError('value must be a string');
	};
	
	if (!($1.default(separator))) {
		
		throw new TypeError('separator must be a string');
	};
	
	return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,separator);
};
exports.default = slug;
