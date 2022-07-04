const $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__'), $__init__$ = Symbol.for('#__init__');
var $1 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class ConfigNotCachedError extends Error {
	static [$__init__$](){
		this.prototype[$__initor__$] = $1;
		return this;
	}
	/**
	@param {string} message
	*/
	constructor(message = 'Config is not cached'){
		
		super(message);
		
		this.name = 'ConfigNotCachedError';
		this[$__initor__$]===$1 && (this[$__hooks__$]&&this[$__hooks__$].inited(this),this[$__inited__$] && this[$__inited__$]());
	}
};
exports.default = ConfigNotCachedError; ConfigNotCachedError[$__init__$]();
