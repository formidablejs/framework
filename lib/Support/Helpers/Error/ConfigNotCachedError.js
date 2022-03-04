const $4 = Symbol.for('#__initor__'), $5 = Symbol.for('#__inited__'), $1 = Symbol.for('#__hooks__'), $3 = Symbol.for('#__init__');
var $2 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class ConfigNotCachedError extends Error {
	static [$3](){
		this.prototype[$4] = $2;
		return this;
	}
	/**
	@param {string} message
	*/
	constructor(message = 'Config is not cached'){
		
		super(message);
		
		this.name = 'ConfigNotCachedError';
		this[$4]===$2 && (this[$1]&&this[$1].inited(this),this[$5] && this[$5]());
	}
};
exports.default = ConfigNotCachedError; ConfigNotCachedError[$3]();
