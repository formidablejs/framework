const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__'), Ψ__init__ = Symbol.for('#__init__');
var φ = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class BooleanCastError extends Error {
	static [Ψ__init__](){
		this.prototype[Ψ__initor__] = φ;
		return this;
	}
	/**
	@param {string} message
	*/
	constructor(message){
		
		super(message);
		
		this.message = message;
		
		this.name = 'BooleanCastError';
		this[Ψ__initor__]===φ && this[Ψ__inited__] && this[Ψ__inited__]();
	}
};
exports.default = BooleanCastError; BooleanCastError[Ψ__init__]();
