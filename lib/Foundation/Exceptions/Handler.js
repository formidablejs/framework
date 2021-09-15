const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$handleExceptionφ = require('./Handler/handleException'/*$path$*/);

class Handler {
	[Ψ__init__]($$ = null){
		this.config = $$ ? $$.config : undefined;
		
	}
	constructor(config){
		this[Ψ__init__]();
		this.config = config;
		
		_$handleExceptionφ.setConfig(this.config);
	}
	
	handle(error,request,reply){
		
		return _$handleExceptionφ.handleException(error,request,reply);
	}
};
exports.default = Handler;
