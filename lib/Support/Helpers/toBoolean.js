function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./isString'/*$path$*/));
var $2 = requireDefault$__(require('./Error/BooleanCastError'/*$path$*/));

function toBoolean(value){
	
	if (typeof value === 'boolean') {
		
		return value;
	};
	
	if (typeof value === 'number') {
		
		return Boolean(value);
	};
	
	if ($1.default(value) && (
		
		value.split().includes('0') || value.split().includes('1')
	)) {
		
		return Boolean(value);
	};
	
	if (!($1.default(value))) {
		
		throw new $2.default(("Can't convert " + value + " to boolean."));
	};
	
	return JSON.parse(value.toLowerCase());
};
exports.default = toBoolean;
