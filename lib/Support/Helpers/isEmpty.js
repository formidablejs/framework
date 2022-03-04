function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./isObject'/*$path$*/));
var $2 = requireDefault$__(require('./isArray'/*$path$*/));
var $3 = requireDefault$__(require('./isBoolean'/*$path$*/));
var $4 = requireDefault$__(require('./isString'/*$path$*/));

/**
@param {any} value
*/
function isEmpty(value){
	
	if (value === null || value === undefined) {
		
		return true;
	};
	
	if ($4.default(value) && value.trim() === '') {
		
		return true;
	};
	
	if ($3.default(value) && value === false) {
		
		return true;
	};
	
	if (!((isNaN(value))) && Number(value) === 0) {
		
		return true;
	};
	
	if ($2.default(value) && value.length === 0) {
		
		return true;
	};
	
	if ($1.default(value) && Object.keys(value).length === 0) {
		
		return true;
	};
	
	return false;
};
exports.default = isEmpty;
