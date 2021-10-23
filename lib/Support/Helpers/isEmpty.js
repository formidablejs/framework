function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isObjectφ = requireDefault$__(require('./isObject'/*$path$*/));
var _$isArrayφ = requireDefault$__(require('./isArray'/*$path$*/));
var _$isBooleanφ = requireDefault$__(require('./isBoolean'/*$path$*/));
var _$isStringφ = requireDefault$__(require('./isString'/*$path$*/));

/**
@param {any} value
*/
function isEmpty(value){
	
	if (value === null || value === undefined) {
		
		return true;
	};
	
	if (_$isStringφ.default(value) && value.trim() === '') {
		
		return true;
	};
	
	if (_$isBooleanφ.default(value) && value === false) {
		
		return true;
	};
	
	if (!((isNaN(value))) && Number(value) === 0) {
		
		return true;
	};
	
	if (_$isArrayφ.default(value) && value.length === 0) {
		
		return true;
	};
	
	if (_$isObjectφ.default(value) && Object.keys(value).length === 0) {
		
		return true;
	};
	
	return false;
};
exports.default = isEmpty;
