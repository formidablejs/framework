function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Http/Kernel/resolveResponse'/*$path$*/));
var $2 = requireDefault$__(require('./ExitHandlerException'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var $4 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $5 = requireDefault$__(require('../../Http/Exceptions/HttpException'/*$path$*/));
var $6 = require('./Handler/handleException'/*$path$*/);
class Handler {
	[$__patch__$]($$ = {}){
		var $7;
		($7 = $$.config) !== undefined && (this.config = $7);
		
	}
	[$__init__$]($$ = null,deep = true){
		this.config = $$ ? $$.config : undefined;
		
	}
	get dontReport(){
		
		return [
			$5.default
		];
	}
	
	/**
	@param {Repository} config
	*/
	constructor(config){
		this[$__init__$]();
		this.config = config;
		
		$6.setConfig(this.config);
	}
	
	/**
	@param {Error|ApplicationException|HttpException} error
	@param {FormRequest} request
	@param {FastifyReply} reply
	*/
	async beforeHandle(error,request,reply){
		
		const resutls = this.handle(error,request,reply,this.shouldReport(error));
		
		if (!($4.default(resutls))) {
			
			return $1.default(resutls,request,reply,true);
		} else if (error instanceof $2.default) {
			
			let handler;
			
			if (error.response.constructor.name == 'AsyncFunction') {
				
				handler = await error.response();
			} else if (typeof error.response == 'function') {
				
				handler = error.response();
			} else {
				
				handler = error.response;
			};
			
			return $1.default(handler,request,reply,true);
		} else {
			
			return $6.handleException(error,request,reply,false,this.shouldReport(error));
		};
	}
	
	/**
	@param {Error|ApplicationException|HttpException} error
	@param {FormRequest} request
	@param {FastifyReply} reply
	@param {Boolean} shouldReport
	*/
	handle(error,request,reply,shouldReport){
		
		return null;
	}
	
	/**
	@param {Error} error
	*/
	shouldReport(error){
		
		if (!($4.default(this.dontReport)) && $3.default(this.dontReport)) {
			
			for (let $8 = 0, $9 = iter$__(this.dontReport), $10 = $9.length; $8 < $10; $8++) {
				let exception = $9[$8];
				if (error instanceof exception) { return false };
			};
		};
		
		return true;
	}
};
exports.default = Handler;
