function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isStringφ = requireDefault$__(require('./isString'/*$path$*/));
var _$BooleanCastErrorφ = requireDefault$__(require('./Error/BooleanCastError'/*$path$*/));

function toBoolean(value){
	
	if (typeof value === 'boolean') {
		
		return value;
	};
	
	if (typeof value === 'number') {
		
		return Boolean(value);
	};
	
	if (_$isStringφ.default(value) && (
		
		value.split().includes('0') || value.split().includes('1')
	)) {
		
		return Boolean(value);
	};
	
	if (!(_$isStringφ.default(value))) {
		
		throw new _$BooleanCastErrorφ.default(("Can't convert " + value + " to boolean."));
	};
	
	return JSON.parse(value.toLowerCase());
};
exports.default = toBoolean;
