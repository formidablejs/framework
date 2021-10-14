function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isArrayφ = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var _$HttpExceptionφ = requireDefault$__(require('../../Http/Exceptions/HttpException'/*$path$*/));
var _$handleExceptionφ = require('./Handler/handleException'/*$path$*/);
class Handler {
	[Ψ__init__]($$ = null){
		this.config = $$ ? $$.config : undefined;
		
	}
	get dontReport(){
		
		return [
			_$HttpExceptionφ.default
		];
	}
	
	/**
	@param {Repository} config
	*/
	constructor(config){
		this[Ψ__init__]();
		this.config = config;
		
		_$handleExceptionφ.setConfig(this.config);
	}
	
	/**
	@param {Error|ApplicationException|HttpException} error
	@param {FormRequest} request
	@param {FastifyReply} reply
	*/
	handle(error,request,reply){
		
		return _$handleExceptionφ.handleException(error,request,reply,false,this.shouldReport(error));
	}
	
	/**
	@param {Error} error
	*/
	shouldReport(error){
		
		if (!(_$isEmptyφ.default(this.dontReport)) && _$isArrayφ.default(this.dontReport)) {
			
			for (let iφ = 0, itemsφ = iter$__(this.dontReport), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
				let exception = itemsφ[iφ];
				if (error instanceof exception) { return false };
			};
		};
		
		return true;
	}
};
exports.default = Handler;
